import { z } from "zod/v4";
export const registerSchema = z.object({
	firstName: z.string().nonempty("First name required"),
	lastName: z.string().nonempty("Last name required"),
	email: z.email("Provide a valid email"),
	password: z
		.string()
		.nonempty("Password is required")
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
			"Password requires at least one: [a-z], [A-z], [0-9], [@$!%*?&]",
		)
		.min(10, "Password must be at least 10 characters")
		.max(128, "Password can be maximum 128 characters"),
	city: z.string().nonempty("City is required"),
	phoneNumber: z
		.string()
		.regex(
			/^\+?(\d{1,3})?[-.\s]?(\(?\d{3}\)?[-.\s]?)?(\d[-.\s]?){6,9}\d$/,
			"Provide a valid format phone number",
		),
});
