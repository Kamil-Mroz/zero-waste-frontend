import { CheckCircle2, Clock3, XCircle } from "lucide-react";
import type {
	ReportAction,
	ReportReason,
	ReportStatus,
	ReportSubjectType,
} from "./types";

export const REPORT_QUERY_KEYS = {
	all: ["report"] as const,
} as const;

export const REPORT_REASONS = [
	{ value: "SPAM", label: "Spam" },
	{ value: "HARASSMENT", label: "Harassment" },
	{ value: "INAPPROPRIATE_CONTENT", label: "Inappropriate content" },
	{ value: "COPYRIGHT", label: "Copyright" },
	{ value: "FRAUD", label: "Fraud" },
	{ value: "MISINFORMATION", label: "Misinformation" },
	{ value: "OTHER", label: "Other" },
] as const;

export const reasonConfig: Record<
	ReportReason,
	{
		title: string;
		description: string;
	}
> = {
	SPAM: {
		title: "Spam",
		description: "This content appears to be unwanted or repetitive.",
	},
	HARASSMENT: {
		title: "Harassment",
		description: "This content may be targeting or harassing another person.",
	},
	INAPPROPRIATE_CONTENT: {
		title: "Inappropriate content",
		description: "This content may violate community guidelines.",
	},
	COPYRIGHT: {
		title: "Copyright violation",
		description: "This content may infringe someone else's copyright.",
	},
	FRAUD: {
		title: "Fraud",
		description: "This content may involve deceptive or fraudulent activity.",
	},
	MISINFORMATION: {
		title: "Misinformation",
		description: "This content may contain misleading or false information.",
	},
	OTHER: {
		title: "Other",
		description: "The reporter provided another reason for this report.",
	},
};

export const subjectConfig: Record<
	ReportSubjectType,
	{
		title: string;
		description: string;
	}
> = {
	ITEM: {
		title: "Item",
		description: "A marketplace item was reported.",
	},
	USER: {
		title: "User",
		description: "A user profile was reported.",
	},
	REVIEW: {
		title: "Review",
		description: "A review was reported.",
	},
	BLOG: {
		title: "Blog post",
		description: "A blog post was reported.",
	},
};

export const statusConfig: Record<
	ReportStatus,
	{
		title: string;
		icon: typeof Clock3;
		variant: "default" | "secondary" | "destructive" | "outline";
	}
> = {
	PENDING: {
		title: "Pending",
		icon: Clock3,
		variant: "secondary",
	},
	RESOLVED: {
		title: "Resolved",
		icon: CheckCircle2,
		variant: "default",
	},
	REJECTED: {
		title: "Rejected",
		icon: XCircle,
		variant: "destructive",
	},
};

export const actionsBySubject: Record<
	ReportSubjectType,
	{
		label: string;
		description: string;
		actions: { label: string; value: ReportAction }[];
	}
> = {
	USER: {
		label: "User action",
		description: "Choose an action to take against the reported user.",
		actions: [{ label: "Ban", value: "BAN" }],
	},
	ITEM: {
		label: "Item action",
		description: "Choose an action to take against the reported item.",
		actions: [{ label: "Hide", value: "HIDE" }],
	},
	BLOG: {
		label: "Blog action",
		description: "Choose an action to take against the reported blog post.",
		actions: [{ label: "Hide", value: "HIDE" }],
	},
	REVIEW: {
		label: "Review action",
		description: "Choose an action to take against the reported review.",
		actions: [{ label: "Hide", value: "HIDE" }],
	},
};
