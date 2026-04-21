import { queryOptions } from "@tanstack/react-query";
import { USER_QUERY_KEYS } from "../constants";
import { fetchUser, fetchUsers } from "../api";

export const usersQueryOptions = () =>
	queryOptions({
		queryKey: USER_QUERY_KEYS.all,
		queryFn: async () => fetchUsers(),
	});

export const userQueryOptions = (id:string) =>
	queryOptions({
		queryKey: USER_QUERY_KEYS.byId(id),
		queryFn: async () => fetchUser(id),
	});
