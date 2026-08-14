import { queryOptions } from "@tanstack/react-query";
import { getConnections } from "../api";
import { AUTH_QUERY_KEYS } from "../constants";

export const connectionsQueryOptions = () =>
	queryOptions({
		queryKey: AUTH_QUERY_KEYS.connections(),
		queryFn: getConnections,
	});
