import { useQueryClient } from "@tanstack/react-query";
import { type PropsWithChildren, useEffect } from "react";
import { invalidateNotificationQueries } from "@/features/notification/lib/invalidate-notification-queries";
import { showNotificationToast } from "@/features/notification/lib/show-notification-toast";
import type { Notification } from "@/features/notification/types";
import { useWebSocketService, WebSocketContext } from "../hooks/useWebSocket";

function WebsocketProvider({ children }: PropsWithChildren) {
	const queryClient = useQueryClient();
	const websocket = useWebSocketService("/ws");

	// biome-ignore lint/correctness/useExhaustiveDependencies: depends on the connection state
	useEffect(() => {
		if (!websocket.isConnected) {
			return;
		}

		const notificationSubscriptionId = websocket.subscribe(
			"/user/queue/notifications",
			(notification: Notification) => {
				showNotificationToast(notification);

				invalidateNotificationQueries(queryClient, notification);
			},
		);
		return () => {
			if (notificationSubscriptionId)
				websocket.unsubscribe(notificationSubscriptionId);
		};
	}, [websocket.isConnected]);
	return (
		<WebSocketContext.Provider value={websocket}>
			{children}
		</WebSocketContext.Provider>
	);
}
export default WebsocketProvider;
