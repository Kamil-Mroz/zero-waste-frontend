import { useQueryClient } from "@tanstack/react-query";
import { type PropsWithChildren, useEffect } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { invalidateNotificationQueries } from "@/features/notification/lib/invalidate-notification-queries";
import { showNotificationToast } from "@/features/notification/lib/show-notification-toast";
import type { Notification } from "@/features/notification/types";
import { invalidateReportQueries } from "@/features/report/lib/invalidate-report-queries";
import { showReportToast } from "@/features/report/lib/show-report-toast";
import type { Report } from "@/features/report/types";
import { appToast } from "@/features/shared/components/toast";
import { useWebSocketService, WebSocketContext } from "../hooks/useWebSocket";

function WebsocketProvider({ children }: PropsWithChildren) {
	// return { children };
	const queryClient = useQueryClient();
	const websocket = useWebSocketService("/ws");
	const { hasRole, resetState } = useAuth();

	// biome-ignore lint/correctness/useExhaustiveDependencies: depends on the connection state
	useEffect(() => {
		if (!websocket.isConnected) {
			return;
		}

		if (hasRole("DEMO")) {
			return;
		}

		const notificationSubscriptionId = websocket.subscribe(
			"/user/queue/notifications",
			(notification: Notification) => {
				showNotificationToast(notification);

				invalidateNotificationQueries(queryClient, notification);
			},
		);
		const banSubscriptionId = websocket.subscribe(
			"/user/queue/ban",
			({ message }: { message: string }) => {
				appToast.error({ title: "Ban", description: message });
				queryClient.clear();
				resetState();
			},
		);

		let reportSubscriptionId: string | null;

		if (hasRole("ADMIN")) {
			reportSubscriptionId = websocket.subscribe(
				"/topic/reports",
				(report: Report) => {
					showReportToast(report);
					invalidateReportQueries(queryClient, report);
				},
			);
		}

		return () => {
			if (notificationSubscriptionId)
				websocket.unsubscribe(notificationSubscriptionId);

			if (banSubscriptionId) websocket.unsubscribe(banSubscriptionId);
			if (reportSubscriptionId) websocket.unsubscribe(reportSubscriptionId);
		};
	}, [websocket.isConnected]);
	return (
		<WebSocketContext.Provider value={websocket}>
			{children}
		</WebSocketContext.Provider>
	);
}
export default WebsocketProvider;
