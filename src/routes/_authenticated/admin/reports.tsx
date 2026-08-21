import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/reports")({
	head: () => ({
		meta: [
			{
				title: "Users",
			},
		],
	}),
	staticData: {
		getTitle: () => "Manage users",
	},
});
