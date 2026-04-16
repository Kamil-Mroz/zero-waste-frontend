import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { useAppForm } from "@/features/shared/components/form/form";
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
import { ITEM_CONDITION } from "../constants";
import { itemFormOptions } from "../hooks/form-options";
import type { ItemFormProps, ItemFormRequest } from "../types";

export function ItemForm({
	categories,
	defaultValues,
	onSubmit,
}: ItemFormProps) {
	const form = useAppForm({
		...itemFormOptions(defaultValues),
		onSubmit: async ({ value }) => {
			try {
				await onSubmit(value as ItemFormRequest);
				form.reset();
			} catch (error) {
				const message = handleApiError(error, form);
				if (message) toast.error(message);
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
							<form.AppField name="categoryId">
								{(field) => (
									<field.SelectField label="Category" items={categories} />
								)}
							</form.AppField>
							<form.AppField name="city">
								{(field) => <field.TextField label="City" />}
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
