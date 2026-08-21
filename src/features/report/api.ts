import { api } from "@/lib/axios";
import type {
	RejectReportRequest,
	Report,
	ReportRequest,
	ResolveReportRequest,
} from "./types";

export const sendReport = async (data: ReportRequest) => {
	const response = await api.post("/v1/reports", data);
	return response.data;
};

export const getReports = async () => {
	const response = await api.get<Report[]>("/v1/reports");
	return response.data;
};

export const rejectReport = async (
	reportId: string,
	data: RejectReportRequest,
) => {
	const response = await api.post(`/v1/reports/${reportId}/reject`, data);
	return response.data;
};

export const resolveReport = async (
	reportId: string,
	data: ResolveReportRequest,
) => {
	const response = await api.post(`/v1/reports/${reportId}/resolve`, data);
	return response.data;
};
