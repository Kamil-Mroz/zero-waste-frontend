import { api } from "@/lib/axios";
import type { Page, Pageable } from "../shared/types";
import type { Offer } from "./types";

export const showInterestInItem = async (id: string) => {
	return api.post(`/api/v1/offers/${id}`);
};
export const getOwnOffers = async (options: Partial<Pageable>) => {
	const res = await api.get<Page<Offer[]>>(`/api/v1/offers/own`, {
		params: options,
	});
	return res.data;
};
export const getReceivedOffers = async (options: Partial<Pageable>) => {
	const res = await api.get<Page<Offer[]>>(`/api/v1/offers/received`, {
		params: options,
	});
	return res.data;
};

export const offerCancel = async (id: string) => {
	return api.post(`/api/v1/offers/${id}/cancel`);
};

export const offerReject = async (id: string) => {
	return api.post(`/api/v1/offers/${id}/reject`);
};
export const offerAccept = async (id: string) => {
	return api.post(`/api/v1/offers/${id}/accept`);
};
