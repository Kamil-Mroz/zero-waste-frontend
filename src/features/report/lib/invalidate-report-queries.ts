import type { QueryClient } from "@tanstack/react-query";
import { REPORT_QUERY_KEYS } from "../constants";
import type { Report } from "../types";

export const invalidateReportQueries = async (
	queryClient: QueryClient,
	report: Report,
) => {
	queryClient.invalidateQueries({ queryKey: REPORT_QUERY_KEYS.all });
};
