import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { useAppForm } from "@/features/shared/components/form/form";
import { appToast } from "@/features/shared/components/toast";
import { FieldGroup } from "@/features/shared/components/ui/field";
import { handleApiError } from "@/lib/utils";
import { USER_QUERY_KEYS } from "../constants";
import { userBanFormOptions } from "../hooks/form-options";
import { userBanMutationOptions } from "../hooks/mutation-options";
import { banUserSchema } from "../schemas/user.schema";

export function UserBanForm({
	onDone,
	ids,
}: {
	ids: string[];
	onDone: () => void;
}) {
	const router = useRouter();
	const client = useQueryClient();
	const mutation = useMutation({
		...userBanMutationOptions(),
	});

	const form = useAppForm({
		...userBanFormOptions(ids),
		validators: {
			onSubmit: banUserSchema,
		},
		onSubmit: async ({ value }) => {
			try {
				await mutation.mutateAsync(value);

				await Promise.all([
					client.invalidateQueries({ queryKey: USER_QUERY_KEYS.all }),
					...ids.map((id) =>
						client.invalidateQueries({ queryKey: USER_QUERY_KEYS.byId(id) }),
					),
				]);
				await router.invalidate();
				form.reset();
				onDone();
			} catch (error) {
				const message = handleApiError(error, form);
				if (message)
					appToast.error({
						title: "Ban user",
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
			<p>
				{ids.length === 1 ? "1 user selected" : `${ids.length} users selected.`}
			</p>
			<FieldGroup>
				<form.AppField name="expiresAt">
					{(field) => <field.DateField label="Expires at" />}
				</form.AppField>
				<form.AppField name="reason">
					{(field) => <field.TextareaField label="Reason" />}
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
