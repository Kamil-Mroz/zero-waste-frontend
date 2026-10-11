import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { useAppForm } from "@/features/shared/components/form/form";
import { ImagePickerField } from "@/features/shared/components/form/image-picker-field";
import { Button } from "@/features/shared/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/features/shared/components/ui/card";
import { FieldGroup } from "@/features/shared/components/ui/field";
import { api } from "@/lib/axios";
import { ITEM_CONDITION, ITEM_STATE } from "../constants";
import { createItemFormOptions } from "../hooks/form-options";
import type {
	CreateItem,
	CreateItemFormProps,
	ItemConditionType,
	ItemStateType,
} from "../types";

export function CreateItemForm({ categories, onSubmit }: CreateItemFormProps) {
	const form = useAppForm({
		...createItemFormOptions(),
		onSubmit: async ({ value, formApi }) => {
			try {
				let uploads: {
					uploadId: string;
					url: string;
					method: string;
					headers: Record<string, string>;
				}[] = [];

				if (value.images.length > 0) {
					const uploadResponse = await api.post<{
						uploads: {
							uploadId: string;
							url: string;
							method: string;
							headers: Record<string, string>;
						}[];
					}>("/v1/images/upload-urls", {
						files: value.images.map((file) => ({
							filename: file.name,
							contentType: file.type,
							size: file.size,
						})),
					});

					uploads = uploadResponse.data.uploads;

					await Promise.all(
						value.images.map(async (file: File, index: number) => {
							const upload = uploads[index];
							const response = await fetch(upload.url, {
								method: upload.method,
								headers: {
									...upload.headers,
								},
								body: file,
							});

							if (!response.ok) {
								throw new Error(`Failed to upload ${file.name}`);
							}
						}),
					);
				}

				const thumbnailIndex =
					value.thumbnail?.type === "new"
						? value.images.indexOf(value.thumbnail.file)
						: value.images.length > 0
							? 0
							: undefined;

				const data: CreateItem = {
					title: value.title,
					description: value.description,
					condition: value.condition as ItemConditionType,
					city: value.city,
					categoryId: value.categoryId,
					state: value.state as ItemStateType,
					imageUploadIds: uploads.map(
						(upload: { uploadId: string }) => upload.uploadId,
					),
					thumbnailIndex,
				};

				await onSubmit({ value: data, form: formApi });
				form.reset();
			} catch {}
		},
	});

	return (
		<div className="flex h-full items-center justify-center flex-col gap-2 p-4">
			<Button asChild variant={"secondary"}>
				<Link to="/marketplace/my-items">
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
										<field.SelectField label="State" items={ITEM_STATE} />
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
							<form.AppField name="images">
								{(field) => <field.FileField label="Images" />}
							</form.AppField>
							<form.Subscribe
								selector={(state) => ({
									images: state.values.images,
									thumbnail: state.values.thumbnail,
								})}
							>
								{({ images, thumbnail }) => (
									<ImagePickerField
										newImages={images}
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
