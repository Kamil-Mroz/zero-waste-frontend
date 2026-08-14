import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod/v4";
import { notificationTypeSchema } from "@/features/notification/constants";
import { notificationHistoryQueryOptions } from "@/features/notification/hooks/query-options";

const notificationSearchSchema = z.object({
	notificationType: notificationTypeSchema.optional().catch("OFFER_ACCEPTED"),
});

export const Route = createFileRoute("/_authenticated/notifications/")({
	head: () => ({
		meta: [
			{
				title: "Notifications",
			},
		],
	}),
	validateSearch: notificationSearchSchema,
	loaderDeps: ({ search }) => {
		const { notificationType } = search;
		return { notificationType };
	},
	beforeLoad: async ({ context, search }) => {
		await context.queryClient.ensureInfiniteQueryData(
			notificationHistoryQueryOptions(search.notificationType),
		);
	},
});
