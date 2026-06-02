import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";
import NotificationDetailPage from "@/features/notification/components/notification-detail";
import { notificationQueryOptions } from "@/features/notification/hooks/query-options";
import { notificationParamSchema } from "@/features/shared/schemas/uuid.schema";

export const Route = createFileRoute(
	"/_authenticated/notifications/$notificationId",
)({
	component: RouteComponent,
	params: {
		parse: (params) => {
			const result = notificationParamSchema.safeParse(params);
			if (!result.success) {
				throw notFound();
			}
			return {
				notificationId: result.data.notificationId,
			};
		},
	},
	beforeLoad: async ({ context, params: { notificationId } }) => {
		await context.queryClient.ensureQueryData(
			notificationQueryOptions(notificationId),
		);
	},
});

function RouteComponent() {
	const { notificationId } = Route.useParams();
	const { data } = useSuspenseQuery(notificationQueryOptions(notificationId));
	return <NotificationDetailPage notification={data} />;
}
