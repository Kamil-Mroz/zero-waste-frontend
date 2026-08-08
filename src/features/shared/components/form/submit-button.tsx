import { useStore } from "@tanstack/react-form";
import type { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "../ui/button";
import { useFormContext } from "./form";

export function SubmitButton({
	label,
	variant,
}: {
	label: string;
} & VariantProps<typeof buttonVariants>) {
	const form = useFormContext();

	const [isSubmitting, canSubmit] = useStore(form.store, (state) => [
		state.isSubmitting,
		state.canSubmit,
	]);

	return (
		<Button
			type="submit"
			disabled={!canSubmit || isSubmitting}
			variant={variant || "default"}
			className="w-full"
		>
			{isSubmitting ? "..." : label}
		</Button>
	);
}
