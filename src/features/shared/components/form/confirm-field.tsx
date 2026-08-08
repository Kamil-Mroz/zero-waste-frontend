import { useStore } from "@tanstack/react-form";
import { Field, FieldError } from "../ui/field";
import { Input } from "../ui/input";
import { useFieldContext } from "./form";

export function ConfirmField() {
	const field = useFieldContext<string>();

	const [errors, isInvalid] = useStore(field.store, (state) => [
		state.meta.errors,
		state.meta.isTouched && !state.meta.isValid,
	]);
	return (
		<Field data-invalid={isInvalid}>
			<Input
				id={field.name}
				name={field.name}
				value={field.state.value}
				onBlur={field.handleBlur}
				onChange={(e) => field.handleChange(e.target.value.trim())}
				aria-invalid={isInvalid}
				type="text"
			/>
			{isInvalid && <FieldError errors={errors} />}
		</Field>
	);
}
