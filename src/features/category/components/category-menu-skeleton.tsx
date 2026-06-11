import { Button } from "@/features/shared/components/ui/button";

export function CategoryMenuSkeleton() {
	return (
		<div className="justify-stretch">
			<Button variant="outline" className="h-full" size="lg" disabled>
				Categories
			</Button>
		</div>
	);
}
