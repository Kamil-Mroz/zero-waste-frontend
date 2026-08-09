import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Blog } from "@/features/blog/components/blog";
import { BlogDetailsSkeleton } from "@/features/blog/components/blog-details-skeleton";
import { blogQueryOptions } from "@/features/blog/hooks/query-options";
import GoBackButton from "@/features/shared/components/go-back-button";

export const Route = createLazyFileRoute("/eco-hub/blogs/$blogId/")({
	component: RouteComponent,

	pendingComponent: BlogDetailsSkeleton,
});

function RouteComponent() {
	const { blogId } = Route.useParams();
	const { data: blog } = useSuspenseQuery(blogQueryOptions(blogId));

	return (
		<div className="space-y-2">
			<GoBackButton />
			<Blog blog={blog} />
		</div>
	);
}
