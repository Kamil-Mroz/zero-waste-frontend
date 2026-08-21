import { CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/features/shared/components/ui/card";
import { getSubjectPath } from "../lib/get-subject-paths";
import type { Report } from "../types";
import ReportCard from "./report-card";
export function ReportList({ reports }: { reports: Report[] }) {
	if (reports.length === 0) {
		return (
			<Card>
				<CardContent className="flex flex-col items-center justify-center py-12 text-center">
					<CheckCircle2 className="mb-3 size-8 text-muted-foreground" />
					<h3 className="font-semibold">No reports</h3>
					<p className="mt-1 text-sm text-muted-foreground">
						There are currently no reports to review.
					</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<div className="space-y-4">
			{reports.map((report) => {
				const subjectPath = getSubjectPath(report);

				return (
					<ReportCard
						key={report.id}
						report={report}
						subjectPath={subjectPath}
					/>
				);
			})}
		</div>
	);
}
