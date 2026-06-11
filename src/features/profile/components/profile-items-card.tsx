import { Link } from "@tanstack/react-router";
import { Badge } from "@/features/shared/components/ui/badge";
import { Button } from "@/features/shared/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/features/shared/components/ui/card";
import type { ProfileItemSummary } from "../types";
import { ProfileItemCard } from "./profile-item-card";

type ProfileItemsCardProps = {
	isOwnProfile?: boolean;
	items: ProfileItemSummary;
	userId?: string;
};
export function ProfileItemsCard({
	items,
	userId,
	isOwnProfile = false,
}: ProfileItemsCardProps) {
	const breakdown = items.itemCountBreakDown;
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle>Items</CardTitle>
				<Button asChild>
					<Link
						to={
							isOwnProfile ? "/marketplace/my-items" : "/profile/$userId/items"
						}
						params={isOwnProfile ? {} : { userId }}
					>
						{isOwnProfile ? "My items" : "View All"}
					</Link>
				</Button>
			</CardHeader>

			<CardContent className="space-y-2">
				<div>
					<p className="text-2xl font-bold">{breakdown.totalItems}</p>

					<p className="text-muted-foreground ">Total items listed</p>
				</div>

				<div className="flex flex-wrap gap-2">
					<Badge variant="secondary">Available {breakdown.available}</Badge>

					{isOwnProfile && (
						<Badge variant="outline">Pending {breakdown.pending}</Badge>
					)}

					<Badge>Given {breakdown.given}</Badge>
				</div>

				<p>Latest items listed</p>
				<div className="space-y-1">
					{items.latestItems.length === 0 ? (
						<p className="text-muted-foreground text-sm">No items listed.</p>
					) : (
						items.latestItems.map((item) => (
							<ProfileItemCard key={item.id} item={item} />
						))
					)}
				</div>
			</CardContent>
		</Card>
	);
}
