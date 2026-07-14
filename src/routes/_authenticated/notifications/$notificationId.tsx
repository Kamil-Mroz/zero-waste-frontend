import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { NotificationCardSkeleton } from "@/features/notification/components/notification-card-skeleton";
import NotificationDetailPage from "@/features/notification/components/notification-detail";
import { notificationQueryOptions } from "@/features/notification/hooks/query-options";
import { idParamSchema } from "@/features/shared/schemas/uuid.schema";

export const Route = createFileRoute(
	"/_authenticated/notifications/$notificationId",
)({
	component: RouteComponent,
	pendingComponent: NotificationCardSkeleton,
	params: {
		parse: (params) => {
			const result = idParamSchema.safeParse({ id: params.notificationId });
			if (!result.success) {
				throw notFound();
			}
			return {
				notificationId: result.data.id,
			};
		},
	},
	beforeLoad: async ({ context, params: { notificationId } }) => {
		try {
			await context.queryClient.ensureQueryData(
				notificationQueryOptions(notificationId),
			);
		} catch {
			throw notFound();
		}
	},
});

function RouteComponent() {
	const { notificationId } = Route.useParams();
	const { data } = useSuspenseQuery(notificationQueryOptions(notificationId));
	return <NotificationDetailPage notification={data} />;
}
