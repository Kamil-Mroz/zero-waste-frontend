import { useStore } from "@tanstack/react-form";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "../ui/field";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { useFieldContext } from "./form";

export type SelectItems = { value: string; label: string }[];

export function SelectField({
	label,
	items,
	description,
}: {
	description?: string;
	label: string;
	items: SelectItems;
}) {
	const field = useFieldContext<string>();

	const [errors, isInvalid] = useStore(field.store, (state) => [
		state.meta.errors,
		state.meta.isTouched && !state.meta.isValid,
	]);
	return (
		<Field data-invalid={isInvalid}>
			<FieldContent>
				<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
				{description ? (
					<FieldDescription>{description}</FieldDescription>
				) : null}
			</FieldContent>
			<Select
				name={field.name}
				value={field.state.value}
				onValueChange={field.handleChange}
			>
				<SelectTrigger id={field.name} aria-invalid={isInvalid}>
					<SelectValue placeholder="Select" />
				</SelectTrigger>
				<SelectContent position="item-aligned" className="">
					{items.map((item) => (
						<SelectItem key={item.value} value={item.value}>
							{item.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			{isInvalid && <FieldError errors={errors} />}
		</Field>
	);
}
