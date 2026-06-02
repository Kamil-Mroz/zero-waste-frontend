import {
	Ban,
	CheckCircle2,
	type LucideIcon,
	Package,
	XCircle,
} from "lucide-react";
import { z } from "zod/v4";
import type { NotificationType } from "./types";

export const NOTIFICATIONS_QUERY_KEYS = {
	all: ["notifications"] as const,
	unreadCount: () => [...NOTIFICATIONS_QUERY_KEYS.all, "unread-count"] as const,
	popup: () => [...NOTIFICATIONS_QUERY_KEYS.all, "popup"] as const,
	detailsRoot: () => [...NOTIFICATIONS_QUERY_KEYS.all, "details"] as const,
	byId: (id: string) =>
		[...NOTIFICATIONS_QUERY_KEYS.detailsRoot(), id] as const,
	historyRoot: () => [...NOTIFICATIONS_QUERY_KEYS.all, "history"] as const,
	history: (notificationType?: NotificationType) =>
		[...NOTIFICATIONS_QUERY_KEYS.historyRoot(), notificationType] as const,
};

export const notificationTypeItems = [
	{ value: "OFFER_RECEIVED", label: "Offer received" },
	{ value: "OFFER_ACCEPTED", label: "Offer accepted" },
	{ value: "OFFER_REJECTED", label: "Offer rejected" },
	{ value: "OFFER_CANCELLED", label: "Offer cancelled" },
] as const;

export const notificationTypeSchema = z.enum(
	notificationTypeItems.map((type) => type.value),
);

export const notificationConfig: Record<
	NotificationType,
	{
		label: string;
		icon: LucideIcon;
		className: string;
		badgeVariant?:
			| "default"
			| "destructive"
			| "secondary"
			| "outline"
			| "ghost";
	}
> = {
	OFFER_RECEIVED: {
		label: "Offer received",
		icon: Package,
		className: "text-blue-500",
		badgeVariant: "default",
	},

	OFFER_ACCEPTED: {
		label: "Offer accepted",
		icon: CheckCircle2,
		className: "text-green-500",
		badgeVariant: "default",
	},

	OFFER_REJECTED: {
		label: "Offer rejected",
		icon: XCircle,
		className: "text-red-500",
		badgeVariant: "destructive",
	},

	OFFER_CANCELLED: {
		label: "Offer cancelled",
		icon: Ban,
		className: "text-muted-foreground",
		badgeVariant: "secondary",
	},
};
