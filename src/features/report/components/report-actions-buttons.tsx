import { useState } from "react";
import ResponsiveDialog from "@/features/shared/components/responsive-dialog";
import { Button } from "@/features/shared/components/ui/button";
import { actionsBySubject } from "../constants";
import type { Report } from "../types";
import ReportRejectForm from "./report-reject-form";
import ReportResolveForm from "./report-resolve-form";

export default function ReportActionsButton({ report }: { report: Report }) {
	const [isOpen, setIsOpen] = useState<"REJECT" | "RESOLVE" | null>(null);

	const closeDialog = () => {
		setIsOpen(null);
	};
	return (
		<div className="flex items-center gap-2">
			<Button variant={"secondary"} onClick={() => setIsOpen("REJECT")}>
				Reject
			</Button>
			<Button variant={"destructive"} onClick={() => setIsOpen("RESOLVE")}>
				{actionsBySubject[report.subjectType].label}
			</Button>
			<ResponsiveDialog
				isOpen={!!isOpen}
				setIsOpen={(open) => {
					if (!open) closeDialog();
				}}
				title={
					isOpen === "REJECT"
						? "Reject report"
						: actionsBySubject[report.subjectType].label
				}
				description={
					isOpen === "REJECT"
						? "Reject this report and leave the reported content unchanged."
						: actionsBySubject[report.subjectType].description
				}
			>
				{isOpen === "RESOLVE" && (
					<ReportResolveForm report={report} onSuccess={closeDialog} />
				)}
				{isOpen === "REJECT" && (
					<ReportRejectForm report={report} onSuccess={closeDialog} />
				)}
			</ResponsiveDialog>
		</div>
	);
}
