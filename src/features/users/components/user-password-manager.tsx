import { useState } from "react";
import { Button } from "@/features/shared/components/ui/button";
import { usePasswordManagerForm } from "../hooks/form-options";

type UserPasswordManagerProps = {
	hasPassword: boolean;
};
export function UserPasswordManager({ hasPassword }: UserPasswordManagerProps) {
	const [showForm, setShowForm] = useState(false);
	const form = usePasswordManagerForm(hasPassword, setShowForm);
	return (
		<section className="space-y-4">
			<div className="space-y-2">
				<h2 className="text-xl font-semibold">Password</h2>

				<p className="text-muted-foreground">
					{hasPassword
						? "Update you password"
						: "Your account does not currently have a password. Add one so you can also sign in with your email and password."}
				</p>
			</div>
			<div>
				{showForm ? (
					<form
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							form.handleSubmit();
						}}
						className="max-w-md mx-auto space-y-2"
					>
						{hasPassword && (
							<form.AppField name="currentPassword">
								{(field) => (
									<field.TextField type="password" label="Current password" />
								)}
							</form.AppField>
						)}

						<form.AppField name="newPassword">
							{(field) => (
								<field.TextField type="password" label="New password" />
							)}
						</form.AppField>
						<form.AppField name="confirmPassword">
							{(field) => (
								<field.TextField type="password" label="Confirm password" />
							)}
						</form.AppField>

						<form.AppForm>
							<form.SubmitButton label="Save" />
						</form.AppForm>
					</form>
				) : null}
				<Button
					onClick={() => setShowForm((prev) => !prev)}
					variant={"outline"}
					className="w-full mx-auto max-w-md block mt-2"
				>
					{showForm
						? "Cancel"
						: hasPassword
							? "Update password"
							: "Create password"}
				</Button>
			</div>
		</section>
	);
}
