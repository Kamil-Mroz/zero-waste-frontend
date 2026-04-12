import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/marketplace/$itemId")({
	component: RouteComponent,
	staticData: {
		getTitle: () => "Item",
	},
});

function RouteComponent() {
	return <div>Hello "/marketplace/$itemId"!</div>;
}
