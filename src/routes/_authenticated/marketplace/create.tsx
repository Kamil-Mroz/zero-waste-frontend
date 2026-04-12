import { createFileRoute, Link } from "@tanstack/react-router";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod/v4";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { Category } from "@/features/category/types";
import { useAppForm } from "@/features/shared/components/form/form";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/features/shared/components/ui/card";
import { FieldGroup } from "@/features/shared/components/ui/field";
import { api } from "@/lib/axios";

export const Route = createFileRoute("/_authenticated/marketplace/create")({
	component: RouteComponent,

	staticData: {
		getTitle: () => "Create item",
	},
});

const itemFormSchema = z.object({
	title: z.string().nonempty("Title is required"),
	description: z.string().nonempty("Description is required"),
	condition: z.enum(["NEW", "REPAIRED", "DAMAGE", "OLD"]),
	category: z.string().nonempty("Category is required"),
	location: z.string().nonempty("Location is required"),
});

export type itemFormRequest = z.infer<typeof itemFormSchema>;

export const ITEM_CONDITION = [
	{ value: "NEW", label: "New" },
	{ value: "REPAIRED", label: "Repaired" },
	{ value: "DAMAGE", label: "Damage" },
	{ value: "OLD", label: "Old" },
];

function RouteComponent() {
	const { token } = useAuth();
	const [categories, setCategories] = useState<Record<string, string>[]>();
	useEffect(() => {
		const getCategories = async () => {
			const response = await api.get<Category[]>("/api/v1/categories", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setCategories(
				response.data.map((category) => ({
					value: category.id,
					label: category.name,
				})),
			);
		};
		getCategories();
	}, [token]);

	const form = useAppForm({
		defaultValues: {
			title: "",
			description: "",
			condition: "NEW",
			category: "",
			location: "",
		},
		validators: {
			onSubmit: itemFormSchema,
		},
		onSubmit: async ({ value }) => {
			try {
				form.reset();
				// await navigate({ to: redirect, replace: true });
			} catch (error) {
				let errorMessage = "Something went wrong, please try again.";
				if (error instanceof AxiosError) {
					errorMessage = error.response?.data.detail || "Invalid credentials";
				}
				toast.error(errorMessage);
			}
		},
	});

	return (
		<div className="grid h-full place-items-center p-4">
			<Card className="w-full sm:max-w-lg">
				<CardHeader>
					<CardTitle className="text-center text-3xl">Add item</CardTitle>
					<CardDescription></CardDescription>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							form.handleSubmit();
						}}
					>
						<FieldGroup>
							<form.AppField name="title">
								{(field) => <field.TextField label="Title" />}
							</form.AppField>
							<form.AppField name="description">
								{(field) => <field.TextareaField label="Description" />}
							</form.AppField>
							<form.AppField name="condition">
								{(field) => (
									<field.SelectField label="Condition" items={ITEM_CONDITION} />
								)}
							</form.AppField>
							{/* {categories ? (
								<form.AppField name="category">
									{(field) => (
										<field.SelectField label="Category" items={categories} />
									)}
								</form.AppField>
							) : (
								<div>Loading categories...</div>
							)} */}
							<form.AppField name="location">
								{(field) => <field.TextField label="Location" />}
							</form.AppField>
							<div className=" grid grid-cols-2 gap-4">
								<form.AppForm>
									<form.ResetButton />
								</form.AppForm>
								<form.AppForm>
									<form.SubmitButton label="Submit" />
								</form.AppForm>
							</div>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
