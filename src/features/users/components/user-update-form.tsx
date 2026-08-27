import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAppForm } from "@/features/shared/components/form/form";
import { FieldGroup } from "@/features/shared/components/ui/field";
import { Spinner } from "@/features/shared/components/ui/spinner";
import { useIsMobile } from "@/features/shared/hooks/use-mobile";
import { USER_QUERY_KEYS, USER_ROLES } from "../constants";
import { userFormOptions } from "../hooks/form-options";
import { userUpdateMutationOptions } from "../hooks/mutation-options";
import { userQueryOptions } from "../hooks/query-options";
import { updateUserSchema } from "../schemas/user.schema";

type UserUpdateForm = { onDone: () => void; userId: string };

export function UserUpdateForm({ onDone, userId }: UserUpdateForm) {
	const router = useRouter();
	const client = useQueryClient();
	const mutation = useMutation(userUpdateMutationOptions(userId));
	const { data, isLoading } = useQuery(userQueryOptions(userId));
	const isMobile = useIsMobile();

	const form = useAppForm({
		...userFormOptions(data),
		validators: {
			onSubmit: updateUserSchema,
		},
		onSubmit: async ({ value, formApi }) => {
			try {
				await mutation.mutateAsync({ value, form: formApi });
				await Promise.all([
					client.invalidateQueries({ queryKey: USER_QUERY_KEYS.all }),
					client.invalidateQueries({ queryKey: USER_QUERY_KEYS.byId(userId) }),
				]);
				await router.invalidate();
				form.reset();
				onDone();
			} catch {}
		},
	});

	useEffect(() => {
		if (data) {
			form.reset({ ...data, password: "" });
		}
	}, [data, form.reset]);

	if (isLoading) {
		return <Spinner />;
	}

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
