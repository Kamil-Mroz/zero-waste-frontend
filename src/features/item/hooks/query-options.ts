import { queryOptions } from "@tanstack/react-query";
import { fetchItem, fetchItems, fetchOwnItems, fetchUserItems } from "../api";
import { ITEM_QUERY_KEYS } from "../constants";
import type { ItemsQueryOptions, OwnItemsQueryOptions } from "../types";

export const ownItemsQueryOptions = (search: Partial<OwnItemsQueryOptions>) =>
	queryOptions({
		queryKey: [...ITEM_QUERY_KEYS.own(), search],
		queryFn: async () => fetchOwnItems(search),
	});
export const userItemsQueryOptions = (userId: string) =>
	queryOptions({
		queryKey: ITEM_QUERY_KEYS.byOwner(userId),
		queryFn: async () => fetchUserItems(userId),
	});
export const itemsQueryOptions = (search: Partial<ItemsQueryOptions>) =>
	queryOptions({
		queryKey: [...ITEM_QUERY_KEYS.all, search],
		queryFn: async () => fetchItems(search),
	});

export const itemQueryOptions = (id: string) =>
	queryOptions({
		queryKey: ITEM_QUERY_KEYS.byId(id),
		queryFn: async () => fetchItem(id),
		retry: false,
	});
