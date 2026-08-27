import { formOptions } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { AUTH_QUERY_KEYS } from "@/features/auth/constants";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
	type CreatePasswordInput,
	createPasswordSchema,
	type UpdatePasswordInput,
	updatePasswordSchema,
} from "@/features/auth/schemas/password.schema";
import { useAppForm } from "@/features/shared/components/form/form";
import { appToast } from "@/features/shared/components/toast";
import {
	type BanUserSchema,
	deleteUserFormSchema,
} from "../schemas/user.schema";
import type { User } from "../types";
import {
	createPasswordMutationOptions,
	updatePasswordMutationOptions,
	useUserAccountDeleteMutation,
} from "./mutation-options";

export const userFormOptions = (user?: User) => {
	return formOptions({
		defaultValues: {
			nickname: user?.nickname || "",
			email: user?.email || "",
			password: "",
			role: user?.role ? user.role : "USER",
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
			} catch {}
		},
	});
};

export const usePasswordManagerForm = (
	hasPassword: boolean,
	setShowForm: (state: boolean) => void,
) => {
	const queryClient = useQueryClient();
	const router = useRouter();
	const createPasswordMutation = useMutation(createPasswordMutationOptions());

	const updatePasswordMutation = useMutation(updatePasswordMutationOptions());

	const schema = hasPassword ? updatePasswordSchema : createPasswordSchema;

	return useAppForm({
		defaultValues: hasPassword
			? {
					currentPassword: "",
					newPassword: "",
					confirmPassword: "",
				}
			: {
					newPassword: "",
					confirmPassword: "",
				},
		validators: {
			onSubmit: schema,
		},
		onSubmit: async ({ value, formApi }) => {
			try {
				if (hasPassword) {
					await updatePasswordMutation.mutateAsync({
						value: {
							currentPassword: value.currentPassword,
							newPassword: value.newPassword,
							confirmPassword: value.confirmPassword,
						} as UpdatePasswordInput,
						form: formApi,
					});
				} else {
					await createPasswordMutation.mutateAsync({
						value: {
							newPassword: value.newPassword,
							confirmPassword: value.confirmPassword,
						} as CreatePasswordInput,
						form: formApi,
					});
				}
				formApi.reset();
				await queryClient.invalidateQueries({
					queryKey: AUTH_QUERY_KEYS.connections(),
				});
				setShowForm(false);
				await router.invalidate();
				appToast.success({ description: "Password save successfully" });
			} catch {}
		},
	});
};
