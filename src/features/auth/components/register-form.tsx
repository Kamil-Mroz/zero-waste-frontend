import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { useAppForm } from "@/features/shared/components/form/form";
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
import { registerFormOpts } from "../hooks/form-options";
import { useAuth } from "../hooks/useAuth";

export function RegisterForm() {
	const auth = useAuth();
	const navigate = useNavigate();
	const route = useRouter();
	const form = useAppForm({
		...registerFormOpts(),
		onSubmit: async ({ value }) => {
			try {
				await auth.register(value);
				form.reset();
				toast.success("Account created successfully");
				route.invalidate();
				await navigate({ to: "/login", replace: true });
			} catch (error) {
				const message = handleApiError(error, form);
				if (message) toast.error(message);
			}
		},
	});

	return (
		<div className="px-5 w-full">
			<Card className="w-full sm:max-w-2xl mx-auto">
				<CardHeader>
					<CardTitle className="text-center text-3xl">Register</CardTitle>
					<CardDescription></CardDescription>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							form.handleSubmit();
						}}
					>
						<FieldGroup className="sm:grid">
							<form.AppField name="firstName">
								{(field) => <field.TextField label="First name" />}
							</form.AppField>
							<form.AppField name="lastName">
								{(field) => <field.TextField label="Last name" />}
							</form.AppField>
							<form.AppField name="email">
								{(field) => <field.TextField label="Email" type="email" />}
							</form.AppField>
							<form.AppField name="password">
								{(field) => (
									<field.TextField label="Password" type="password" />
								)}
							</form.AppField>
							<form.AppField name="location">
								{(field) => <field.TextField label="Location" />}
							</form.AppField>
							<form.AppField name="phoneNumber">
								{(field) => <field.TextField label="Phone number" type="tel" />}
							</form.AppField>
							<div className="grid col-span-2">
								<form.AppForm>
									<form.SubmitButton label="Submit" />
								</form.AppForm>
							</div>
						</FieldGroup>
					</form>
				</CardContent>
				<CardFooter>
					<Link to="/login">Have already an account? go to login page.</Link>
				</CardFooter>
			</Card>
		</div>
	);
}
