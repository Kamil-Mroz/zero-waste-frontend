import { createFileRoute } from "@tanstack/react-router";
import { ownBlogsQueryOptions } from "@/features/blog/hooks/query-options";

export const Route = createFileRoute(
	"/_authenticated/_writer/eco-hub/blogs/own",
)({
	beforeLoad: async ({ context }) => {
		await context.queryClient.ensureQueryData(ownBlogsQueryOptions());
	},
});
