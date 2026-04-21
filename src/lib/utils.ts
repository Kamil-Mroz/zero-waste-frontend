import type { AnyFormApi } from "@tanstack/react-form";
import { AxiosError } from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export type ApiError = {
	detail: string;
	instance: string;
	status: number;
	title: string;
	errors?: Record<string, { message: string }>;
};

export const handleApiError = (
	error: unknown,

	form?: AnyFormApi,
) => {
	if (error instanceof AxiosError && error.response) {
		const data = error.response.data as ApiError;

		if (data.errors && form) {
			form.setErrorMap({
				onSubmit: { fields: data.errors },
			});
			return;
		}
		return data.detail;
	}
	return "Something went wrong, please try again";
};
