import { appToast } from "@/features/shared/components/toast";
import type { Report } from "../types";

export function showReportToast(report: Report) {
	const title = `Report on ${report.subjectType.split("_").join(" ").toLocaleLowerCase()}`;
	switch (report.subjectType) {
		default: {
			appToast.warning({
				title: title,
				...(report.comment ? { description: report.comment } : {}),
				action: {
					label: "View",
					href: `/admin/reports`,
				},
			});
		}
	}
}
