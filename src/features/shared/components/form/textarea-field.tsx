import { useStore } from "@tanstack/react-form";
import type { HTMLInputTypeAttribute } from "react";
import { Field, FieldError, FieldLabel } from "@/features/shared/components/ui/field";
import { Textarea } from "../ui/textarea";
import { useFieldContext } from "./form";

export function TextareaField({
	label,
}: {
	label: string;
	type?: HTMLInputTypeAttribute;
}) {
	const field = useFieldContext<string>();

	const [errors, isInvalid] = useStore(field.store, (state) => [
		state.meta.errors,
		state.meta.isTouched && !state.meta.isValid,
	]);

	return (
		<Field data-invalid={isInvalid}>
			<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
			<Textarea
				id={field.name}
				name={field.name}
				value={field.state.value}
				onBlur={field.handleBlur}
				onChange={(e) => field.handleChange(e.target.value)}
				aria-invalid={isInvalid}
				className=" min-h-30 resize-y"
				placeholder="Your description here..."
			/>
			{isInvalid && <FieldError errors={errors} />}
		</Field>
	);
}
