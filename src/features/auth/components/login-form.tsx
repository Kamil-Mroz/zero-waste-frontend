import { useNavigate, useRouter } from "@tanstack/react-router";
import { useAppForm } from "@/features/shared/components/form/form";
import { appToast } from "@/features/shared/components/toast";

import { FieldGroup } from "@/features/shared/components/ui/field";
import { handleApiError } from "@/lib/utils";
import { loginFormOpts } from "../hooks/form-options";
import { useAuth } from "../hooks/useAuth";

export function LoginForm({ redirect = "/" }: { redirect?: string }) {
	const { login } = useAuth();
	const route = useRouter();
	const navigate = useNavigate();

	const form = useAppForm({
		...loginFormOpts(),
		onSubmit: async ({ value }) => {
			try {
				await login(value);
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
	);
}
