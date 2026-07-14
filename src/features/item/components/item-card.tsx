import { Link, useNavigate } from "@tanstack/react-router";
import { Badge } from "@/features/shared/components/ui/badge";
import { Button } from "@/features/shared/components/ui/button";
import { Card, CardContent } from "@/features/shared/components/ui/card";
import { cn } from "@/lib/utils";
import type { ItemCardProps } from "../types";
import { ItemImage } from "./item-image";

export function ItemCard({ item }: ItemCardProps) {
	const navigate = useNavigate();
	return (
		<Card
			key={item.id}
			className={cn(
				"rounded-2xl shadow hover:shadow-md transition cursor-pointer max-w-sm mx-auto w-full hover:scale-[102%] border border-transparent relative overflow-hidden",
				item.state === "GIVEN" ? "border-destructive" : "",
			)}
			onClick={() =>
				navigate({ to: "/marketplace/$itemId", params: { itemId: item.id } })
			}
		>
			<CardContent className="px-4 space-y-2">
				{item.state === "GIVEN" ? (
					<span className="py-2 bg-destructive/40 absolute px-20 top-2.5 text-bold -right-19 rotate-45  text-center text-xl z-10">
						GIVEN
					</span>
				) : (
					<Badge
						variant={`${item.state === "AVAILABLE" ? "default" : "outline"}`}
					>
						{item.state}
					</Badge>
				)}
				<ItemImage src={item.thumbnail?.url} alt={item.title} />
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

				<div className="mt-auto pt-4">
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
