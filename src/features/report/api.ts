import { api } from "@/lib/axios";
import type { ReportRequest } from "./types";

export const sendReport = async (data: ReportRequest) => {
	const response = await api.post("/v1/reports", data);
	return response.data;
};
