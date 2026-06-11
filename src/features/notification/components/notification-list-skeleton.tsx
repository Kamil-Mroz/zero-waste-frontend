/** biome-ignore-all lint/suspicious/noArrayIndexKey: used for skeleton*/

import { NotificationCardSkeleton } from "./notification-card-skeleton";

export function NotificationListSkeleton({
	notificationCount = 8,
}: {
	notificationCount?: number;
}) {
	return (
		<div className="space-y-2">
			{Array.from({ length: notificationCount }).map((_, i) => (
				<NotificationCardSkeleton key={i} />
			))}
		</div>
	);
}
