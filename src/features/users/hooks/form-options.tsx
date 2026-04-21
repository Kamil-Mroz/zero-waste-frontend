import { formOptions } from "@tanstack/react-form";
import type { BanUserSchema } from "../schemas/user.schema";

export const userFormOptions = () => {
	return formOptions({
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			phoneNumber: "",
			roles: ["USER"],
		},
	});
};

export const userBanFormOptions = (ids: string[]) => {
	const date = new Date();
	date.setDate(date.getDate() + 1);
	return formOptions({
		defaultValues: {
			ids,
			reason: "",
			expiresAt: date.toISOString(),
		} as BanUserSchema,
	});
};

export const userUnbanFormOptions = (ids: string[]) => {
	return formOptions({
		defaultValues: {
			ids,
			revokedReason: "",
		},
	});
};
