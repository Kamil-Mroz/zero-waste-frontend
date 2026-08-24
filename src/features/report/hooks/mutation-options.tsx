import { mutationOptions } from "@tanstack/react-query";
import { appToast } from "@/features/shared/components/toast";
import { handleApiError } from "@/lib/utils";
import { rejectReport, resolveReport, sendReport } from "../api";
import type { RejectReportRequest, ResolveReportRequest } from "../types";

export const sendReportMutationOptions = () =>
	mutationOptions({
		mutationFn: sendReport,
		onError: (error) => {
			const message = handleApiError(error);
			if (message) {
				appToast.error({ title: "Failed to report", description: message });
			}
		},
	});

export const rejectReportMutationOptions = (reportId: string) =>
	mutationOptions({
		mutationFn: (data: RejectReportRequest) => rejectReport(reportId, data),
		onError: (error) => {
			const message = handleApiError(error);
			if (message) {
				appToast.error({ title: "Rejection failed", description: message });
			}
		},
	});

export const resolveReportMutationOptions = (reportId: string) =>
	mutationOptions({
		mutationFn: (data: ResolveReportRequest) => resolveReport(reportId, data),
		onError: (error) => {
			const message = handleApiError(error);
			if (message) {
				appToast.error({ title: "Resolve failed", description: message });
			}
		},
	});
