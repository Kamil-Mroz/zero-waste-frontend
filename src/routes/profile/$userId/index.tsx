import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { publicUserProfileQueryOptions } from "@/features/profile/hooks/query-options";

export const Route = createFileRoute("/profile/$userId/")({
	beforeLoad: async ({ context, params }) => {
		if (params.userId === context.auth.user?.id) {
			throw redirect({ to: "/profile" });
		}

		try {
			await context.queryClient.ensureQueryData(
				publicUserProfileQueryOptions(params.userId),
			);
		} catch {
			throw notFound();
		}
	},
});
