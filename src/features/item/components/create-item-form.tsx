import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { useAppForm } from "@/features/shared/components/form/form";
import { appToast } from "@/features/shared/components/toast";
import { Button } from "@/features/shared/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/features/shared/components/ui/card";
import { FieldGroup } from "@/features/shared/components/ui/field";
import { handleApiError } from "@/lib/utils";
import { ITEM_CONDITION, ITEM_STATE } from "../constants";
import { createItemFormOptions } from "../hooks/form-options";
import type { CreateItemFormProps } from "../types";

export function CreateItemForm({ categories, onSubmit }: CreateItemFormProps) {
	const form = useAppForm({
		...createItemFormOptions(),
		onSubmit: async ({ value }) => {
			try {
				const formData = new FormData();
				formData.append("title", value.title);
				formData.append("description", value.description);
				formData.append("condition", value.condition);
				formData.append("city", value.city);
				formData.append("categoryId", value.categoryId);
				formData.append("state", value.state);
				value.images.forEach((file: File) => {
					formData.append("images", file);
				});
				await onSubmit(formData);
				form.reset();
			} catch (error) {
				const message = handleApiError(error, form);
				if (message)
					appToast.error({
						title: "Item form",
						description: message,
					});
			}
		},
	});

	return (
		<div className="flex h-full items-center justify-center flex-col gap-2 p-4">
			<Button asChild variant={"secondary"}>
				<Link to="/marketplace/my-items">
					<ChevronLeft /> Go back
				</Link>
			</Button>
			<Card className="w-full sm:max-w-lg">
				<CardHeader>
					<CardTitle className="text-center text-3xl">Item Form</CardTitle>
					<CardDescription></CardDescription>
				</CardHeader>
				<CardContent>
					<form
						encType="multipart/form-data"
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
							<form.AppField name="condition">
								{(field) => (
									<field.SelectField label="Condition" items={ITEM_CONDITION} />
								)}
							</form.AppField>
							<form.AppField name="state">
								{(field) => (
									<field.SelectField label="State" items={ITEM_STATE} />
								)}
							</form.AppField>
							<form.AppField name="categoryId">
								{(field) => (
									<field.SelectField label="Category" items={categories} />
								)}
							</form.AppField>
							<form.AppField name="city">
								{(field) => <field.TextField label="City" />}
							</form.AppField>
							<form.AppField name="images">
								{(field) => <field.FileField label="Images" />}
							</form.AppField>

							<div className=" grid grid-cols-2 gap-4">
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
