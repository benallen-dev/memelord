import { MemeFiles } from "#/components/MemeFiles";
import { SiteHeader } from "#/components/SiteHeader";
import { getMemeFiles } from "#/server-functions/readDir";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	loader: async () => {
		return getMemeFiles();
	},
	component: RouteComponent,
});

function RouteComponent() {
	const memeFiles = Route.useLoaderData();
	return (
		<div>
			<SiteHeader />
			<main className="p-8">
				<h2 className="text-xl font-semibold">File Collection</h2>
				<div>page 1 of ???</div>
				<MemeFiles files={memeFiles} />
			</main>
		</div>
	);
}
