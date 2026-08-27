import type { AnyFormApi } from "@tanstack/react-form";
import { mutationOptions, useMutation } from "@tanstack/react-query";
import { createPassword, updatePassword } from "@/features/auth/api";
import type {
	CreatePasswordInput,
	UpdatePasswordInput,
} from "@/features/auth/schemas/password.schema";
import {
	banUsers,
	createUser,
	deleteUser,
	deleteUsers,
	unbanUsers,
	updateUser,
} from "../api";
import type {
	BanUserSchema,
	CreateUserType,
	UpdateUserType,
} from "../schemas/user.schema";
import type { UnbanUserSchema } from "../types";

export function userCreateMutationOptions() {
	return mutationOptions({
		mutationFn: ({ value }: { value: CreateUserType; form: AnyFormApi }) =>
			createUser(value),
	});
}
export function userUpdateMutationOptions(id: string) {
	return mutationOptions({
		mutationFn: ({ value }: { value: UpdateUserType; form: AnyFormApi }) =>
			updateUser(id, value),
	});
}

export function userDeleteMutationOptions() {
	return mutationOptions({
		mutationFn: deleteUsers,
	});
}
export function userBanMutationOptions() {
	return mutationOptions({
		mutationFn: ({ value }: { value: BanUserSchema; form: AnyFormApi }) =>
			banUsers(value),
	});
}
export function userUnbanMutationOptions() {
	return mutationOptions({
		mutationFn: ({ value }: { value: UnbanUserSchema; form: AnyFormApi }) =>
			unbanUsers(value),
	});
}

export function useUserAccountDeleteMutation() {
	return useMutation({
		mutationFn: deleteUser,
	});
}

export function createPasswordMutationOptions() {
	return mutationOptions({
		mutationFn: ({ value }: { value: CreatePasswordInput; form: AnyFormApi }) =>
			createPassword(value),
	});
}

export function updatePasswordMutationOptions() {
	return mutationOptions({
		mutationFn: ({ value }: { value: UpdatePasswordInput; form: AnyFormApi }) =>
			updatePassword(value),
	});
}
