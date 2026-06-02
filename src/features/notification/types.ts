import type { z } from "zod/v4";
import type { CursorDirection, CursorRequest } from "../shared/types";
import type { notificationTypeSchema } from "./constants";

export type NotificationType = z.infer<typeof notificationTypeSchema>;

export type Notification = {
	id: string;

	type: NotificationType;

	title: string;

	message: string;

	referenceId: string;

	referenceType: string;

	read: boolean;

	createdAt: string;
};

export type PageParam = {
	cursor?: CursorRequest;
	direction: CursorDirection;
};
