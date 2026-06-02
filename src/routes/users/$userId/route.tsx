import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { PublicUserProfile } from "@/features/profile/components/public-user-profile";
import { publicUserProfileQueryOptions } from "@/features/profile/hooks/query-options";
import { userParamSchema } from "@/features/shared/schemas/uuid.schema";

export const Route = createFileRoute("/users/$userId")({
	component: RouteComponent,
	beforeLoad: async ({ context, params }) => {
		await context.queryClient.ensureQueryData(
			publicUserProfileQueryOptions(params.userId),
		);
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
});

function RouteComponent() {
	const { userId } = Route.useParams();
	const { data: user } = useSuspenseQuery(
		publicUserProfileQueryOptions(userId),
	);

	return <PublicUserProfile user={user} />;
}
