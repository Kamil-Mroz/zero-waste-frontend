import { useQuery } from "@tanstack/react-query";
import { Bell } from "lucide-react";
import { useState } from "react";
import { Button } from "@/features/shared/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/features/shared/components/ui/popover";
import {
	notificationPopupQueryOptions as notificationPopupQueryOptions,
	unreadCountQueryOptions,
} from "../hooks/query-options";
import NotificationPopupList from "./notification-popup-list";

function NotificationPopup() {
	const { data: unreadData } = useQuery(unreadCountQueryOptions());

	const { data: popupData, refetch } = useQuery(
		notificationPopupQueryOptions(),
	);

	const notifications = popupData?.items ?? [];
	const unreadCount = unreadData?.unreadCount ?? 0;
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Popover
			modal
			open={isOpen}
			onOpenChange={(open) => {
				setIsOpen((prev) => !prev);
				if (open) refetch();
			}}
		>
			<PopoverTrigger asChild>
				<Button size="icon-lg" variant="ghost" className="ml-auto relative">
					<Bell />
					{unreadCount > 0 && (
						<span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-xs  text-white">
							{unreadCount}
						</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent align="end" className="w-80">
				<NotificationPopupList
					notifications={notifications}
					onClose={() => setIsOpen(false)}
				/>
			</PopoverContent>
		</Popover>
	);
}
export default NotificationPopup;
