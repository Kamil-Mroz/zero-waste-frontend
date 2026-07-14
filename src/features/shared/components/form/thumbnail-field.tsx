import { useMemo } from "react";
import { Badge } from "../ui/badge";
import { useFieldContext } from "./form";

type ThumbnailFieldProps = {
	label?: string;
	images: File[];
};

export function ThumbnailField({
	label = "Select thumbnail",
	images,
}: ThumbnailFieldProps) {
	const field = useFieldContext<number | null>();
	const previews = useMemo(
		() =>
			images.map((file) => ({
				file,
				url: URL.createObjectURL(file),
			})),
		[images],
	);

	if (images.length === 0) return null;

	return (
		<div className="space-y-3">
			<p className="text-sm font-medium">{label}</p>

			<div className="flex flex-wrap gap-3">
				{previews.map(({ file, url }, index) => {
					const selected = field.state.value === index;

					return (
						<button
							// biome-ignore lint/suspicious/noArrayIndexKey: Used to mark the thumbnail
							key={file.name + index}
							type="button"
							onClick={() => field.handleChange(index)}
							className="relative h-28 w-28 overflow-hidden rounded-lg border"
						>
							<img
								src={url}
								alt={file.name}
								className={`h-full w-full object-cover ${
									selected ? "ring-2 ring-primary" : "opacity-80"
								}`}
							/>

							{selected && (
								<div className="absolute inset-0 flex items-center justify-center bg-black/40">
									<Badge>Thumbnail</Badge>
								</div>
							)}
						</button>
					);
				})}
			</div>
		</div>
	);
}
