import { MemeFiles } from "#/components/MemeFiles";
import { getMemeFiles } from "#/server-functions/readDir";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/test")({
	loader: async () => {
		return getMemeFiles();
	},
	component: RouteComponent,
});

function RouteComponent() {
	const memeFiles = Route.useLoaderData();
	return (
		<div>
			<h2 className="text-xl font-semibold">File Collection</h2>
			<div>page 1 of ???</div>
			<MemeFiles files={memeFiles} />
		</div>
	);
}
