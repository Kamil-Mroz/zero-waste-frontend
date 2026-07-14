import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { Blog } from "@/features/blog/components/blog";
import { blogQueryOptions } from "@/features/blog/hooks/query-options";
import GoBackButton from "@/features/shared/components/go-back-button";
import { idParamSchema } from "@/features/shared/schemas/uuid.schema";

export const Route = createFileRoute("/eco-hub/blogs/$blogId/")({
	component: RouteComponent,

	params: {
		parse: (params) => {
			const result = idParamSchema.safeParse({ id: params.blogId });
			if (!result.success) {
				throw notFound();
			}
			return {
				blogId: result.data.id,
			};
		},
	},
	beforeLoad: async ({ context, params }) => {
		await context.queryClient.ensureQueryData(blogQueryOptions(params.blogId));
	},
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
