import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_authenticated/marketplace/edit/$itemId",
)({
	component: RouteComponent,
	staticData: {
		getTitle: () => "Edit item",
	},
});

function RouteComponent() {
	return <div>Hello "/_authenticated/marketplace/edit/$itemId"!</div>;
}
