import { createFileRoute } from "@tanstack/react-router";
import { blogsQueryOptions } from "@/features/blog/hooks/query-options";

export const Route = createFileRoute("/eco-hub/blogs/")({
	beforeLoad: async ({ context }) => {
		await context.queryClient.ensureQueryData(blogsQueryOptions());
	},
});
