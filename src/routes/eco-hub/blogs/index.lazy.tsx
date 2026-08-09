import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { BlogList } from "@/features/blog/components/blog-list";
import { BlogListSkeleton } from "@/features/blog/components/blog-list-skeleton";
import { blogsQueryOptions } from "@/features/blog/hooks/query-options";

export const Route = createLazyFileRoute("/eco-hub/blogs/")({
	component: RouteComponent,
	pendingComponent: BlogListSkeleton,
});

function RouteComponent() {
	const { data: blogs } = useSuspenseQuery(blogsQueryOptions());
	return <BlogList blogs={blogs} />;
}
