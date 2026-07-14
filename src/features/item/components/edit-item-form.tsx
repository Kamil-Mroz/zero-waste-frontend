import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { useMemo } from "react";
import { useAppForm } from "@/features/shared/components/form/form";
import { ImagePickerField } from "@/features/shared/components/form/image-picker-field";
import { appToast } from "@/features/shared/components/toast";
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
import { ITEM_CONDITION, ITEM_STATE } from "../constants";
import { updateItemFormOptions } from "../hooks/form-options";
import type { ItemFormStateType, UpdateItemFormProps } from "../types";

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
				state: item.state as ItemFormStateType,
				categoryId: item.category.id,
				condition: item.condition,
				title: item.title,
				description: item.description,
				thumbnail: null,
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
				formData.append("state", value.state);

				const remainingImages = item.images.filter(
					(i) => !value.removedImageIds.includes(i.id),
				);

				if (value.images.length === 0 && remainingImages.length === 0) {
				} else if (value.thumbnail?.type === "existing") {
					formData.append("thumbnailExistingImageId", value.thumbnail.id);
				} else if (value.thumbnail?.type === "new") {
					const index = value.images.indexOf(value.thumbnail.file);
					if (index >= 0) {
						formData.append("thumbnailIndex", index.toString());
					}
				} else if (remainingImages.length > 0) {
					formData.append("thumbnailExistingImageId", remainingImages[0].id);
				}

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
							<div className="grid sm:grid-cols-2 gap-2">
								<form.AppField name="condition">
									{(field) => (
										<field.SelectField
											label="Condition"
											items={ITEM_CONDITION}
										/>
									)}
								</form.AppField>
								<form.AppField name="state">
									{(field) => (
										<field.SelectField label="state" items={ITEM_STATE} />
									)}
								</form.AppField>
							</div>
							<form.AppField name="categoryId">
								{(field) => (
									<field.SelectField label="Category" items={categories} />
								)}
							</form.AppField>
							<form.AppField name="city">
								{(field) => <field.TextField label="City" />}
							</form.AppField>
							<form.Subscribe
								selector={(state) => ({
									images: state.values.images,
									removed: state.values.removedImageIds,
									thumbnail: state.values.thumbnail,
								})}
							>
								{({ images, removed, thumbnail }) => (
									<ImagePickerField
										existingImages={item.images}
										newImages={images}
										removedImageIds={removed}
										onRemoveExisting={(id) => {
											const next = removed.includes(id)
												? removed.filter((x) => x !== id)
												: [...removed, id];
											form.setFieldValue("removedImageIds", next);
										}}
										onRemoveNew={(file) =>
											form.setFieldValue(
												"images",
												images.filter((x) => x !== file),
											)
										}
										thumbnail={thumbnail}
										onSelectThumbnail={(value) =>
											form.setFieldValue("thumbnail", value)
										}
									/>
								)}
							</form.Subscribe>

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
