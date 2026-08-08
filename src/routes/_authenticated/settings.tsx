import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import ResponsiveDialog from "@/features/shared/components/responsive-dialog";
import { Button } from "@/features/shared/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/features/shared/components/ui/card";
import { FieldGroup } from "@/features/shared/components/ui/field";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemTitle,
} from "@/features/shared/components/ui/item";
import { useDeleteForm } from "@/features/users/hooks/form-options";

export const Route = createFileRoute("/_authenticated/settings")({
	component: RouteComponent,
	staticData: {
		getTitle: () => "Settings",
	},
});

function RouteComponent() {
	const [isOpen, setIsOpen] = useState(true);
	const form = useDeleteForm({ onSuccess: () => setIsOpen(false) });
	return (
		<div>
			<Card className="border-destructive border">
				<CardHeader>
					<CardTitle className="text-destructive text-xl">
						Danger Zone
					</CardTitle>
				</CardHeader>
				<CardContent>
					<Item variant="outline">
						<ItemContent>
							<ItemTitle>Delete account</ItemTitle>
							<ItemDescription>
								Once you delete your account. There is no going back.
							</ItemDescription>
						</ItemContent>
						<ItemActions>
							<Button variant="destructive" onClick={() => setIsOpen(true)}>
								Delete account
							</Button>
						</ItemActions>
					</Item>
				</CardContent>
			</Card>

			<ResponsiveDialog
				isOpen={isOpen}
				setIsOpen={(open) => {
					if (!open) {
						setIsOpen(false);
						form.reset();
					}
				}}
				title={"Delete Account"}
				description={"Are you sure you want to delete this account?"}
			>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit();
					}}
				>
					<FieldGroup>
						<p>This action cannot be undone. Type DELETE to confirm</p>
						<form.AppField
							name="confirmation"
							validators={{
								onChange: ({ value }) =>
									value === "DELETE"
										? undefined
										: { message: "Please type DELETE exactly" },
							}}
						>
							{(field) => <field.ConfirmField />}
						</form.AppField>
						<div className="flex md:self-end">
							<form.AppForm>
								<form.SubmitButton
									label="Delete account"
									variant={"destructive"}
								/>
							</form.AppForm>
						</div>
					</FieldGroup>
				</form>
			</ResponsiveDialog>
		</div>
	);
}
