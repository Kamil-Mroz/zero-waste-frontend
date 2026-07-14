import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import BlogForm from "@/features/blog/components/blog-form";
import { blogQueryOptions } from "@/features/blog/hooks/query-options";
import GoBackButton from "@/features/shared/components/go-back-button";
export const Route = createFileRoute(
	"/_authenticated/_writer/eco-hub/blogs/$blogId/edit",
)({
	component: RouteComponent,
	beforeLoad: async ({ context, params }) => {
		const blog = await context.queryClient.ensureQueryData(
			blogQueryOptions(params.blogId),
		);
		if (blog.author.id !== context.auth.user?.id) {
			throw redirect({ to: "/unauthorized" });
		}
	},
});

function RouteComponent() {
	const { blogId } = Route.useParams();
	const { data: blog } = useSuspenseQuery(blogQueryOptions(blogId));
	return (
		<div className="grid place-items-center h-full">
			<div className="space-y-2">
				<GoBackButton />
				<BlogForm blog={blog} />
			</div>
		</div>
	);
}
