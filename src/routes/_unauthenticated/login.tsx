import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "@/features/auth/components/login-form";

export const Route = createFileRoute("/_unauthenticated/login")({
	component: RouteComponent,
});

function RouteComponent() {
	const { redirect } = Route.useSearch();

	return <LoginForm redirect={redirect} />;
}
