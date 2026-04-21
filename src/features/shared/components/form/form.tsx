import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { CheckboxArrayField } from "./checkbox-array-field";
import { DateField } from "./date-field";
import { ResetButton } from "./reset-button";
import { SelectField } from "./select-field";
import { SubmitButton } from "./submit-button";
import { TextField } from "./text-field";
import { TextareaField } from "./textarea-field";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
	createFormHookContexts();

export const { useAppForm, withForm } = createFormHook({
	fieldContext,
	formContext,
	fieldComponents: {
		TextField,
		SelectField,
		TextareaField,
		CheckboxArrayField,
		DateField,
	},
	formComponents: { SubmitButton, ResetButton },
});
