import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/features/shared/components/ui/card";
import { FieldGroup } from "@/features/shared/components/ui/field";
import { useCreateReviewForm } from "../hooks/form-options";

type ReviewCreateFormProps = {
	offerId: string;
};
export function ReviewCreateForm({ offerId }: ReviewCreateFormProps) {
	const form = useCreateReviewForm(offerId);

	return (
		<div className="grid place-items-center h-full">
			<Card className="mx-auto w-full max-w-md">
				<CardHeader>
					<CardTitle>Leave a review</CardTitle>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							form.handleSubmit();
						}}
					>
						<FieldGroup>
							<form.AppField name="rating">
								{(field) => <field.RatingField label="Rating" />}
							</form.AppField>
							<form.AppField name="comment">
								{(field) => <field.TextareaField label="Comment" />}
							</form.AppField>

							<div className="grid grid-cols-2 gap-1">
								<form.AppForm>
									<form.ResetButton />
								</form.AppForm>
								<form.AppForm>
									<form.SubmitButton label="Submit" />
								</form.AppForm>
							</div>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
