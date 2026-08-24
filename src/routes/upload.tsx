// Todo: rewrite this vibe-coded file so I know wtf is going on
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import type { ChangeEvent, FormEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { Button } from "#/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { UPLOAD_ACCEPT_ATTRIBUTE } from "#/lib/meme-filetypes";
import { uploadMeme } from "#/server-functions/uploadMeme";

export const Route = createFileRoute("/upload")({
	component: RouteComponent,
});

type UploadState =
	| { status: "idle" }
	| { status: "uploading" }
	| { status: "success"; message: string }
	| { status: "error"; message: string };

function RouteComponent() {
	const router = useRouter();
	const uploadMemeFn = useServerFn(uploadMeme);

	const [file, setFile] = useState<File | null>(null);
	const [fileName, setFileName] = useState("");
	const [state, setState] = useState<UploadState>({ status: "idle" });
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (!file) {
			setPreviewUrl(null);
			return;
		}

		const url = URL.createObjectURL(file);
		setPreviewUrl(url);
		return () => URL.revokeObjectURL(url);
	}, [file]);

	function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
		const selected = event.target.files?.[0] ?? null;
		setFile(selected);
		setFileName(selected ? selected.name : "");
		setState({ status: "idle" });
	}

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (!file) {
			return;
		}

		const formData = new FormData();
		formData.append("file", file);
		formData.append("fileName", fileName);

		setState({ status: "uploading" });
		try {
			const result = await uploadMemeFn({ data: formData });
			setState({ status: "success", message: `Saved as "${result.name}"` });
			setFile(null);
			setFileName("");
			if (fileInputRef.current) {
				fileInputRef.current.value = "";
			}
			await router.invalidate({ sync: true });
		} catch (error) {
			setState({
				status: "error",
				message: error instanceof Error ? error.message : "Upload failed",
			});
		}
	}

	return (
		<Card className="w-full max-w-md">
			<CardHeader>
				<CardTitle>Upload meme</CardTitle>
				<CardDescription>
					Pick a PNG, JPG, GIF or WebP image and rename it before saving.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<Label htmlFor="file">File</Label>
						<Input
							ref={fileInputRef}
							id="file"
							type="file"
							accept={UPLOAD_ACCEPT_ATTRIBUTE}
							onChange={handleFileChange}
							disabled={state.status === "uploading"}
						/>
					</div>
					{previewUrl && (
						<img
							src={previewUrl}
							alt="Preview of selected image"
							className="max-h-48 w-full rounded-md border object-contain"
						/>
					)}
					<div className="flex flex-col gap-2">
						<Label htmlFor="fileName">File name</Label>
						<Input
							id="fileName"
							value={fileName}
							onChange={(event) => setFileName(event.target.value)}
							placeholder="Choose a file first"
							disabled={!file || state.status === "uploading"}
						/>
					</div>
					<Button
						type="submit"
						disabled={!file || state.status === "uploading"}
					>
						{state.status === "uploading" ? "Uploading…" : "Upload"}
					</Button>
					{state.status === "success" && (
						<p className="text-sm text-green-600">{state.message}</p>
					)}
					{state.status === "error" && (
						<p className="text-sm text-red-600">{state.message}</p>
					)}
				</form>
			</CardContent>
		</Card>
	);
}
