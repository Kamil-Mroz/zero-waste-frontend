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
		<Card className="w-full">
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

						<div className="grid md:grid-cols-2 gap-1 ">
							<div className="order-last md:order-first grid">
								<form.AppForm>
									<form.ResetButton />
								</form.AppForm>
							</div>
							<div className="order-first md:order-last">
								<form.AppForm>
									<form.SubmitButton label="Submit" />
								</form.AppForm>
							</div>
						</div>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
}
