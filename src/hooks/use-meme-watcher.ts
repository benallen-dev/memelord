import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";

const EVENTS_URL = "/api/memes/events";

export function useMemeWatcher() {
	const router = useRouter();

	useEffect(() => {
		const source = new EventSource(EVENTS_URL);
		source.onmessage = () => router.invalidate();
		return () => source.close();
	}, [router]);
}
