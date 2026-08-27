import { useIsMobile } from "@/features/shared/hooks/use-mobile";
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
	const isMobile = useIsMobile();
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
		onSubmit: async ({ value, formApi }) => {
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
				await onSubmit({ value, form: formApi });
				form.reset();
			} catch {}
		},
	});

	return (
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
				<div className="grid md:grid-cols-2 gap-1">
					{isMobile ? null : (
						<form.AppForm>
							<form.ResetButton />
						</form.AppForm>
					)}
					<form.AppForm>
						<form.SubmitButton label="Submit" />
					</form.AppForm>
				</div>
			</FieldGroup>
		</form>
	);
}
