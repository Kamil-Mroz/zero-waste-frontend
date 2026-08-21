import { Badge } from "@/features/shared/components/ui/badge";

export function HiddenItemOverlay() {
	return (
		<div className="absolute inset-0 z-20 flex items-center justify-center bg-background/75 backdrop-blur-[2px]">
			<div className="text-center space-y-2 px-6">
				<Badge variant="destructive" className="text-sm">
					HIDDEN
				</Badge>

				<p className="font-semibold">This item has been hidden</p>

				<p className="text-sm text-muted-foreground max-w-sm">
					This item is currently hidden from other users by an administrator.
				</p>
			</div>
		</div>
	);
}
