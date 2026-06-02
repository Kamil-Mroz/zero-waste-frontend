import { createFileRoute } from "@tanstack/react-router";
import { appToast } from "@/features/shared/components/toast";
import { Button } from "@/features/shared/components/ui/button";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<Button onClick={() => appToast.success({ title: "ok" })}>Home</Button>
	);
}
