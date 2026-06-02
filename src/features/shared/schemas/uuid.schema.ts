import { z } from "zod/v4";
export const itemParamSchema = z.object({
	itemId: z.uuid({ error: "Invalid path param" }),
});
export const categoryParamSchema = z.object({
	categoryId: z.uuid({ error: "Invalid path param" }),
});
export const notificationParamSchema = z.object({
	notificationId: z.uuid({ error: "Invalid path param" }),
});

export const userParamSchema = z.object({
	userId: z.uuid({ error: "Invalid path param" }),
});
