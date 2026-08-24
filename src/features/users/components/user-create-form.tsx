import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useAppForm } from "@/features/shared/components/form/form";
import { appToast } from "@/features/shared/components/toast";
import { FieldGroup } from "@/features/shared/components/ui/field";
import { useIsMobile } from "@/features/shared/hooks/use-mobile";
import { handleApiError } from "@/lib/utils";
import { USER_QUERY_KEYS, USER_ROLES } from "../constants";
import { userFormOptions } from "../hooks/form-options";
import { userCreateMutationOptions } from "../hooks/mutation-options";
import { type CreateUserType, createUserSchema } from "../schemas/user.schema";

export function UserCreateForm({ onDone }: { onDone: () => void }) {
	const router = useRouter();
	const client = useQueryClient();
	const mutation = useMutation(userCreateMutationOptions());
	const isMobile = useIsMobile();

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
				<form.AppField name="nickname">
					{(field) => <field.TextField label="Nickname" />}
				</form.AppField>
				<form.AppField name="email">
					{(field) => <field.TextField label="Email" type="email" />}
				</form.AppField>
				<form.AppField name="password">
					{(field) => <field.TextField label="Password" type="password" />}
				</form.AppField>

				<form.AppField name="role">
					{(field) => <field.RadioField items={USER_ROLES} label="Role" />}
				</form.AppField>

				<div className="grid md:grid-cols-2 gap-1">
					{isMobile ? null : (
						<form.AppForm>
							<form.ResetButton />
						</form.AppForm>
					)}
					<form.AppForm>
						<form.SubmitButton label="Submit" />
					</form.AppForm>
				</div>
			</FieldGroup>
		</form>
	);
}
