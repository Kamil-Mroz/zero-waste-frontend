import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { NotificationCardSkeleton } from "@/features/notification/components/notification-card-skeleton";
import NotificationDetailPage from "@/features/notification/components/notification-detail";
import { notificationQueryOptions } from "@/features/notification/hooks/query-options";

export const Route = createLazyFileRoute(
	"/_authenticated/notifications/$notificationId",
)({
	component: RouteComponent,
	pendingComponent: NotificationCardSkeleton,
});

function RouteComponent() {
	const { notificationId } = Route.useParams();
	const { data } = useSuspenseQuery(notificationQueryOptions(notificationId));
	return <NotificationDetailPage notification={data} />;
}
