import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/eco-hub/blogs/")({

	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/eco-hub/blog/"!</div>;
}
