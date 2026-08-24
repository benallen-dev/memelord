import { watch } from "node:fs";
import { createFileRoute } from "@tanstack/react-router";

import { getMemeDir } from "#/lib/meme-dir";

const DEBOUNCE_MS = 150;
const HEARTBEAT_INTERVAL_MS = 25_000;

export const Route = createFileRoute("/api/memes/events")({
	server: {
		handlers: {
			GET: async ({ request }) => {
				const encoder = new TextEncoder();
				let debounceTimeout: ReturnType<typeof setTimeout> | undefined;
				let heartbeatInterval: ReturnType<typeof setInterval> | undefined;
				let fsWatcher: ReturnType<typeof watch> | undefined;
				let cleanupStream = () => {};

				const stream = new ReadableStream<Uint8Array>({
					start(controller) {
						let closed = false;

						const send = (chunk: string) => {
							if (closed) return;
							try {
								controller.enqueue(encoder.encode(chunk));
							} catch {
								closed = true;
							}
						};

						const close = () => {
							if (closed) return;
							closed = true;
							clearTimeout(debounceTimeout);
							clearInterval(heartbeatInterval);
							fsWatcher?.close();
							try {
								controller.close();
							} catch {}
						};

						cleanupStream = close;

						send(": connected\n\n");

						heartbeatInterval = setInterval(
							() => send(": ping\n\n"),
							HEARTBEAT_INTERVAL_MS,
						);

						fsWatcher = watch(getMemeDir(), { recursive: true }, () => {
							clearTimeout(debounceTimeout);
							debounceTimeout = setTimeout(() => {
								send('data: {"type":"change"}\n\n');
							}, DEBOUNCE_MS);
						});
						fsWatcher.on("error", close);

						request.signal.addEventListener("abort", close);
					},
					cancel() {
						cleanupStream();
					},
				});

				return new Response(stream, {
					headers: {
						"content-type": "text/event-stream",
						"cache-control": "no-cache",
						connection: "keep-alive",
					},
				});
			},
		},
	},
});
