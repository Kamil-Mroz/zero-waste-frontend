import { Link } from "@tanstack/react-router";
import { Badge } from "@/features/shared/components/ui/badge";
import { Button } from "@/features/shared/components/ui/button";
import { cn } from "@/lib/utils";
import { notificationConfig } from "../constants";
import type { Notification } from "../types";

type NotificationPopupItemProps = {
	markAsRead: (id: string) => void;
	notification: Notification;
	onClose: () => void;
};

function NotificationPopupItem({
	onClose,
	markAsRead,
	notification,
}: NotificationPopupItemProps) {
	const config = notificationConfig[notification.type];
	const Icon = config.icon;
	return (
		<Button
			className="block w-full h-auto py-2 text-start"
			variant="ghost"
			onClick={() => {
				onClose();
				if (!notification.read) markAsRead(notification.id);
			}}
		>
			<Link
				to={"/notifications/$notificationId"}
				params={{ notificationId: notification.id }}
				className="flex gap-2 w-full"
			>
				<Icon className={cn("mt-1 size-4 shrink-0", config.className)} />

				<div className="min-w-0 flex-1">
					<p className="text-sm leading-snug truncate">
						{notification.message}
					</p>

					<p className="text-muted-foreground text-xs truncate">
						{config.label}
					</p>
				</div>
				{!notification.read && (
					<Badge variant="destructive" className="shrink-0">
						new
					</Badge>
				)}
			</Link>
		</Button>
	);
}
export default NotificationPopupItem;
