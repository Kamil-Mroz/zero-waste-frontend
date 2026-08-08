import { formOptions } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useAppForm } from "@/features/shared/components/form/form";
import { appToast } from "@/features/shared/components/toast";
import { handleApiError } from "@/lib/utils";
import {
	type BanUserSchema,
	deleteUserFormSchema,
} from "../schemas/user.schema";
import { useUserAccountDeleteMutation } from "./mutation-options";

export const userFormOptions = () => {
	return formOptions({
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
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

export const useDeleteForm = ({ onSuccess }: { onSuccess: () => void }) => {
	const client = useQueryClient();
	const router = useRouter();
	const navigate = useNavigate();
	const { resetState } = useAuth();
	const mutation = useUserAccountDeleteMutation();
	return useAppForm({
		defaultValues: {
			confirmation: "",
		},
		validators: {
			onSubmit: deleteUserFormSchema,
		},
		onSubmit: async ({ value, formApi }) => {
			try {
				if (value.confirmation !== "DELETE") {
					appToast.error({
						title: "Submission failed",
						description: "You have to type DELETE",
					});
					formApi.reset();
					return;
				}
				await mutation.mutateAsync();

				client.clear();

				formApi.reset();

				resetState();

				await router.invalidate();
				onSuccess();

				await navigate({ to: "/marketplace" });
			} catch (error) {
				const message = handleApiError(error, formApi);
				if (message)
					appToast.error({
						title: "Delete account failed",
						description: message,
					});
			}
		},
	});
};
