import { createFileRoute, notFound } from "@tanstack/react-router";
import { blogQueryOptions } from "@/features/blog/hooks/query-options";
import { idParamSchema } from "@/features/shared/schemas/uuid.schema";

export const Route = createFileRoute("/eco-hub/blogs/$blogId/")({
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
