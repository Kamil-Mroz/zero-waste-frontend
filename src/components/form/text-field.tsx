import { useStore } from "@tanstack/react-form";
import type { HTMLInputTypeAttribute } from "react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useFieldContext } from ".";

export function TextField({
	label,
	type = "text",
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
			<FieldLabel htmlFor={field.name} className="text-lg">
				{label}
			</FieldLabel>
			<Input
				id={field.name}
				name={field.name}
				value={field.state.value}
				onBlur={field.handleBlur}
				onChange={(e) => field.handleChange(e.target.value)}
				aria-invalid={isInvalid}
				className=" !text-base py-4"
				type={type}
			/>
			{isInvalid && <FieldError errors={errors} />}
		</Field>
	);
}
