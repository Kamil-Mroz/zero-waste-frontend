import { createLazyFileRoute } from "@tanstack/react-router";
import { Suspense, useEffect } from "react";
import { appToast } from "@/features/shared/components/toast";
import { Spinner } from "@/features/shared/components/ui/spinner";
import { UserDangerZone } from "@/features/users/components/user-danger-zone";
import { UserSecurity } from "@/features/users/components/user-security";

export const Route = createLazyFileRoute("/_authenticated/settings")({
	component: RouteComponent,
});

function RouteComponent() {
	const { error } = Route.useSearch();
	const navigate = Route.useNavigate();
	useEffect(() => {
		if (error) {
			appToast.error({ description: error });
			navigate({ to: "/settings" });
		}
	}, [error, navigate]);
	return (
		<div className="space-y-8">
			<Suspense fallback={<Spinner />}>
				<UserSecurity />
			</Suspense>
			<UserDangerZone />
		</div>
	);
}
