import { mutationOptions } from "@tanstack/react-query";
import {
	banUsers,
	createUser,
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
