import { Button } from "../ui/button";
import { useFormContext } from ".";

export function SubmitButton({ label }: { label: string }) {
	const form = useFormContext();
	return (
		<form.Subscribe selector={(state) => [state.isSubmitting, state.canSubmit]}>
			{([isSubmitting, canSubmit]) => (
				<Button
					type="submit"
					disabled={!canSubmit || isSubmitting}
					size="lg"
					className="text-base py-1.5  h-auto"
				>
					{isSubmitting ? "..." : label}
				</Button>
			)}
		</form.Subscribe>
	);
}
