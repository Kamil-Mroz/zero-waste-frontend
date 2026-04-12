import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { ResetButton } from "./reset-button";
import { SelectField } from "./select-field";
import { SubmitButton } from "./submit-button";
import { TextareaField } from "./textarea-field";
import { TextField } from "./text-field";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
	createFormHookContexts();

export const { useAppForm, withForm } = createFormHook({
	fieldContext,
	formContext,
	fieldComponents: { TextField, SelectField, TextareaField },
	formComponents: { SubmitButton, ResetButton },
});
