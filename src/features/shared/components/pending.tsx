import { Spinner } from "./ui/spinner";

export function PendingComponent() {
	return (
		<div className="grid h-full place-items-center">
			<Spinner className="size-8" />
		</div>
	);
}
