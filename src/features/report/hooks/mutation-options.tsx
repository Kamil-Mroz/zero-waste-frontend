import type { AnyFormApi } from "@tanstack/react-form";
import { mutationOptions } from "@tanstack/react-query";
import { rejectReport, resolveReport, sendReport } from "../api";
import type {
	RejectReportRequest,
	ReportRequest,
	ResolveReportRequest,
} from "../types";

export const sendReportMutationOptions = () =>
	mutationOptions({
		mutationFn: ({ value }: { value: ReportRequest; form: AnyFormApi }) =>
			sendReport(value),
	});

export const rejectReportMutationOptions = (reportId: string) =>
	mutationOptions({
		mutationFn: ({ value }: { value: RejectReportRequest; form: AnyFormApi }) =>
			rejectReport(reportId, value),
	});

export const resolveReportMutationOptions = (reportId: string) =>
	mutationOptions({
		mutationFn: ({
			value,
		}: {
			value: ResolveReportRequest;
			form: AnyFormApi;
		}) => resolveReport(reportId, value),
	});
