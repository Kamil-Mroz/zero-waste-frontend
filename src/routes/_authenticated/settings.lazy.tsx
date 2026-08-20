import { createLazyFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { Spinner } from "@/features/shared/components/ui/spinner";
import { UserDangerZone } from "@/features/users/components/user-danger-zone";
import { UserSecurity } from "@/features/users/components/user-security";

export const Route = createLazyFileRoute("/_authenticated/settings")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="space-y-8">
			<Suspense fallback={<Spinner />}>
				<UserSecurity />
			</Suspense>
			<UserDangerZone />
		</div>
	);
}
