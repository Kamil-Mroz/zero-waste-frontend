import { useStore } from "@tanstack/react-form";
import { Checkbox } from "../ui/checkbox";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "../ui/field";
import { useFieldContext } from "./form";

export function CheckboxArrayField({
	label,
	items,
}: {
	label: string;
	items: readonly { label: string; value: string }[];
}) {
	const field = useFieldContext<string[]>();

	const [errors, isInvalid] = useStore(field.store, (state) => [
		state.meta.errors,
		state.meta.isTouched && !state.meta.isValid,
	]);
	return (
		<FieldSet>
			<FieldLegend variant="label">{label}</FieldLegend>
			<FieldGroup data-slot="checkbox-group">
				{items.map((item) => (
					<Field
						data-invalid={isInvalid}
						key={item.value}
						orientation="horizontal"
					>
						<Checkbox
							id={item.value}
							name={field.name}
							aria-invalid={isInvalid}
							checked={field.state.value.includes(item.value)}
							onCheckedChange={(checked) => {
								if (checked) {
									field.pushValue(item.value);
								} else {
									const index = field.state.value.indexOf(item.value);
									if (index > -1) {
										field.removeValue(index);
									}
								}
							}}
						/>
						<FieldLabel htmlFor={item.value} className="font-normal">
							{item.label}
						</FieldLabel>
					</Field>
				))}
			</FieldGroup>
			{isInvalid && <FieldError errors={errors} />}
		</FieldSet>
	);
}
