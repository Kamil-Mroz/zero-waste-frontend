import { Link } from "@tanstack/react-router";
import { Button } from "@/features/shared/components/ui/button";
import { ScrollArea } from "@/features/shared/components/ui/scroll-area";
import {
	useMarkAllAsReadMutation,
	useMarkAsReadMutation,
} from "../hooks/use-mutations";
import type { Notification } from "../types";
import NotificationPopupItem from "./notification-popup-item";

type NotificationListProps = {
	notifications: Notification[];
	onClose: () => void;
};
function NotificationPopupList({
	notifications,
	onClose,
}: NotificationListProps) {
	const markAllAsReadMutation = useMarkAllAsReadMutation();
	const markAsReadMutation = useMarkAsReadMutation();

	const showMarkAllAsRead = notifications.some((n) => !n.read);
	return (
		<div className="space-y-2">
			<h4 className="font-medium">Notifications</h4>
			{notifications.length === 0 ? (
				<p className="text-sm text-muted-foreground">No new notifications</p>
			) : (
				<>
					{showMarkAllAsRead && (
						<Button
							className="w-full"
							variant="ghost"
							onClick={() => {
								markAllAsReadMutation.mutate();
								onClose();
							}}
						>
							Mark all as read
						</Button>
					)}

					<ScrollArea className="w-auto h-[400px]">
						{notifications.map((n) => (
							<NotificationPopupItem
								key={n.id}
								notification={n}
								markAsRead={markAsReadMutation.mutate}
								onClose={onClose}
							/>
						))}
					</ScrollArea>
				</>
			)}
			<Button
				className="w-full"
				variant="secondary"
				onClick={() => onClose()}
				asChild
			>
				<Link to="/notifications">View all</Link>
			</Button>
		</div>
	);
}

export default NotificationPopupList;
