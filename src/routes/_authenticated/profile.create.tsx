import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/profile/create")({
	component: RouteComponent,
	staticData: {
		getTitle: () => "Create",
	},
});

function RouteComponent() {
	return <div>Hello "/_authenticated/profile/create"!</div>;
}
