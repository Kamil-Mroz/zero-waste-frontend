import { useStore } from "@tanstack/react-form";
import { useEffect, useState } from "react";
import { Field, FieldError, FieldLegend } from "../ui/field";
import { Input } from "../ui/input";
import { useFieldContext } from "./form";

export function FileField({ label }: { label: string }) {
	const field = useFieldContext<File[]>();
	const [previews, setPreviews] = useState<string[]>([]);

	const [value, errors, isInvalid] = useStore(field.store, (state) => [
		state.value,
		state.meta.errors,
		state.meta.isTouched && !state.meta.isValid,
	]);
	useEffect(() => {
		if (!value?.length) {
			setPreviews([]);
			return;
		}

		const urls = value.map((file) => URL.createObjectURL(file));
		setPreviews(urls);

		return () => {
			urls.forEach((url) => {
				URL.revokeObjectURL(url);
			});
		};
	}, [value]);

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
					field.handleChange(files);
				}}
				accept="image/png, image/jpeg"
				aria-invalid={isInvalid}
				type="file"
			/>
			{isInvalid && <FieldError errors={errors} />}
			{previews.length > 0 && (
				<div className="flex flex-wrap gap-3">
					{previews.map((url, idx) => (
						<img
							key={url}
							src={url}
							alt={`preview-${idx}`}
							className="size-28 rounded-lg border object-cover"
						/>
					))}
				</div>
			)}
		</Field>
	);
}
