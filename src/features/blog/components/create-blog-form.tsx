import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/features/shared/components/ui/card";
import { FieldGroup } from "@/features/shared/components/ui/field";
import { useCreateBlogForm } from "../hooks/form-options";

function CreateBlogForm() {
	const form = useCreateBlogForm();
	return (
		<div className="grid place-items-center h-full">
			<Card className="mx-auto w-full max-w-md">
				<CardHeader>
					<CardTitle>Blog creator</CardTitle>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							form.handleSubmit();
						}}
					>
						<FieldGroup>
							<form.AppField name="title">
								{(field) => <field.TextField label="Title" />}
							</form.AppField>
							<form.AppField name="description">
								{(field) => <field.TextareaField label="Description" />}
							</form.AppField>

							<form.AppField name="content">
								{(field) => <field.TextareaField label="Content" />}
							</form.AppField>
							<div className="grid grid-cols-2 gap-1">
								<form.AppForm>
									<form.ResetButton />
								</form.AppForm>
								<form.AppForm>
									<form.SubmitButton label="Create" />
								</form.AppForm>
							</div>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
export default CreateBlogForm;
