import { queryOptions } from "@tanstack/react-query";
import { fetchUser, fetchUsers } from "../api";
import { USER_QUERY_KEYS } from "../constants";
import type { UsersQueryOptionsProps } from "../types";

export const usersQueryOptions = (options: UsersQueryOptionsProps) =>
	queryOptions({
		queryKey: [...USER_QUERY_KEYS.all, options],
		queryFn: async () => fetchUsers(options),
	});

export const userQueryOptions = (id: string) =>
	queryOptions({
		queryKey: USER_QUERY_KEYS.byId(id),
		queryFn: async () => fetchUser(id),
	});
