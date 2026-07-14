import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/features/shared/components/ui/card";
import { FieldGroup } from "@/features/shared/components/ui/field";
import { useBlogForm } from "../hooks/form-options";
import type { BlogType } from "../types";

type BlogFormProps = {
	blog?: BlogType;
};

function BlogForm({ blog }: BlogFormProps) {
	const form = useBlogForm(blog);
	return (
		<div className="">
			<Card className="">
				<CardHeader>
					<CardTitle>Blog form</CardTitle>
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
									<form.SubmitButton label={blog ? "Update" : "Create"} />
								</form.AppForm>
							</div>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
export default BlogForm;
