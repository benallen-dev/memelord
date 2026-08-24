import { createFileRoute } from "@tanstack/react-router";
import { MemeFiles } from "#/components/MemeFiles";
import { useMemeWatcher } from "#/hooks/use-meme-watcher";
import { getMemeFiles } from "#/server-functions/readDir";

export const Route = createFileRoute("/")({
	loader: async () => {
		return getMemeFiles();
	},
	component: RouteComponent,
});

function RouteComponent() {
	const memeFiles = Route.useLoaderData();
	useMemeWatcher();
	return (
		<div>
			<h2 className="text-xl font-semibold">File Collection</h2>
			<div>page 1 of ???</div>
			<MemeFiles files={memeFiles} />
		</div>
	);
}
