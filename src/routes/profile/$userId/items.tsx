import { createFileRoute, redirect } from "@tanstack/react-router";
import { userItemsQueryOptions } from "@/features/item/hooks/query-options";

export const Route = createFileRoute("/profile/$userId/items")({
	staticData: {
		getTitle: () => "Items",
	},
	beforeLoad: async ({ context, params }) => {
		if (context.auth.user?.id === params.userId) {
			throw redirect({ to: "/profile" });
		}

		await context.queryClient.ensureQueryData(
			userItemsQueryOptions(params.userId),
		);
	},
});
