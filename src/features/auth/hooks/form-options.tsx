import { formOptions } from "@tanstack/react-form";
import { loginSchema } from "../schemas/login.schema";
import { registerSchema } from "../schemas/register.schema";

export const registerFormOpts = () =>
	formOptions({
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			phoneNumber: "",
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
