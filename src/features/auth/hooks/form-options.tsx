import { formOptions } from "@tanstack/react-form";
import { loginSchema } from "../schemas/login.schema";
import { registerSchema } from "../schemas/register.schema";

export const registerFormOpts = () =>
	formOptions({
		defaultValues: {
			firstName: "john",
			lastName: "doe",
			email: "john.doe@example.com",
			password: "SecurePassword123!",
			phoneNumber: "123 123 123",
		},
		validators: {
			onSubmit: registerSchema,
		},
	});

export const loginFormOpts = () =>
	formOptions({
		defaultValues: {
			email: "john.doe@example.com",
			password: "SecurePassword123!",
		},
		validators: {
			onSubmit: loginSchema,
		},
	});
