import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Button } from "@/features/shared/components/ui/button";
import { Card, CardContent } from "@/features/shared/components/ui/card";

import type { ItemProps } from "../types";
import { ItemActions } from "./item-actions";
import { ItemImage } from "./item-image";

export function Item({ item }: ItemProps) {
	const { user } = useAuth();

	const isAuthenticated = !!user;
	const isOwner = isAuthenticated && user.id === item.owner.id;

	return (
		<div className="max-w-2xl w-full grid gap-2 place-items-start mx-auto p-4">
			<Button asChild variant="secondary">
				<Link to={isOwner ? "/marketplace/my-items" : "/marketplace"}>
					<ChevronLeft />
					<span>Go back</span>
				</Link>
			</Button>
			<Card className="rounded-2xl shadow w-full">
				<CardContent className="p-6 space-y-4">
					<h1 className="text-2xl font-bold">{item.title}</h1>
					<ItemImage src={item.images?.[0]?.url} alt={item.title} />

					<p>{item.description}</p>

					<div className="text-sm text-muted-foreground">
						<p>City: {item.city}</p>
						<p>Condition: {item.condition}</p>
						<p>State: {item.state}</p>
						<p>Category: {item.category.name}</p>
					</div>

					<div className="border-t pt-4">
						<p className="font-medium">Owner</p>
						<p>
							{item.owner.firstName} {item.owner.lastName}
						</p>
						<p className="text-sm">{item.owner.email}</p>
					</div>

					<ItemActions
						isOwner={isOwner}
						item={item}
						isAuthenticated={isAuthenticated}
					/>
				</CardContent>
			</Card>
		</div>
	);
}
