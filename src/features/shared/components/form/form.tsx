import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { CheckboxArrayField } from "./checkbox-array-field";
import { DateField } from "./date-field";
import { FileField } from "./file-field";
import { InputField } from "./input-field";
import RatingField from "./rating-field";
import { ResetButton } from "./reset-button";
import { SelectField } from "./select-field";
import { SubmitButton } from "./submit-button";
import { TextareaField } from "./textarea-field";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
	createFormHookContexts();

export const { useAppForm, withForm } = createFormHook({
	fieldContext,
	formContext,
	fieldComponents: {
		TextField: InputField,
		SelectField,
		TextareaField,
		CheckboxArrayField,
		DateField,
		FileField,
		RatingField,
	},
	formComponents: { SubmitButton, ResetButton },
});
