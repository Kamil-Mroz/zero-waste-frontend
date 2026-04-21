import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/features/shared/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/features/shared/components/ui/card";
import { handleApiError } from "@/lib/utils";
import { useAppForm } from "../../shared/components/form/form";
import { FieldGroup } from "../../shared/components/ui/field";
import { categoryFormOptions } from "../hooks/form-options";
import type { CategoryFormProps } from "../types";

export function CategoryForm({
	defaultValues,
	onSubmit,
	showCategorySelect = false,
	categories,
}: CategoryFormProps) {
	const form = useAppForm({
		...categoryFormOptions(defaultValues),
		listeners: {
			onChange: ({ formApi }) => {
				if (
					formApi.getFieldValue("name") !== (defaultValues?.name ?? "") ||
					formApi.getFieldValue("categoryId") !==
						(defaultValues?.categoryId ?? "")
				) {
					formApi.setErrorMap({ onSubmit: { fields: {} } });
				}
			},
		},
		onSubmit: async ({ value }) => {
			try {
				if (
					(defaultValues?.categoryId ?? "") === value.categoryId &&
					(defaultValues?.name ?? "") === value.name
				) {
					form.setErrorMap({
						onSubmit: {
							fields: {
								name: { message: "At least one field has to change" },
								categoryId: { message: "At least one field has to change" },
							},
						},
					});
					return;
				}
				await onSubmit(value);
				form.reset();
			} catch (error) {
				const message = handleApiError(error, form);
				if (message) toast.error(message);
			}
		},
	});

	return (
		<div className="flex items-center justify-center flex-col gap-4 h-full px-2">
			<Button asChild variant={"secondary"}>
				<Link to="/admin/categories">
					<ChevronLeft /> Go back
				</Link>
			</Button>
			<Card className="w-full sm:max-w-md">
				<CardHeader>
					<CardTitle className="text-center text-3xl">Category</CardTitle>
					<CardDescription></CardDescription>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							form.handleSubmit();
						}}
					>
						<FieldGroup>
							<form.AppField name="name">
								{(field) => <field.TextField label="Name" />}
							</form.AppField>
							{showCategorySelect && categories && (
								<form.AppField name="categoryId">
									{(field) => (
										<field.SelectField
											label="Parent category"
											optionalClear
											items={categories}
										/>
									)}
								</form.AppField>
							)}
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
