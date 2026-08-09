import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import BlogForm from "@/features/blog/components/blog-form";
import { blogQueryOptions } from "@/features/blog/hooks/query-options";
import GoBackButton from "@/features/shared/components/go-back-button";
export const Route = createLazyFileRoute(
	"/_authenticated/_writer/eco-hub/blogs/$blogId/edit",
)({
	component: RouteComponent,
});

function RouteComponent() {
	const { blogId } = Route.useParams();
	const { data: blog } = useSuspenseQuery(blogQueryOptions(blogId));
	return (
		<div className="grid items-center h-full">
			<div className="space-y-2">
				<GoBackButton />
				<BlogForm blog={blog} />
			</div>
		</div>
	);
}
