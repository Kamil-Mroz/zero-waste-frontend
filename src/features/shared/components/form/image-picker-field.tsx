import { Trash2, X } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

type ImagePickerItem =
	| { type: "existing"; id: string; url: string; isMarked: boolean }
	| { type: "new"; file: File; url: string };

type ExistingImage = {
	id: string;
	url: string;
	originalName: string;
};

export type ThumbnailValue =
	| { type: "existing"; id: string }
	| { type: "new"; file: File }
	| null;

type ImagePickerFieldProps = {
	existingImages?: ExistingImage[];

	newImages: File[];

	removedImageIds?: string[];

	onRemoveExisting?: (id: string) => void;

	onRemoveNew: (file: File) => void;

	thumbnail: ThumbnailValue;

	onSelectThumbnail: (value: ThumbnailValue) => void;
};
export function ImagePickerField({
	existingImages = [],
	newImages,
	removedImageIds,
	onRemoveExisting,
	onRemoveNew,
	thumbnail,
	onSelectThumbnail,
}: ImagePickerFieldProps) {
	const images: ImagePickerItem[] = [
		...existingImages
			// .filter((img) => !removedImageIds?.includes(img.id))
			.map((img) => ({
				type: "existing" as const,
				id: img.id,
				url: img.url,
				isMarked: removedImageIds?.includes(img.id) ?? false,
			})),
		...newImages.map((file) => ({
			type: "new" as const,
			file,
			url: URL.createObjectURL(file),
		})),
	];

	if (images.length === 0) return null;

	return (
		<div className="space-y-3">
			<div className="flex flex-wrap gap-3">
				{images.map((image, id) => {
					const selected =
						image.type === "existing"
							? thumbnail?.type === "existing" && thumbnail.id === image.id
							: thumbnail?.type === "new" && thumbnail.file === image.file;
					const isMarked = image.type === "existing" ? image.isMarked : false;

					return (
						<div
							key={
								image.type === "existing"
									? image.id
									: `${image.file.name} ${id}`
							}
							className="relative"
						>
							<button
								type="button"
								onClick={() => {
									if (image.type === "existing") {
										onSelectThumbnail({
											type: "existing",
											id: image.id,
										});
									} else {
										onSelectThumbnail({
											type: "new",
											file: image.file,
										});
									}
								}}
								disabled={isMarked}
								className="
                relative
									h-28
									w-28
									overflow-hidden
                  block
									rounded-lg
									border
									focus-visible:ring-2
									focus-visible:ring-primary
								"
							>
								<img
									src={image.url}
									alt="item"
									className={`
										h-full
										w-full
										object-cover
										${selected ? "ring-2 ring-primary" : "opacity-80"}
									`}
								/>

								{selected && (
									<div
										className="
										absolute
										inset-0
										flex
										items-center
										justify-center
										 bg-black/40
									"
									>
										<Badge
											className="
											rounded
											bg-primary
											px-2
											py-1
											text-xs
										"
										>
											Thumbnail
										</Badge>
									</div>
								)}
								{isMarked && (
									<div
										className="
										absolute
										inset-0
										flex
										items-center
										justify-center
										bg-destructive/10
                    z-20
									"
									>
										<span className="size-10 bg-black/80 rounded-full grid place-items-center">
											<Trash2 className="size-6 text-destructive" />
										</span>
									</div>
								)}
							</button>

							<Button
								variant={"destructive"}
								type="button"
								onClick={() => {
									if (selected) {
										onSelectThumbnail(null);
									}
									if (image.type === "existing") {
										onRemoveExisting?.(image.id);
									} else {
										onRemoveNew(image.file);
									}
								}}
								className="
									absolute
									right-1
									top-1
                  z-30
									px-2
								"
							>
								<X />
							</Button>
						</div>
					);
				})}
			</div>
		</div>
	);
}
