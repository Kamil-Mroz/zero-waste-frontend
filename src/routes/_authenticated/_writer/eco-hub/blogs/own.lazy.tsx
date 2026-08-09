import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { BlogList } from "@/features/blog/components/blog-list";
import { BlogListSkeleton } from "@/features/blog/components/blog-list-skeleton";
import { ownBlogsQueryOptions } from "@/features/blog/hooks/query-options";

export const Route = createLazyFileRoute(
	"/_authenticated/_writer/eco-hub/blogs/own",
)({
	component: RouteComponent,
	pendingComponent: BlogListSkeleton,
});

function RouteComponent() {
	const { data: blogs } = useSuspenseQuery(ownBlogsQueryOptions());
	return <BlogList blogs={blogs} showCreate />;
}
