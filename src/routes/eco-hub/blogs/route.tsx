import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/eco-hub/blogs")({
	staticData: {
		getTitle: () => "Blogs",
	},
});
