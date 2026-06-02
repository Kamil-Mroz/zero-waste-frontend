import { api } from "@/lib/axios";
import type {
	CursorDirection,
	CursorRequest,
	CursorResponse,
} from "../shared/types";
import type { Notification, NotificationType } from "./types";

export const getUnreadCount = async () => {
	const res = await api.get<{ unreadCount: number }>(
		`/api/v1/notifications/unread-count`,
	);
	return res.data;
};

export const getNotificationPopup = async () => {
	const res = await api.get<CursorResponse<Notification>>(
		"/api/v1/notifications",
		{
			params: {
				limit: 20,
			},
		},
	);
	return res.data;
};

export const getNotification = async (notificationId: string) => {
	const res = await api.get<Notification>(
		`/api/v1/notifications/${notificationId}`,
	);
	return res.data;
};

export const getNotificationHistory = async (
	notificationType?: NotificationType,
	cursor?: CursorRequest,
	direction: CursorDirection = "FORWARD",
) => {
	const res = await api.get<CursorResponse<Notification>>(
		"/api/v1/notifications",
		{
			params: {
				limit: 20,
				createdAt: cursor?.createdAt,
				id: cursor?.id,
				direction,
				notificationType,
			},
		},
	);
	return res.data;
};

export const markAllNotificationsAsRead = async () => {
	const res = await api.patch("/api/v1/notifications/read-all");
	return res.data;
};
export const markNotificationsAsRead = async (id: string) => {
	const res = await api.patch(`/api/v1/notifications/${id}/read`);
	return res.data;
};
