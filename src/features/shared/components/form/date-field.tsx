import { useStore } from "@tanstack/react-form";
import { useState } from "react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useFieldContext } from "./form";

type DateFieldProps = {
	label: string;
};

export function DateField({ label }: DateFieldProps) {
	const field = useFieldContext<string | undefined>();

	const [errors, isInvalid] = useStore(field.store, (state) => [
		state.meta.errors,
		state.meta.isTouched && !state.meta.isValid,
	]);
	const [open, setOpen] = useState(false);
	const selected = field.state.value ? new Date(field.state.value) : undefined;

	const setDays = (days: number) => {
		const date = new Date();
		date.setDate(date.getDate() + days);
		date.setHours(23, 59, 59, 999);
		field.handleChange(date.toISOString());
	};

	return (
		<Field data-invalid={isInvalid} className="">
			<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						id={field.name}
						className="justify-start font-normal wrap-break-word"
						aria-invalid={isInvalid}
					>
						{field.state.value
							? new Date(field.state.value).toLocaleDateString()
							: "Permanent"}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto overflow-hidden p-0" align="center">
					<Calendar
						mode="single"
						onDayClick={() => setOpen(false)}
						selected={selected}
						defaultMonth={selected}
						captionLayout="dropdown"
						onSelect={(date) => {
							if (!date) field.handleChange(undefined);
							else {
								date.setHours(23, 59, 59, 999);
								field.handleChange(date.toISOString());
							}
						}}
					/>
				</PopoverContent>
			</Popover>
			<div className="flex items-center gap-1 flex-wrap">
				<Button variant="outline" onClick={() => setDays(1)} type="button">
					1 Day
				</Button>
				<Button variant="outline" onClick={() => setDays(7)} type="button">
					7 Day
				</Button>
				<Button variant="outline" onClick={() => setDays(30)} type="button">
					30 Days
				</Button>
				<Button
					variant="destructive"
					onClick={() => field.handleChange(undefined)}
					type="button"
				>
					Permanent
				</Button>
			</div>

			{isInvalid && <FieldError errors={errors} />}
		</Field>
	);
}
