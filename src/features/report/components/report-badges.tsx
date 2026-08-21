import { AlertTriangle } from "lucide-react";
import { Badge } from "@/features/shared/components/ui/badge";
import { reasonConfig, statusConfig, subjectConfig } from "../constants";
import type { ReportReason, ReportStatus, ReportSubjectType } from "../types";

export function ReportStatusBadge({ status }: { status: ReportStatus }) {
	const config = statusConfig[status];
	const Icon = config.icon;

	return (
		<Badge variant={config.variant} className="gap-1.5">
			<Icon className="size-3.5" />
			{config.title}
		</Badge>
	);
}

export function ReportReasonBadge({ reason }: { reason: ReportReason }) {
	const config = reasonConfig[reason];

	return (
		<div className="flex items-center gap-2">
			<AlertTriangle className="size-4 text-muted-foreground" />
			<div>
				<p className="font-medium">{config.title}</p>
				<p className="text-sm text-muted-foreground">{config.description}</p>
			</div>
		</div>
	);
}

export function ReportSubjectBadge({
	subjectType,
}: {
	subjectType: ReportSubjectType;
}) {
	const config = subjectConfig[subjectType];

	return (
		<div>
			<p className="text-sm font-medium">{config.title}</p>
			<p className="text-xs text-muted-foreground">{config.description}</p>
		</div>
	);
}
