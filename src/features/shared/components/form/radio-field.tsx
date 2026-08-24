import { useSelector } from "@tanstack/react-form";
import {
	Field,
	FieldContent,
	FieldError,
	FieldLabel,
	FieldLegend,
	FieldSet,
	FieldTitle,
} from "../ui/field";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useFieldContext } from "./form";

export function RadioField({
	label,
	items,
}: {
	label: string;
	items: readonly { label: string; value: string }[];
}) {
	const field = useFieldContext<string>();

	const [errors, isInvalid] = useSelector(field.store, (state) => [
		state.meta.errors,
		state.meta.isTouched && !state.meta.isValid,
	]);
	return (
		<FieldSet>
			<FieldLegend variant="label">{label}</FieldLegend>
			<RadioGroup
				name={field.name}
				value={field.state.value}
				onValueChange={field.handleChange}
				className="gap-1"
			>
				{items.map((item) => (
					<FieldLabel htmlFor={`radio-group-${item.value}`} key={item.value}>
						<Field orientation={"horizontal"} data-invalid={isInvalid}>
							<RadioGroupItem
								value={item.value}
								id={`radio-group-${item.value}`}
								aria-invalid={isInvalid}
							/>
							<FieldContent>
								<FieldTitle>{item.label}</FieldTitle>
							</FieldContent>
						</Field>
					</FieldLabel>
				))}
			</RadioGroup>
			{isInvalid && <FieldError errors={errors} />}
		</FieldSet>
	);
}
