import { z } from "zod/v4";
export const loginSchema = z.object({
	email: z.email("Provide a valid email"),
	password: z.string().nonempty("Password is required"),
});
