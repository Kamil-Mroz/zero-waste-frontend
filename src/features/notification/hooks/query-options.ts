import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

import {
	getNotification,
	getNotificationHistory,
	getNotificationPopup,
	getUnreadCount,
} from "../api";
import { NOTIFICATIONS_QUERY_KEYS } from "../constants";
import type { NotificationType, PageParam } from "../types";

export const unreadCountQueryOptions = () =>
	queryOptions({
		queryKey: NOTIFICATIONS_QUERY_KEYS.unreadCount(),
		queryFn: getUnreadCount,
		staleTime: 10_000,
	});

export const notificationPopupQueryOptions = () =>
	queryOptions({
		queryKey: NOTIFICATIONS_QUERY_KEYS.popup(),
		queryFn: () => getNotificationPopup(),
		staleTime: 30_000,
		enabled: false,
		refetchOnWindowFocus: false,
	});

export const notificationQueryOptions = (notificationId: string) =>
	queryOptions({
		queryKey: NOTIFICATIONS_QUERY_KEYS.byId(notificationId),
		queryFn: () => getNotification(notificationId),
		staleTime: Infinity,
	});

export const notificationHistoryQueryOptions = (type?: NotificationType) =>
	infiniteQueryOptions({
		queryKey: type
			? NOTIFICATIONS_QUERY_KEYS.history(type)
			: NOTIFICATIONS_QUERY_KEYS.historyRoot(),
		queryFn: ({ pageParam }) =>
			getNotificationHistory(
				type,
				pageParam?.cursor,
				pageParam?.direction ?? "FORWARD",
			),
		initialPageParam: undefined as PageParam | undefined,

		getNextPageParam: (lastPage): PageParam | undefined =>
			lastPage.hasMore
				? {
						cursor: lastPage.nextCursor,
						direction: "FORWARD",
					}
				: undefined,

		getPreviousPageParam: (firstPage): PageParam | undefined =>
			firstPage.hasPrev
				? {
						cursor: firstPage.prevCursor,
						direction: "BACKWARD",
					}
				: undefined,
	});
