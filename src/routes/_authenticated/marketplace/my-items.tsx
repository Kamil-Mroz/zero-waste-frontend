import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/marketplace/my-items")({
	component: RouteComponent,

	staticData: {
		getTitle: () => "My items",
	},
});

function RouteComponent() {
	return <div>Hello "/_authenticated/marketplace/my-items"!</div>;
}
