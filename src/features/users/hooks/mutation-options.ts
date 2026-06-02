import { mutationOptions } from "@tanstack/react-query";
import {
	banUsers,
	createUser,
	deleteUsers,
	unbanUsers,
	updateUser,
} from "../api";
import type { UpdateUserType } from "../schemas/user.schema";
import { handleApiError } from "@/lib/utils";
import { toast } from "sonner";
import { appToast } from "@/features/shared/components/toast";

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
