import { Star } from "lucide-react";
import type { RatingKey } from "@/features/profile/types";
import { Progress } from "@/features/shared/components/ui/progress";

type RatingProps = {
	ratingBreakdown: Record<RatingKey, number>;
	reviewCount: number;
};
export function Rating({ ratingBreakdown, reviewCount }: RatingProps) {
	const stars = [
		{ key: "fiveStar", label: 5 },
		{ key: "fourStar", label: 4 },
		{ key: "threeStar", label: 3 },
		{ key: "twoStar", label: 2 },
		{ key: "oneStar", label: 1 },
	] as const satisfies { key: RatingKey; label: number }[];

	return (
		<div className="space-y-1">
			{stars.map((star) => {
				const count = ratingBreakdown[star.key] ?? 0;
				const percentage = reviewCount === 0 ? 0 : (count / reviewCount) * 100;

				return (
					<div key={star.label} className="flex items-center gap-1">
						<span className="w-4 text-sm">{star.label}</span>

						<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />

						<Progress value={percentage} className="h-2 flex-1" />

						<span className="w-8 text-right text-sm text-muted-foreground">
							{count}
						</span>
					</div>
				);
			})}
		</div>
	);
}
