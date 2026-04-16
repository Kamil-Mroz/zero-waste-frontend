import { queryOptions } from "@tanstack/react-query";
import { fetchItem, fetchItems, fetchOwnItems } from "../api";
import { ITEM_QUERY_KEYS } from "../constants";

export const ownItemsQueryOptions = () =>
	queryOptions({
		queryKey: ITEM_QUERY_KEYS.own(),
		queryFn: async () => fetchOwnItems(),
	});

export const itemsQueryOptions = () =>
	queryOptions({
		queryKey: ITEM_QUERY_KEYS.all,
		queryFn: async () => fetchItems(),
	});

export const itemQueryOptions = (id: string) =>
	queryOptions({
		queryKey: ITEM_QUERY_KEYS.byId(id),
		queryFn: async () => fetchItem(id),
		retry: false,
	});
