import { Link } from "@tanstack/react-router";
import { Button } from "@/features/shared/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/features/shared/components/ui/card";

type Props = {
	itemCount?: number;
};

export function MyItemsCard({ itemCount }: Props) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>My Items</CardTitle>
			</CardHeader>

			<CardContent className="flex items-center justify-between">
				<div>
					<p className="text-2xl font-bold">{itemCount ?? "-"}</p>

					<p className="text-muted-foreground text-sm">Items listed</p>
				</div>

				<Button asChild>
					<Link to="/marketplace/my-items">View Items</Link>
				</Button>
			</CardContent>
		</Card>
	);
}
