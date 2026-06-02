import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CursorResponse } from "@/features/shared/types";
import { markAllNotificationsAsRead, markNotificationsAsRead } from "../api";
import { NOTIFICATIONS_QUERY_KEYS } from "../constants";
import type { Notification } from "../types";

export const useMarkAllAsReadMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: markAllNotificationsAsRead,
		onSuccess: async () => {
			queryClient.setQueryData(NOTIFICATIONS_QUERY_KEYS.unreadCount(), {
				unreadCount: 0,
			});
			queryClient.setQueryData(
				NOTIFICATIONS_QUERY_KEYS.popup(),
				(old: CursorResponse<Notification>) => {
					return {
						...old,
						items: old.items.map((n) => ({
							...n,
							read: true,
						})),
					};
				},
			);
			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: NOTIFICATIONS_QUERY_KEYS.historyRoot(),
				}),
				queryClient.invalidateQueries({
					queryKey: NOTIFICATIONS_QUERY_KEYS.detailsRoot(),
				}),
			]);
		},
	});
};

export const useMarkAsReadMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => markNotificationsAsRead(id),
		onSuccess: async (_, id) => {
			queryClient.setQueryData(
				NOTIFICATIONS_QUERY_KEYS.unreadCount(),
				(old: { unreadCount: number }) => ({
					unreadCount: Math.max(old.unreadCount - 1, 0),
				}),
			);
			queryClient.setQueryData(
				NOTIFICATIONS_QUERY_KEYS.popup(),
				(old: CursorResponse<Notification>) => {
					return {
						...old,
						items: old.items.map((n) => ({
							...n,
							read: n.id === id ? true : n.read,
						})),
					};
				},
			);
			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: NOTIFICATIONS_QUERY_KEYS.historyRoot(),
				}),
				queryClient.invalidateQueries({
					queryKey: NOTIFICATIONS_QUERY_KEYS.byId(id),
				}),
			]);
		},
	});
};
