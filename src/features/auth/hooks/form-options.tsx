import { formOptions } from "@tanstack/react-form";
import { loginSchema } from "../schemas/login.schema";
import { registerSchema } from "../schemas/register.schema";

export const registerFormOpts = () =>
	formOptions({
		defaultValues: {
			nickname: "",
			email: "",
			password: "",
		},
		validators: {
			onSubmit: registerSchema,
		},
	});

export const loginFormOpts = () =>
	formOptions({
		defaultValues: {
			email: "",
			password: "",
		},
		validators: {
			onSubmit: loginSchema,
		},
	});
