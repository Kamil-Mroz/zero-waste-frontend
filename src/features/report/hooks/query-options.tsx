import { queryOptions } from "@tanstack/react-query";
import { getReports } from "../api";
import { REPORT_QUERY_KEYS } from "../constants";

export const reportsQueryOptions = () =>
	queryOptions({
		queryKey: [...REPORT_QUERY_KEYS.all],
		queryFn: getReports,
	});
