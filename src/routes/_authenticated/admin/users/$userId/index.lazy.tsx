import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { PublicUserProfile } from "@/features/profile/components/public-user-profile";
import { publicUserProfileQueryOptions } from "@/features/profile/hooks/query-options";

export const Route = createLazyFileRoute(
	"/_authenticated/admin/users/$userId/",
)({
	component: RouteComponent,
});

function RouteComponent() {
	const { userId } = Route.useParams();
	const { data: profile } = useSuspenseQuery(
		publicUserProfileQueryOptions(userId),
	);

	return <PublicUserProfile profile={profile} userId={userId} />;
}
