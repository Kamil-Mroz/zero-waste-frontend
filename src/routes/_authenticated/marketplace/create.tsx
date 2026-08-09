import { createFileRoute } from "@tanstack/react-router";
import { categoriesQueryOptions } from "@/features/category/hooks/query-options";

export const Route = createFileRoute("/_authenticated/marketplace/create")({
	staticData: {
		getTitle: () => "Create item",
	},
	loader: async ({ context }) => {
		await context.queryClient.ensureQueryData(categoriesQueryOptions());
	},
});
