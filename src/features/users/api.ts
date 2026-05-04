import { api } from "@/lib/axios";
import type { Page } from "../shared/types";
import type {
	BanUserSchema,
	CreateUserType,
	UnbanUserSchema,
	UpdateUserType,
} from "./schemas/user.schema";
import type { User, UsersQueryOptionsProps } from "./types";

export const fetchUsers = async (options: UsersQueryOptionsProps) => {
	const res = await api.get<Page<User[]>>(`/api/v1/users`, { params: options });
	return res.data;
};

export const fetchUser = async (id: string) => {
	const res = await api.get<User>(`/api/v1/users/${id}`);
	return res.data;
};

export const createUser = async (values: CreateUserType) => {
	const res = await api.post(`/api/v1/users`, values);
	return res.data;
};

export const updateUser = async (id: string, values: UpdateUserType) => {
	const res = await api.put(`/api/v1/users/${id}`, values);
	return res.data;
};

export const deleteUsers = async (ids: string[]) => {
	return api.delete(`/api/v1/users`, { data: ids });
};

export const banUsers = async (values: BanUserSchema) => {
	const res = await api.post(`/api/v1/users/ban`, values);
	return res.data;
};

export const unbanUsers = async (values: UnbanUserSchema) => {
	const res = await api.post(`/api/v1/users/unban`, values);
	return res.data;
};
