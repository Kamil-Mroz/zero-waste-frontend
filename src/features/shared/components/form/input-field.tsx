import { useSelector } from "@tanstack/react-form";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { type HTMLInputTypeAttribute, useState } from "react";
import {
	Field,
	FieldError,
	FieldLabel,
} from "@/features/shared/components/ui/field";
import { Input } from "@/features/shared/components/ui/input";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import { useFieldContext } from "./form";

export function InputField({
	label,
	type = "text",
	orientation = "vertical",
}: {
	label: string;
	type?: HTMLInputTypeAttribute;
	orientation?: "horizontal" | "vertical" | "responsive";
}) {
	const field = useFieldContext<string>();
	const [showPassword, setShowPassword] = useState(false);

	const [errors, isInvalid] = useSelector(field.store, (state) => [
		state.meta.errors,
		state.meta.isTouched && !state.meta.isValid,
	]);
	return (
		<Field data-invalid={isInvalid} orientation={orientation}>
			<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
			<ButtonGroup>
				<Input
					id={field.name}
					name={field.name}
					value={field.state.value}
					onBlur={field.handleBlur}
					onChange={(e) => field.handleChange(e.target.value)}
					aria-invalid={isInvalid}
					type={
						type === "password" ? (showPassword ? "text" : "password") : type
					}
				/>
				{type === "password" ? (
					<Button
						type="button"
						variant={"outline"}
						onClick={() => {
							setShowPassword((prev) => !prev);
						}}
					>
						<span className="sr-only">
							{showPassword ? "Show password" : "Hide password"}
						</span>
						{showPassword ? <EyeIcon /> : <EyeClosedIcon />}
					</Button>
				) : null}
			</ButtonGroup>
			{isInvalid && <FieldError errors={errors} />}
		</Field>
	);
}
