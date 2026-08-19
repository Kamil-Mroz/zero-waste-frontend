import { createFileRoute } from "@tanstack/react-router";
import Terms from "@/features/shared/components/terms";

export const Route = createFileRoute("/terms")({
	component: Terms,
});
