import type { RegisteredRouter, RouteIds } from "@tanstack/react-router";
import { X } from "lucide-react";
import { type PropsWithChildren, Suspense } from "react";
import { CategoryMenu } from "@/features/category/components/category-menu";
import { DebouncedInput } from "@/features/shared/components/debounced-input";
import { Button } from "@/features/shared/components/ui/button";
import { Field } from "@/features/shared/components/ui/field";
import { Spinner } from "@/features/shared/components/ui/spinner";
import { useFilters } from "@/features/shared/hooks/use-filters";

export function ItemToolbar<
	TId extends RouteIds<RegisteredRouter["routeTree"]>,
>({
	routeId,
	children,
}: { routeId: TId; isOwnItems?: boolean } & PropsWithChildren) {
	const { filters, setFilters, resetFilters } = useFilters(
		routeId as "/marketplace/" | "/_authenticated/marketplace/my-items",
	);

	const onChange = (value: string | number) => {
		setFilters({ text: `${value}` });
	};

	const onSelect = (id: string) => {
		setFilters({ category: id });
	};

	return (
		<div className="flex items-center gap-2 flex-col sm:items-stretch sm:flex-row">
			<Field className="w-auto">
				<DebouncedInput
					placeholder="Search..."
					value={filters.text ?? ""}
					onChange={onChange}
					className="max-w-62.5 p-2"
				/>
			</Field>

			{children}
			<Suspense fallback={<Spinner />}>
				<CategoryMenu onSelect={onSelect} />
			</Suspense>
			{Object.values(filters).some((value) => value) && (
				<div>
					<Button variant="ghost" onClick={resetFilters} className="h-full">
						Reset <X />
					</Button>
				</div>
			)}
		</div>
	);
}
