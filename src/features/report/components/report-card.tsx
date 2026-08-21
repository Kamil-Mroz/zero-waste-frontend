import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/features/shared/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/features/shared/components/ui/card";
import { reasonConfig, subjectConfig } from "../constants";
import type { getSubjectPath } from "../lib/get-subject-paths";
import type { Report } from "../types";
import ReportActionsButton from "./report-actions-buttons";
import {
	ReportReasonBadge,
	ReportStatusBadge,
	ReportSubjectBadge,
} from "./report-badges";

type ReportCardProps = {
	report: Report;
	subjectPath: ReturnType<typeof getSubjectPath>;
};
export default function ReportCard({ report, subjectPath }: ReportCardProps) {
	return (
		<Card key={report.id}>
			<CardHeader className="flex flex-row items-start justify-between gap-4">
				<div className="space-y-1">
					<CardTitle className="text-base">
						{reasonConfig[report.reason].title}
					</CardTitle>

					<p className="text-sm text-muted-foreground">
						Reported by {report.reporter.nickname}
					</p>
				</div>

				<ReportStatusBadge status={report.status} />
			</CardHeader>

			<CardContent className="space-y-5">
				<div className="grid gap-5 sm:grid-cols-2">
					<ReportReasonBadge reason={report.reason} />

					<ReportSubjectBadge subjectType={report.subjectType} />
				</div>

				{report.comment && (
					<div className="rounded-md border bg-muted/40 p-3">
						<p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
							Reporter's comment
						</p>

						<p className="text-sm">{report.comment}</p>
					</div>
				)}

				{report.adminNote && (
					<div className="rounded-md border p-3">
						<p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
							Admin note
						</p>

						<p className="text-sm">{report.adminNote}</p>
					</div>
				)}

				<div className="flex items-center justify-between border-t pt-4">
					<div className="text-xs text-muted-foreground">
						{report.resolvedAt
							? `Resolved by ${report.resolvedBy?.nickname ?? "admin"}`
							: "Awaiting review"}
					</div>

					{report.status === "PENDING" && (
						<ReportActionsButton report={report} />
					)}

					<Button asChild size="sm">
						<Link to={subjectPath.url} params={subjectPath.params}>
							View {subjectConfig[report.subjectType].title}
							<ArrowRight className="ml-2 size-4" />
						</Link>
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
