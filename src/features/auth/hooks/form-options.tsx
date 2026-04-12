import { formOptions } from "@tanstack/react-form";
import { loginSchema } from "../schemas/login.schema";
import { registerSchema } from "../schemas/register.schema";

export const registerFormOpts = () =>
	formOptions({
		defaultValues: {
			firstName: "John",
			lastName: "Doe",
			email: "john.doe@example.com",
			password: "SecurePassword123!",
			location: "Texas",
			phoneNumber: "23912123",
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
