import { api } from "@/lib/axios";
import type { Page } from "../shared/types";
import type {
	ItemsQueryOptions,
	ItemType,
	ItemWithOwnerType,
	OwnItemsQueryOptions,
} from "./types";

export const fetchOwnItems = async (search: Partial<OwnItemsQueryOptions>) => {
	const res = await api.get<Page<ItemType[]>>(`/v1/items/own`, {
		params: search,
	});
	return res.data;
};

export const fetchItems = async (search: Partial<ItemsQueryOptions>) => {
	const res = await api.get<Page<ItemType[]>>(`/v1/items`, {
		params: search,
	});
	return res.data;
};

export const fetchUserItems = async (userId: string) => {
	const res = await api.get<ItemType[]>(`/v1/items/user/${userId}`);
	return res.data;
};

export const fetchItem = async (id: string) => {
	const res = await api.get<ItemWithOwnerType>(`/v1/items/${id}`);
	return res.data;
};

export const fetchItemDetails = async (id: string) => {
	const res = await api.get<ItemWithOwnerType>(`/v1/items/${id}/details`);
	return res.data;
};

export const createItem = async (values: FormData) => {
	const res = await api.post<ItemType>(`/v1/items`, values, {
		headers: { "Content-Type": "multipart/form-data" },
	});
	return res.data;
};
export const updateItem = async (id: string, values: FormData) => {
	const res = await api.put<ItemType>(`/v1/items/${id}`, values, {
		headers: { "Content-Type": "multipart/form-data" },
	});
	return res.data;
};

export const deleteItem = async (id: string) => {
	return api.delete(`/v1/items/${id}`);
};

export const hideItem = async (id: string) => {
	return api.patch<ItemType>(`/v1/items/${id}/hide`);
};

export const publishItem = async (id: string) => {
	return api.patch<ItemType>(`/v1/items/${id}/publish`);
};
