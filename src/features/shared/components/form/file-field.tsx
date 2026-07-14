import { useStore } from "@tanstack/react-form";
import { Field, FieldError, FieldLegend } from "../ui/field";
import { Input } from "../ui/input";
import { useFieldContext } from "./form";

export function FileField({ label }: { label: string }) {
	const field = useFieldContext<File[]>();

	const [value, errors, isInvalid] = useStore(field.store, (state) => [
		state.value,
		state.meta.errors,
		state.meta.isTouched && !state.meta.isValid,
	]);

	return (
		<Field data-invalid={isInvalid}>
			<FieldLegend variant="label">{label}</FieldLegend>
			<Input
				id={field.name}
				name={field.name}
				multiple
				onBlur={field.handleBlur}
				onChange={(e) => {
					const files = Array.from(e.target.files ?? []);
					field.handleChange([...value, ...files]);
				}}
				accept="image/png, image/jpeg"
				aria-invalid={isInvalid}
				type="file"
			/>
			{isInvalid && <FieldError errors={errors} />}
		</Field>
	);
}
