import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import NotificationCard from "@/features/notification/components/notification-card";
import { NotificationListSkeleton } from "@/features/notification/components/notification-list-skeleton";
import NotificationToolbar from "@/features/notification/components/notification-toolbar";
import { notificationHistoryQueryOptions } from "@/features/notification/hooks/query-options";
import { useMarkAllAsReadMutation } from "@/features/notification/hooks/use-mutations";
import InfiniteScrollContainer from "@/features/shared/components/infinite-scroll-container";
import { Button } from "@/features/shared/components/ui/button";


export const Route = createLazyFileRoute("/_authenticated/notifications/")({
	component: RouteComponent,
	pendingComponent: NotificationListSkeleton,
});

function RouteComponent() {
	const { notificationType } = Route.useSearch();
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isFetchingPreviousPage,
		isFetching,
		isError,
		error,
	} = useSuspenseInfiniteQuery(
		notificationHistoryQueryOptions(notificationType),
	);
	const notifications = data.pages.flatMap((page) => page.items);
	const markAllAsReadMutation = useMarkAllAsReadMutation();

	const isEmpty = notifications.length === 0;

	const showMarkAllAsRead = notifications.some((n) => !n.read);
	return (
		<div className="mx-auto w-full space-y-4">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold">Notifications</h1>

				{showMarkAllAsRead && (
					<Button
						variant="outline"
						onClick={() => markAllAsReadMutation.mutate()}
					>
						Mark all as read
					</Button>
				)}
			</div>

			<NotificationToolbar />

			{!isError && isEmpty && (
				<div className="py-12 text-center text-muted-foreground">
					No notifications yet.
				</div>
			)}
			{notifications.length > 0 && (
				<InfiniteScrollContainer
					onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
					className="space-y-2"
				>
					{isFetchingPreviousPage && (
						<NotificationListSkeleton notificationCount={4} />
					)}

					{notifications.map((notification) => (
						<NotificationCard
							key={notification.id}
							notification={notification}
						/>
					))}

					{isFetchingNextPage && (
						<NotificationListSkeleton notificationCount={4} />
					)}
				</InfiniteScrollContainer>
			)}
			{isError && error && (
				<p className="text-destructive text-center">Error: {error.message}</p>
			)}
		</div>
	);
}
