import { createLazyFileRoute } from "@tanstack/react-router";
import { useAuth } from "@/features/auth/hooks/useAuth";

import { OwnProfile } from "@/features/profile/components/own-profile";

export const Route = createLazyFileRoute("/_authenticated/profile")({
	component: RouteComponent,
});

function RouteComponent() {
	const { user } = useAuth();
	return user ? <OwnProfile user={user} /> : null;
}
