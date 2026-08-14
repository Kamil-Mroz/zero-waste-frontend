import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/profile")({
	head: () => ({
		meta: [
			{
				title: "Profile",
			},
		],
	}),
	staticData: {
		getTitle: () => "Profile",
	},
});
