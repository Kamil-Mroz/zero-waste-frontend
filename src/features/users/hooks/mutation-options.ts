import { mutationOptions, useMutation } from "@tanstack/react-query";
import { appToast } from "@/features/shared/components/toast";
import { handleApiError } from "@/lib/utils";
import {
	banUsers,
	createUser,
	deleteUser,
	deleteUsers,
	unbanUsers,
	updateUser,
} from "../api";
import type { UpdateUserType } from "../schemas/user.schema";

export function userCreateMutationOptions() {
	return mutationOptions({
		mutationFn: createUser,
	});
}
export function userUpdateMutationOptions(id: string) {
	return mutationOptions({
		mutationFn: (values: UpdateUserType) => updateUser(id, values),
	});
}

export function userDeleteMutationOptions() {
	return mutationOptions({
		mutationFn: deleteUsers,
		onError: (error) => {
			const message = handleApiError(error);
			if (message) {
				appToast.error({ title: "Delete failed", description: message });
			}
		},
	});
}
export function userBanMutationOptions() {
	return mutationOptions({
		mutationFn: banUsers,
	});
}
export function userUnbanMutationOptions() {
	return mutationOptions({
		mutationFn: unbanUsers,
	});
}

export function useUserAccountDeleteMutation() {
	return useMutation({
		mutationFn: deleteUser,
	});
}
