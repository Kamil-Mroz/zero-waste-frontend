import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/eco-hub/blogs")({
	head: () => ({
		meta: [
			{
				title: "Blogs",
			},
		],
	}),
	staticData: {
		getTitle: () => "Blogs",
	},
});
