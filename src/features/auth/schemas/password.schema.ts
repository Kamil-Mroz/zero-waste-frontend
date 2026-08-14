import { z } from "zod/v4";

export const passwordSchema = z
	.string()
	.nonempty("Password is required")
	.regex(
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
		"Password requires at least one of each: [a-z], [A-Z], [0-9], [@$!%*?&]",
	)
	.min(10, "Password must be at least 10 characters")
	.max(128, "Password can be maximum 128 characters");

export const createPasswordSchema = z
	.object({
		newPassword: passwordSchema,
		confirmPassword: z.string(),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		path: ["confirmPassword"],
		error: "Passwords do not match",
	});

export const updatePasswordSchema = z
	.object({
		currentPassword: z.string().min(1, "Current password is required"),
		newPassword: passwordSchema,
		confirmPassword: z.string(),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		path: ["confirmPassword"],
		error: "Passwords do not match",
	});

export type CreatePasswordInput = z.infer<typeof createPasswordSchema>;
export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;
