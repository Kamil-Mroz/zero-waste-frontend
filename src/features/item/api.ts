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
