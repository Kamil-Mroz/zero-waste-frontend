import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/eco-hub/quizzes")({
	component: Outlet,

	staticData: {
		getTitle: () => "Quizzes",
	},
});
