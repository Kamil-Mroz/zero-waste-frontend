import { queryOptions } from "@tanstack/react-query";
import type { Pageable } from "@/features/shared/types";
import { getOwnOffers, getReceivedOffers } from "../api";
import { OFFER_QUERY_KEYS } from "../constants";

export const ownOffersQueryOptions = (options: Partial<Pageable>) =>
	queryOptions({
		queryKey: [...OFFER_QUERY_KEYS.own(), options],
		queryFn: async () => getOwnOffers(options),
		staleTime: 30_000,
	});

export const receivedOffersQueryOptions = (options: Partial<Pageable>) =>
	queryOptions({
		queryKey: [...OFFER_QUERY_KEYS.received(), options],
		queryFn: async () => getReceivedOffers(options),
		staleTime: 30_000,
	});
