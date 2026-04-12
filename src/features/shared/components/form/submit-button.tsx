import { useStore } from "@tanstack/react-form";
import { Button } from "../ui/button";
import { useFormContext } from "./form";

export function SubmitButton({ label }: { label: string }) {
	const form = useFormContext();

	const [isSubmitting, canSubmit] = useStore(form.store, (state) => [
		state.isSubmitting,
		state.canSubmit,
	]);

	return (
		<Button
			type="submit"
			disabled={!canSubmit || isSubmitting}
		>
			{isSubmitting ? "..." : label}
		</Button>
	);
}
