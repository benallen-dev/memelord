import { AuthStatus } from "./AuthStatus";

export function SiteHeader() {
	return(
		<header className="p-4 sticky top-0 w-full border-b border-border/45 bg-white bg-background/95 backdrop-blur-md supports-backdrop-filter:bg-background/60 flex justify-between">
			<h1 className="text-xl">Title goes here</h1>
			<AuthStatus />
		</header>

	);
}
