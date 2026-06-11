import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { useAppForm } from "@/features/shared/components/form/form";
import { appToast } from "@/features/shared/components/toast";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/features/shared/components/ui/card";
import { FieldGroup } from "@/features/shared/components/ui/field";
import { handleApiError } from "@/lib/utils";
import { loginFormOpts } from "../hooks/form-options";
import { useAuth } from "../hooks/useAuth";

export function LoginForm({ redirect = "/" }: { redirect?: string }) {
	const auth = useAuth();
	const route = useRouter();
	const navigate = useNavigate();

	const form = useAppForm({
		...loginFormOpts(),
		onSubmit: async ({ value }) => {
			try {
				await auth.login(value);
				form.reset();
				await route.invalidate();
				await navigate({ to: redirect, replace: true });
			} catch (error) {
				const message = handleApiError(error, form);
				if (message) appToast.error({ description: message });
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
							{(field) => <field.TextField label="Email" type="email" />}
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
			<CardFooter>
				<Link to="/register">Do not have an account? go to register page.</Link>
			</CardFooter>
		</Card>
	);
}
