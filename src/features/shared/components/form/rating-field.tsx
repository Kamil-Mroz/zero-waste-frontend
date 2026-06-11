import { useStore } from "@tanstack/react-form";
import { Star } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { useFieldContext } from "./form";

function RatingField({ label }: { label: string }) {
	const field = useFieldContext<number>();

	const [errors, isInvalid] = useStore(field.store, (state) => [
		state.meta.errors,
		state.meta.isTouched && !state.meta.isValid,
	]);

	const [hoveredStars, setHoveredStars] = useState(field.state.value);
	return (
		<Field
			data-invalid={isInvalid}
			onMouseLeave={() => setHoveredStars(field.state.value)}
		>
			<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
			<div className="flex gap-1 items-center">
				{Array.from({ length: 5 }).map((_, i) => {
					const starValue = i + 1;
					return (
						<button
							type="button"
							// biome-ignore lint/suspicious/noArrayIndexKey: Has no unique identifier
							key={`star-input-${i}`}
							onClick={() => field.handleChange(starValue)}
							onMouseEnter={() => setHoveredStars(starValue)}
						>
							<Star
								className={cn(
									"size-5 cursor-pointer",
									field.state.value === hoveredStars
										? starValue <= field.state.value
											? "fill-yellow-400 text-yellow-400"
											: "text-muted-foreground"
										: starValue <= hoveredStars
											? "fill-yellow-400 text-yellow-400 "
											: "text-muted-foreground",
								)}
							/>
							<span className="sr-only">{starValue}</span>
						</button>
					);
				})}
			</div>
			{isInvalid && <FieldError errors={errors} />}
		</Field>
	);
}
export default RatingField;
