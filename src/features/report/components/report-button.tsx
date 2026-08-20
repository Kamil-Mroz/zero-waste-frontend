import { Flag } from "lucide-react";
import { useState } from "react";
import ResponsiveDialog from "@/features/shared/components/responsive-dialog";
import { Button } from "@/features/shared/components/ui/button";
import { FieldGroup } from "@/features/shared/components/ui/field";
import { useIsMobile } from "@/features/shared/hooks/use-mobile";
import { REPORT_REASONS } from "../constants";
import { useReportForm } from "../hooks/form-options";
import type { ReportSubjectType } from "../types";

type ReportButtonProps = {
	subjectType: ReportSubjectType;
	subjectId: string;
};
export function ReportButton({ subjectId, subjectType }: ReportButtonProps) {
	const [showReportModal, setShowReportModal] = useState(false);

	const closeModal = () => setShowReportModal(false);
	const isMobile = useIsMobile();

	const form = useReportForm({ subjectId, subjectType, closeModal });
	return (
		<>
			<Button variant="warning" onClick={() => setShowReportModal(true)}>
				<span className="sr-only">
					Report {subjectType.toLocaleLowerCase()}
				</span>
				<Flag />
			</Button>
			<ResponsiveDialog
				isOpen={showReportModal}
				setIsOpen={() => setShowReportModal((prev) => !prev)}
				title={`Report ${subjectType.toLocaleLowerCase()}`}
			>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit();
					}}
				>
					<FieldGroup>
						<form.AppField name="reason">
							{(field) => (
								<field.SelectField label="Reason" items={REPORT_REASONS} />
							)}
						</form.AppField>
						<form.AppField name="comment">
							{(field) => (
								<field.TextareaField
									label="Comment (optional)"
									type="password"
								/>
							)}
						</form.AppField>

						<div className="grid md:grid-cols-2 gap-2">
							{isMobile ? null : (
								<Button
									type="button"
									variant="secondary"
									className="hidden md:inline-flex"
									onClick={closeModal}
								>
									Cancel
								</Button>
							)}
							<form.AppForm>
								<form.SubmitButton label="Submit" />
							</form.AppForm>
						</div>
					</FieldGroup>
				</form>
			</ResponsiveDialog>
		</>
	);
}
