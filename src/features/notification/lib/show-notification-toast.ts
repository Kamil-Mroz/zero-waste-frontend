import { appToast } from "@/features/shared/components/toast";
import type { Notification } from "../types";

export function showNotificationToast(notification: Notification) {
	switch (notification.type) {
		case "OFFER_RECEIVED": {
			appToast.info({
				title: notification.title,
				description: notification.message,
			});
			break;
		}
		case "OFFER_ACCEPTED": {
			appToast.success({
				title: notification.title,
				description: notification.message,
			});
			break;
		}
		case "OFFER_CANCELLED": {
			appToast.warning({
				title: notification.title,
				description: notification.message,
			});
			break;
		}
		case "OFFER_REJECTED": {
			appToast.error({
				title: notification.title,
				description: notification.message,
			});
			break;
		}
		default: {
			appToast.info({
				title: notification.title,
				description: notification.message,
			});
		}
	}
}
