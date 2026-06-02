import {
	getRouteApi,
	type RegisteredRouter,
	type RouteIds,
	type SearchParamOptions,
} from "@tanstack/react-router";
import { cleanEmptyParams } from "@/lib/utils";

export function useFilters<
	TId extends RouteIds<RegisteredRouter["routeTree"]>,
	TSearchParams extends SearchParamOptions<
		RegisteredRouter,
		TId,
		TId
	>["search"],
>(routeId: TId) {
	const routeApi = getRouteApi<TId>(routeId);
	const navigate = routeApi.useNavigate();
	const filters = routeApi.useSearch();

	const setFilters = (partialFilters: Partial<TSearchParams>) =>
		navigate({
			search: cleanEmptyParams({
				...filters,
				...partialFilters,
			}) as TSearchParams,
		});

	const clearFilters = (keys: (keyof typeof filters)[]) => {
		const next = { ...filters };
		for (const key of keys) {
			delete next[key];
		}
		navigate({
			search: cleanEmptyParams(next) as TSearchParams,
			replace: true,
		});
	};

	const resetFilters = () =>
		navigate({ search: {} as TSearchParams, replace: true });

	return { filters, setFilters, resetFilters, clearFilters };
}
