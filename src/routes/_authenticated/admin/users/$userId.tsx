import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { idParamSchema } from "@/features/shared/schemas/uuid.schema";

export const Route = createFileRoute("/_authenticated/admin/users/$userId")({
	component: Outlet,
	params: {
		parse: (params) => {
			const result = idParamSchema.safeParse({ id: params.userId });
			if (!result.success) {
				throw notFound();
			}
			return {
				userId: result.data.id,
			};
		},
	},
});
