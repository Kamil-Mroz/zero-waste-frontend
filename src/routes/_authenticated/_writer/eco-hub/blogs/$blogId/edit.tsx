import { createFileRoute, redirect } from "@tanstack/react-router";
import { blogQueryOptions } from "@/features/blog/hooks/query-options";
export const Route = createFileRoute(
	"/_authenticated/_writer/eco-hub/blogs/$blogId/edit",
)({
	beforeLoad: async ({ context, params }) => {
		const blog = await context.queryClient.ensureQueryData(
			blogQueryOptions(params.blogId),
		);
		if (blog.author.id !== context.auth.user?.id) {
			throw redirect({ to: "/unauthorized" });
		}
	},
});
