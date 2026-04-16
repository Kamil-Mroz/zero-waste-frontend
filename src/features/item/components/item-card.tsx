import { Link, useNavigate } from "@tanstack/react-router";
import { Badge } from "@/features/shared/components/ui/badge";
import { Button } from "@/features/shared/components/ui/button";
import { Card, CardContent } from "@/features/shared/components/ui/card";
import type { ItemCardProps } from "../types";

export function ItemCard({ item }: ItemCardProps) {
	const navigate = useNavigate();
	return (
		<Card
			key={item.id}
			className="rounded-2xl shadow hover:shadow-md transition cursor-pointer  hover:scale-[102%]"
			onClick={() =>
				navigate({ to: "/marketplace/$itemId", params: { itemId: item.id } })
			}
		>
			<CardContent className="p-4 space-y-2">
				<div className="flex justify-between items-start">
					<h2 className="text-lg font-semibold">{item.title}</h2>
					<Badge variant="secondary">{item.condition}</Badge>
				</div>

				<p className="text-sm text-muted-foreground line-clamp-2">
					{item.description}
				</p>

				<div className="text-xs text-muted-foreground flex justify-between">
					<span>{item.city}</span>
					<span>{item.category.name}</span>
				</div>

				<div className="pt-2">
					<Button size="sm" asChild>
						<Link to="/marketplace/$itemId" params={{ itemId: item.id }}>
							View details
						</Link>
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
