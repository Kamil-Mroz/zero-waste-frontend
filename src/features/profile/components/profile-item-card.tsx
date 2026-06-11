import { Link } from "@tanstack/react-router";
import type { ItemType } from "@/features/item/types";
import { Badge } from "@/features/shared/components/ui/badge";

type ProfileItemCardProps = {
	item: ItemType;
};
export function ProfileItemCard({ item }: ProfileItemCardProps) {
	return (
		<Link
			to={"/marketplace/$itemId"}
			params={{ itemId: item.id }}
			className="hover:bg-muted flex items-center gap-3 rounded-md p-2 transition group"
		>
			<div className="bg-muted transition group-hover:border-background border h-14 w-14 overflow-hidden rounded-md">
				{item.images[0] ? (
					<img
						src={item.images[0].url}
						alt={item.title}
						className="h-full w-full object-cover"
					/>
				) : null}
			</div>

			<div className="min-w-0 flex-1">
				<p className="truncate font-medium">{item.title}</p>

				<p className="text-muted-foreground truncate text-sm">{item.city}</p>
			</div>

			<Badge variant="outline">{item.state}</Badge>
		</Link>
	);
}
