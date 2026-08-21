import { Button } from "@/features/shared/components/ui/button";
import { FieldGroup } from "@/features/shared/components/ui/field";
import { useIsMobile } from "@/features/shared/hooks/use-mobile";
import { actionsBySubject } from "../constants";
import { useReportResolveForm } from "../hooks/form-options";
import type { Report } from "../types";

type ReportRejectFormProps = {
	report: Report;
	onSuccess: () => void;
};

export default function ReportResolveForm({
	report,
	onSuccess,
}: ReportRejectFormProps) {
	const form = useReportResolveForm({ report, onSuccess });
	const isMobile = useIsMobile();
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<FieldGroup>
				<form.AppField name="action">
					{(field) => (
						<field.SelectField
							items={actionsBySubject[report.subjectType].actions}
							label="Action"
						/>
					)}
				</form.AppField>
				<form.AppField name="adminNote">
					{(field) => <field.TextareaField label="Admin note" />}
				</form.AppField>

				<div className="grid md:grid-cols-2 gap-2">
					{isMobile ? null : (
						<Button
							type="button"
							variant="secondary"
							className="inline-flex"
							onClick={onSuccess}
						>
							Cancel
						</Button>
					)}
					<form.AppForm>
						<form.SubmitButton label="Send" />
					</form.AppForm>
				</div>
			</FieldGroup>
		</form>
	);
}
