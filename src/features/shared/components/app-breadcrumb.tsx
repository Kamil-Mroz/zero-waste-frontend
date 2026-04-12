import { Link, useMatches } from "@tanstack/react-router";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/features/shared/components/ui/breadcrumb";
export function AppBreadcrumb() {
	const matches = useMatches();
	return (
		<Breadcrumb className="hidden sm:block">
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<Link to="/">Home</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>
				{matches
					.filter((m) => m.staticData.getTitle?.())
					.map((m) =>
						m.staticData.getTitle?.() ? (
							<span
								key={`route-title${m.id}`}
								className="flex flex-wrap items-center gap-1.5 text-xs/relaxed wrap-break-word text-muted-foreground"
							>
								<BreadcrumbSeparator />
								<BreadcrumbItem>
									<BreadcrumbPage>{m.staticData.getTitle?.()}</BreadcrumbPage>
								</BreadcrumbItem>
							</span>
						) : null,
					)}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
