import { createFileRoute, notFound } from "@tanstack/react-router";
import { notificationQueryOptions } from "@/features/notification/hooks/query-options";
import { idParamSchema } from "@/features/shared/schemas/uuid.schema";

export const Route = createFileRoute(
	"/_authenticated/notifications/$notificationId",
)({
	head: () => ({
		meta: [
			{
				title: "Notification",
			},
		],
	}),
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
