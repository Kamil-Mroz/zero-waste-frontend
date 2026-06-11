import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { userParamSchema } from "@/features/users/schemas/user.schema";

export const Route = createFileRoute("/profile/$userId")({
	staticData: {
		getTitle: () => "Profile",
	},
	params: {
		parse: (params) => {
			const result = userParamSchema.safeParse(params);
			if (!result.success) {
				throw notFound();
			}
			return {
				userId: result.data.userId,
			};
		},
	},
	component: Outlet,
});
