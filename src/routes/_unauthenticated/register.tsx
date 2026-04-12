import { createFileRoute } from "@tanstack/react-router";
import { RegisterForm } from "@/features/auth/components/register-form";

export const Route = createFileRoute("/_unauthenticated/register")({
	component: RouteComponent,
});

function RouteComponent() {
	return <RegisterForm />;
}
