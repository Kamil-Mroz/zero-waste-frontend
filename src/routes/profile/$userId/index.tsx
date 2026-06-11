import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { PublicUserProfile } from "@/features/profile/components/public-user-profile";
import { publicUserProfileQueryOptions } from "@/features/profile/hooks/query-options";


export const Route = createFileRoute("/profile/$userId/")({

	component: RouteComponent,
	beforeLoad: async ({ context, params }) => {
		if (params.userId === context.auth.user?.id) {
			throw redirect({ to: "/profile" });
		}

		try {
			await context.queryClient.ensureQueryData(
				publicUserProfileQueryOptions(params.userId),
			);
		} catch {
			throw notFound();
		}
	},

});

function RouteComponent() {
	const { userId } = Route.useParams();
	const { data: profile } = useSuspenseQuery(
		publicUserProfileQueryOptions(userId),
	);

	return <PublicUserProfile profile={profile} userId={userId} />;
}
