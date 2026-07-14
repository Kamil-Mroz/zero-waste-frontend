import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { BlogList } from "@/features/blog/components/blog-list";
import { ownBlogsQueryOptions } from "@/features/blog/hooks/query-options";

export const Route = createFileRoute(
	"/_authenticated/_writer/eco-hub/blogs/own",
)({
	component: RouteComponent,
	beforeLoad: async ({ context }) => {
		await context.queryClient.ensureQueryData(ownBlogsQueryOptions());
	},
});

function RouteComponent() {
	const { data: blogs } = useSuspenseQuery(ownBlogsQueryOptions());
	return <BlogList blogs={blogs} showCreate />;
}
