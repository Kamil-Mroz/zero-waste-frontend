import { Link } from "@tanstack/react-router";
import { ChevronLeft, Trash } from "lucide-react";
import { useMemo } from "react";
import { toast } from "sonner";
import { useAppForm } from "@/features/shared/components/form/form";
import { Button } from "@/features/shared/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/features/shared/components/ui/card";
import { FieldGroup } from "@/features/shared/components/ui/field";
import { handleApiError } from "@/lib/utils";
import { ITEM_CONDITION } from "../constants";
import { updateItemFormOptions } from "../hooks/form-options";
import type { UpdateItemFormProps } from "../types";
import { appToast } from "@/features/shared/components/toast";

export function EditItemForm({
	item,
	categories,
	onSubmit,
}: UpdateItemFormProps) {
	const currentImageIds = useMemo(
		() => item.images.map((image) => image.id),
		[item.images],
	);
	const form = useAppForm({
		...updateItemFormOptions(
			{
				city: item.city,
				images: [],
				removedImageIds: [],
				categoryId: item.category.id,
				condition: item.condition,
				title: item.title,
				description: item.description,
			},
			currentImageIds,
		),
		onSubmit: async ({ value }) => {
			try {
				const formData = new FormData();
				formData.append("title", value.title);
				formData.append("description", value.description);
				formData.append("condition", value.condition);
				formData.append("city", value.city);
				formData.append("categoryId", value.categoryId);
				value.images.forEach((file: File) => {
					formData.append("images", file);
				});
				value.removedImageIds.forEach((id) => {
					formData.append("removedImageIds", id);
				});
				await onSubmit(formData);
				form.reset();
			} catch (error) {
				const message = handleApiError(error, form);
				if (message)
					appToast.error({
						title: "Item form",
						description: message,
					});
			}
		},
	});

	return (
		<div className="flex h-full items-center justify-center flex-col gap-2 p-4">
			<Button asChild variant={"secondary"}>
				<Link to={`/marketplace/$itemId`} params={{ itemId: item.id }}>
					<ChevronLeft /> Go back
				</Link>
			</Button>
			<Card className="w-full sm:max-w-lg">
				<CardHeader>
					<CardTitle className="text-center text-3xl">Item Form</CardTitle>
					<CardDescription></CardDescription>
				</CardHeader>
				<CardContent>
					<form
						encType="multipart/form-data"
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
							<form.AppField name="categoryId">
								{(field) => (
									<field.SelectField label="Category" items={categories} />
								)}
							</form.AppField>
							<form.AppField name="city">
								{(field) => <field.TextField label="City" />}
							</form.AppField>
							<form.AppField name="removedImageIds">
								{(field) => {
									if (item.images.length === 0) return null;
									return (
										<div className="space-y-3">
											<p className="text-sm font-medium">Current images</p>

											<div className="flex flex-wrap gap-3">
												{item.images.map((img) => {
													const isMarked = field.state.value.includes(img.id);

													return (
														<button
															type="button"
															key={img.id}
															onClick={() => {
																const next = isMarked
																	? field.state.value.filter(
																			(id) => id !== img.id,
																		)
																	: [...field.state.value, img.id];
																field.handleChange(next);
																form.setErrorMap({ onSubmit: { fields: {} } });
															}}
															className="relative h-28 w-28 rounded-lg border p-0 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary overflow-hidden"
														>
															<img
																src={img.url}
																alt={img.originalName}
																className={`h-full w-full rounded-lg object-cover transition  ${isMarked ? "opacity-40 grayscale" : ""}`}
															/>
															{isMarked && (
																<div className="absolute inset-0 flex items-center justify-center bg-black/40">
																	<span className="text-xs font-medium text-destructive">
																		<Trash />
																	</span>
																</div>
															)}
														</button>
													);
												})}
											</div>
										</div>
									);
								}}
							</form.AppField>

							<form.AppField name="images">
								{(field) => <field.FileField label="Add images" />}
							</form.AppField>
							<form.AppForm>
								<form.SubmitButton label="Submit" />
							</form.AppForm>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
