import { useNavigate, useRouter } from "@tanstack/react-router";
import { useAppForm } from "@/features/shared/components/form/form";

import { FieldGroup } from "@/features/shared/components/ui/field";
import { loginFormOpts } from "../hooks/form-options";
import { useLoginMutation } from "../hooks/mutation-options";

export function LoginForm({ redirect = "/" }: { redirect?: string }) {
	const route = useRouter();
	const navigate = useNavigate();
	const loginMutation = useLoginMutation();

	const form = useAppForm({
		...loginFormOpts(),
		onSubmit: async ({ value, formApi }) => {
			try {
				await loginMutation.mutateAsync({ value, form: formApi });
				form.reset();
				await route.invalidate();
				await navigate({ to: redirect, replace: true });
			} catch {}
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
