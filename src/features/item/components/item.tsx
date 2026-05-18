import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Button } from "@/features/shared/components/ui/button";
import { Card, CardContent } from "@/features/shared/components/ui/card";
import { cn } from "@/lib/utils";
import type { ItemProps } from "../types";
import { ItemActions } from "./item-actions";

export function Item({ item }: ItemProps) {
	const { user } = useAuth();

	const isAuthenticated = !!user;
	const isOwner = isAuthenticated && user.id === item.owner.id;
	const [activeImage, setActiveImage] = useState(item.images?.[0]?.url ?? null);

	return (
		<div className="max-w-2xl w-full grid gap-2 place-items-start mx-auto p-4">
			<Button asChild variant="secondary">
				<Link to={isOwner ? "/marketplace/my-items" : "/marketplace"}>
					<ChevronLeft />
					<span>Go back</span>
				</Link>
			</Button>
			<Card
				className={cn(
					"rounded-2xl shadow w-full border border-transparent overflow-hidden relative",
					item.state === "GIVEN" ? "border-destructive" : "",
				)}
			>
				<CardContent className="p-6 space-y-4 ">
					{item.state === "GIVEN" && (
						<span className="absolute top-1/2 -translate-y-1/2 text-7xl bg-destructive/40 rotate-45 font-bold -inset-x-full  text-center py-10 z-10">
							GIVEN
						</span>
					)}
					<h1 className="text-2xl font-bold">{item.title}</h1>
					<div className="space-y-3">
						<div className="aspect-square w-full max-w-sm overflow-hidden rounded-2xl border">
							{activeImage ? (
								<img
									src={activeImage}
									alt={item.title}
									className="h-full w-full object-cover transition duration-300"
								/>
							) : (
								<div className="flex h-full items-center justify-center text-sm text-muted-foreground">
									No Image
								</div>
							)}
						</div>
						{item.images?.length > 1 && (
							<div className="flex gap-2 overflow-x-auto p-1">
								{item.images.map((img, idx) => (
									<button
										key={img.id}
										type="button"
										onMouseEnter={() => setActiveImage(img.url)}
										onFocus={() => setActiveImage(img.url)}
										onClick={() => setActiveImage(img.url)}
										className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border p-0 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
									>
										<img
											src={img.url}
											alt={`${item.title} number ${idx + 1}`}
											className={`h-full w-full object-cover transition ${activeImage === img.url ? "ring-2 ring-primary" : "opacity-80 hover:opacity-100"}`}
										/>
									</button>
								))}
							</div>
						)}
					</div>

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
