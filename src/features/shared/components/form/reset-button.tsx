import { Button } from "../ui/button";
import { useFormContext } from "./form";

export function ResetButton({ label }: { label?: string }) {
	const form = useFormContext();

	return (
		<Button
			type="button"
			variant="outline"
			onClick={() => form.reset()}
		>
			{label ?? "Reset"}
		</Button>
	);
}
