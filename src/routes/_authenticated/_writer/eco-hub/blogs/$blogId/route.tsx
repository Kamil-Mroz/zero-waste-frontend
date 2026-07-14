import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { idParamSchema } from "@/features/shared/schemas/uuid.schema";

export const Route = createFileRoute(
	"/_authenticated/_writer/eco-hub/blogs/$blogId",
)({
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
	component: Outlet,
});
