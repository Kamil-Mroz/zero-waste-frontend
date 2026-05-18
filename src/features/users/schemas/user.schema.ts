import { z } from "zod/v4";
import { registerSchema } from "@/features/auth/schemas/register.schema";

export const roleSchema = z.enum(["ADMIN", "USER", "WRITER"]);

export const createUserSchema = registerSchema.extend({
	roles: z.array(roleSchema),
});
export type CreateUserType = z.infer<typeof createUserSchema>;

export const passwordSchema = z
	.string()
	.regex(
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
		"Password requires at least one of each: [a-z], [A-Z], [0-9], [@$!%*?&]",
	);

export const updateUserSchema = registerSchema.extend({
	roles: z.array(roleSchema),
	password: z
		.string()
		.transform((v) => v.trim())
		.transform((v) => (v === "" ? undefined : v))
		.pipe(passwordSchema.optional()),
});

export type UpdateUserType = z.infer<typeof updateUserSchema>;

export const banUserSchema = z.object({
	ids: z.array(z.uuid()).min(1),
	reason: z.string().trim().nonempty("Reason required"),
	expiresAt: z.iso
		.datetime({ offset: true })
		.optional()
		.refine(
			(value) => {
				if (!value) return true;

				return new Date(value) > new Date();
			},
			{ error: "Date must be in the future" },
		),
});
export type BanUserSchema = z.infer<typeof banUserSchema>;

export const userParamSchema = z.object({
	userId: z.uuid(),
});

export const unbanUserSchema = z.object({
	ids: z.array(z.uuid()).min(1),
	revokedReason: z.string().trim().nonempty("Reason required"),
});

export const userParamsSchema = z.object({
	modal: z
		.enum(["create", "edit", "ban", "delete", "unban"])
		.optional()
		.catch("create"),
	userId: z.uuid().optional().catch(""),
	text: z.string().optional().catch(""),
	roles: z.array(roleSchema).optional().catch([]),
});
