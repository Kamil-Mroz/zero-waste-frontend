import { useNavigate } from "@tanstack/react-router";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent } from "@/features/shared/components/ui/card";
import { cn } from "@/lib/utils";
import type { Notification } from "../types";
import { notificationConfig } from "../constants";

type NotificationCardProps = {
	notification: Notification;
};
function NotificationCard({ notification }: NotificationCardProps) {
	const config = notificationConfig[notification.type];
	const Icon = config.icon;
	const navigate = useNavigate();

	return (
		<Card
			className={cn(
				"transition-colors hover:bg-muted/50 cursor-pointer ",
				!notification.read && "border-primary/40 bg-primary/5",
			)}
			onClick={() =>
				navigate({
					to: "/notifications/$notificationId",
					params: { notificationId: notification.id },
				})
			}
		>
			<CardContent className="p-4">
				<div className="flex items-start gap-3">
					<div className="mt-1">
						<Icon className={cn("size-5", config.className)} />
					</div>

					<div className="min-w-0 flex-1">
						<div className="flex items-center justify-between gap-4">
							<h3 className="font-medium">{notification.title}</h3>

							<time className="text-muted-foreground whitespace-nowrap text-xs">
								{formatDistanceToNow(new Date(notification.createdAt), {
									addSuffix: true,
								})}
							</time>
						</div>

						<p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
							{notification.message}
						</p>

						<p className="text-muted-foreground mt-2 text-xs">{config.label}</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
export default NotificationCard;
