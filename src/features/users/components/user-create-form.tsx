import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { useAppForm } from "@/features/shared/components/form/form";
import { FieldGroup } from "@/features/shared/components/ui/field";
import { handleApiError } from "@/lib/utils";
import { USER_QUERY_KEYS, USER_ROLES } from "../constants";
import { userFormOptions } from "../hooks/form-options";
import { userCreateMutationOptions } from "../hooks/mutation-options";
import { type CreateUserType, createUserSchema } from "../schemas/user.schema";
import { appToast } from "@/features/shared/components/toast";

export function UserCreateForm({ onDone }: { onDone: () => void }) {
	const router = useRouter();
	const client = useQueryClient();
	const mutation = useMutation(userCreateMutationOptions());

	const form = useAppForm({
		...userFormOptions(),
		validators: {
			onSubmit: createUserSchema,
		},
		onSubmit: async ({ value }) => {
			try {
				await mutation.mutateAsync(value as CreateUserType);
				await client.invalidateQueries({ queryKey: USER_QUERY_KEYS.all });
				await router.invalidate();
				form.reset();
				onDone();
			} catch (error) {
				const message = handleApiError(error, form);
				if (message)
					appToast.error({
						title: "User form",
						description: message,
					});
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
					{(field) => <field.TextField label="Password" type="password" />}
				</form.AppField>
				<form.AppField name="phoneNumber">
					{(field) => <field.TextField label="Phone number" />}
				</form.AppField>
				<form.AppField mode="array" name="roles">
					{(field) => (
						<field.CheckboxArrayField items={USER_ROLES} label="Roles" />
					)}
				</form.AppField>
				<div className="grid grid-cols-2 gap-1">
					<form.AppForm>
						<form.ResetButton />
					</form.AppForm>
					<form.AppForm>
						<form.SubmitButton label="Submit" />
					</form.AppForm>
				</div>
			</FieldGroup>
		</form>
	);
}
