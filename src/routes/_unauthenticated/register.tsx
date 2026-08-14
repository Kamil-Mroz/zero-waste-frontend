import { createFileRoute, redirect } from "@tanstack/react-router";
import { RegisterForm } from "@/features/auth/components/register-form";

export const Route = createFileRoute("/_unauthenticated/register")({
	head: () => ({
		meta: [
			{
				title: "Register",
			},
		],
	}),
	component: RouteComponent,
	beforeLoad: () => {
		throw redirect({ to: "/login" });
	},
});

function RouteComponent() {
	return <RegisterForm />;
}
