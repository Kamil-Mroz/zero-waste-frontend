import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { userParamSchema } from "@/features/users/schemas/user.schema";

export const Route = createFileRoute("/_authenticated/admin/users/$userId")({
	component: RouteComponent,
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
	beforeLoad: ({ context, params }) => {
		if (context.auth.user?.id === params.userId) {
			throw redirect({
				to: "/unauthorized",
				search: {
					redirect: location.href,
				},
			});
		}
	},
});

function RouteComponent() {
	return <div>Hello "/_authenticated/admin/users/$userId"!</div>;
}
