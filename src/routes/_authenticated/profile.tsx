import { createFileRoute } from "@tanstack/react-router";
import { useRequiredAuth } from "@/features/auth/hooks/useRequiredAuth";
import { OwnProfile } from "@/features/profile/components/own-profile";

export const Route = createFileRoute("/_authenticated/profile")({
	component: RouteComponent,
});

function RouteComponent() {
	const { user } = useRequiredAuth();
	return <OwnProfile user={user} />;
}
