import type { QueryClient } from "@tanstack/react-query";
import { ITEM_QUERY_KEYS } from "@/features/item/constants";
import { OFFER_QUERY_KEYS } from "@/features/offer/constants";
import { NOTIFICATIONS_QUERY_KEYS } from "../constants";
import type { Notification } from "../types";

export const invalidateNotificationQueries = async (
	queryClient: QueryClient,

	notification: Notification,
) => {
	queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEYS.popup() });

	queryClient.invalidateQueries({
		queryKey: NOTIFICATIONS_QUERY_KEYS.history(notification.type),
	});

	queryClient.setQueryData(
		NOTIFICATIONS_QUERY_KEYS.unreadCount(),
		(old: { unreadCount: number } | undefined) => ({
			unreadCount: (old?.unreadCount ?? 0) + 1,
		}),
	);

	switch (notification.type) {
		case "OFFER_RECEIVED":
			await queryClient.invalidateQueries({
				queryKey: OFFER_QUERY_KEYS.received(),
			});

			break;

		case "OFFER_ACCEPTED": {
			await queryClient.invalidateQueries({
				queryKey: ITEM_QUERY_KEYS.itemRoot(),
			});

			break;
		}

		case "OFFER_REJECTED": {
			await queryClient.invalidateQueries({
				queryKey: ITEM_QUERY_KEYS.itemRoot(),
			});

			break;
		}

		case "OFFER_CANCELLED":
			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: OFFER_QUERY_KEYS.own(),
				}),

				queryClient.invalidateQueries({
					queryKey: OFFER_QUERY_KEYS.received(),
				}),
			]);

			break;
	}
};
