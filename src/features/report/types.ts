import { z } from "zod/v4";
import type { UserSummary } from "../users/types";
import type {
	reportRejectSchema,
	reportResolveSchema,
	reportSchema,
} from "./schemas/report.schema";

export type ReportSubjectType = "ITEM" | "USER" | "REVIEW" | "BLOG";

export type ReportAction = "HIDE" | "BAN" | "REMOVE";
export type ReportReason =
	| "SPAM"
	| "HARASSMENT"
	| "INAPPROPRIATE_CONTENT"
	| "COPYRIGHT"
	| "FRAUD"
	| "MISINFORMATION"
	| "OTHER";

export type ReportStatus = "PENDING" | "RESOLVED" | "REJECTED";

export type Report = {
	id: string;
	reporter: UserSummary;
	subjectType: ReportSubjectType;
	subjectId: string;
	reason: ReportReason;
	comment: string | null;
	status: ReportStatus;
	resolvedAt: string | null;
	resolvedBy: UserSummary | null;
	adminNote: string | null;
};

export type ReportRequest = z.infer<typeof reportSchema>;
export type RejectReportRequest = z.infer<typeof reportRejectSchema>;
export type ResolveReportRequest = z.infer<typeof reportResolveSchema>;
