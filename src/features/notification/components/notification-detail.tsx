import { Link } from "@tanstack/react-router";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/features/shared/components/ui/badge";
import { Button } from "@/features/shared/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/features/shared/components/ui/card";
import { cn } from "@/lib/utils";
import { notificationConfig } from "../constants";
import type { Notification } from "../types";

function NotificationDetailPage({
	notification,
}: {
	notification: Notification;
}) {
	const config = notificationConfig[notification.type];
	const Icon = config.icon;

	return (
		<div className="mx-auto w-full max-w-2xl py-10">
			<Card>
				<CardHeader>
					<div className="flex items-start gap-3">
						<Icon className={cn("mt-1 size-6", config.className)} />

						<div className="min-w-0">
							<CardTitle className="text-xl">{notification.title}</CardTitle>

							<div className="mt-1 flex items-center gap-2 flex-col sm:flex-row">
								<Badge variant={config.badgeVariant}>{config.label}</Badge>

								<time className="text-muted-foreground text-xs">
									{formatDistanceToNow(new Date(notification.createdAt), {
										addSuffix: true,
									})}
								</time>
							</div>
						</div>
					</div>
				</CardHeader>

				<CardContent className="space-y-4">
					<p className="text-muted-foreground leading-relaxed">
						{notification.message}
					</p>

					<div className="bg-muted/40 rounded-md p-3 text-xs space-y-1">
						<div>
							<span className="text-muted-foreground">ID:</span>{" "}
							{notification.id}
						</div>

						<div>
							<span className="text-muted-foreground">Reference:</span>
							{notification.referenceType} / {notification.referenceId}
						</div>

						<div>
							<span className="text-muted-foreground">Read:</span>
							{notification.read ? "Yes" : "No"}
						</div>
					</div>
				</CardContent>

				<CardFooter className="flex justify-between">
					<Button variant="outline" asChild>
						<Link to="/notifications">Back</Link>
					</Button>

					<Button>View related item</Button>
				</CardFooter>
			</Card>
		</div>
	);
}

export default NotificationDetailPage;
