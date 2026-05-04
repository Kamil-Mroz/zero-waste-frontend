import { api } from "@/lib/axios";
import type { ItemType, ItemWithOwnerType } from "./types";

export const fetchOwnItems = async () => {
	const res = await api.get<ItemType[]>(`/api/v1/items/own`);
	return res.data;
};

export const fetchItems = async () => {
	const res = await api.get<ItemType[]>(`/api/v1/items`);
	return res.data;
};

export const fetchItem = async (id: string) => {
	const res = await api.get<ItemWithOwnerType>(`/api/v1/items/${id}`);
	return res.data;
};

export const createItem = async (values: FormData) => {
	const res = await api.post<ItemType>(`/api/v1/items`, values, {
		headers: { "Content-Type": "multipart/form-data" },
	});
	return res.data;
};
export const updateItem = async (id: string, values: FormData) => {
	const res = await api.put<ItemType>(`/api/v1/items/${id}`, values, {
		headers: { "Content-Type": "multipart/form-data" },
	});
	return res.data;
};

export const deleteItem = async (id: string) => {
	return api.delete(`/api/v1/items/${id}`);
};
