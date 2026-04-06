import { createFileRoute, useRouter } from "@tanstack/react-router";
import { AxiosError } from "axios";
import { toast } from "sonner";
import z from "zod/v4";
import { useAppForm } from "@/components/form";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";

export const Route = createFileRoute("/_unauthenticated/login")({
	component: RouteComponent,
});

function RouteComponent() {
	const { auth } = Route.useRouteContext();
	const { redirect } = Route.useSearch();
	const navigate = Route.useNavigate();
	const route = useRouter();

	const loginSchema = z.object({
		email: z.email("Provide a valid email"),
		password: z.string().nonempty("Password is required"),
	});
	const form = useAppForm({
		defaultValues: {
			email: "",
			password: "",
		},
		validators: {
			onSubmit: loginSchema,
		},
		onSubmit: async ({ value }) => {
			try {
				await auth.login(value.email, value.password);
				form.reset();
				route.invalidate();
				navigate({ to: redirect, search: { redirect: "/" }, replace: true });
			} catch (error) {
				let errorMessage = "Something went wrong, please try again.";
				if (error instanceof AxiosError) {
					errorMessage = error.response?.data.detail || "Invalid credentials";
				}
				toast.error(errorMessage);
			}
		},
	});
	return (
		<Card className="w-full sm:max-w-md">
			<CardHeader>
				<CardTitle className="text-center text-3xl">Login</CardTitle>
				<CardDescription></CardDescription>
			</CardHeader>
			<CardContent>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit();
					}}
				>
					<FieldGroup>
						<form.AppField name="email">
							{(field) => <field.TextField label="Email" />}
						</form.AppField>
						<form.AppField name="password">
							{(field) => <field.TextField label="Password" type="password" />}
						</form.AppField>
						<form.AppForm>
							<form.SubmitButton label="Submit" />
						</form.AppForm>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
}
