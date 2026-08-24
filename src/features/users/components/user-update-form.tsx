import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAppForm } from "@/features/shared/components/form/form";
import { appToast } from "@/features/shared/components/toast";
import { FieldGroup } from "@/features/shared/components/ui/field";
import { Spinner } from "@/features/shared/components/ui/spinner";
import { useIsMobile } from "@/features/shared/hooks/use-mobile";
import { handleApiError } from "@/lib/utils";
import { USER_QUERY_KEYS, USER_ROLES } from "../constants";
import { userFormOptions } from "../hooks/form-options";
import { userUpdateMutationOptions } from "../hooks/mutation-options";
import { userQueryOptions } from "../hooks/query-options";
import { type UpdateUserType, updateUserSchema } from "../schemas/user.schema";

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
		onSubmit: async ({ value }) => {
			try {
				await mutation.mutateAsync(value as UpdateUserType);
				await Promise.all([
					client.invalidateQueries({ queryKey: USER_QUERY_KEYS.all }),
					client.invalidateQueries({ queryKey: USER_QUERY_KEYS.byId(userId) }),
				]);
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
