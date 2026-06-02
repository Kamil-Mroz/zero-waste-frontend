import { useCanGoBack, useRouter } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";

function GoBackButton() {
	const router = useRouter();
	const canGoBack = useCanGoBack();
	return canGoBack ? (
		<Button
			variant="secondary"
			onClick={() => (canGoBack ? router.history.back() : null)}
		>
			<ChevronLeft />
			<span>Go back</span>
		</Button>
	) : null;
}
export default GoBackButton;
