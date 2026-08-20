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
