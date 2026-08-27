import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { useAppForm } from "@/features/shared/components/form/form";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/features/shared/components/ui/card";
import { FieldGroup } from "@/features/shared/components/ui/field";
import { registerFormOpts } from "../hooks/form-options";
import { useRegisterMutation } from "../hooks/mutation-options";

export function RegisterForm() {
	// const registerMutation = useRegisterMutation();
	// const navigate = useNavigate();
	// const route = useRouter();
	const form = useAppForm({
		...registerFormOpts(),
		// onSubmit: async ({ value, formApi }) => {
		onSubmit: async () => {
			try {
				// await registerMutation.mutateAsync({ value, form:formApi });
				// form.reset();
				// toast.success("Account created successfully");
				// route.invalidate();
				// await navigate({ to: "/login", replace: true });
				toast.info("Registration disabled for now");
			} catch {}
		},
	});

	return (
		<div className="px-5 w-full">
			<Card className="w-full sm:max-w-md mx-auto">
				<CardHeader>
					<CardTitle className="text-center text-3xl">Register</CardTitle>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							form.handleSubmit();
						}}
					>
						<FieldGroup className="">
							<form.AppField name="nickname">
								{(field) => <field.TextField label="Nickname" />}
							</form.AppField>
							<form.AppField name="email">
								{(field) => <field.TextField label="Email" type="email" />}
							</form.AppField>
							<form.AppField name="password">
								{(field) => (
									<field.TextField label="Password" type="password" />
								)}
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
