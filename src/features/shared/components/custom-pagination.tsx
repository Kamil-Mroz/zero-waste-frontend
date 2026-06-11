import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/features/shared/components/ui/button";
import { Field, FieldLabel } from "@/features/shared/components/ui/field";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
} from "@/features/shared/components/ui/pagination";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/features/shared/components/ui/select";
import { PAGE_SIZES } from "@/features/shared/constants";
import { useIsMobile } from "@/features/shared/hooks/use-mobile";
import type { Pageable } from "@/features/shared/types";

export function CustomPagination({
	totalPages,
	pageable,
}: {
	totalPages: number;
	pageable: Pageable;
}) {
	const isMobile = useIsMobile();
	const navigate = useNavigate();
	return (
		<div className="flex flex-col items-center justify-between gap-2 mx-auto max-w-lg w-full">
			<Pagination className="mx-0 w-auto">
				<PaginationContent>
					{pageable.page !== 0 && (
						<>
							<PaginationItem>
								<Button asChild variant="ghost">
									<Link
										to={"."}
										search={(prev) => ({ ...prev, page: pageable.page - 1 })}
									>
										<ChevronLeftIcon data-icon="inline-start" />
										<span className="hidden sm:block">Previous</span>
									</Link>
								</Button>
							</PaginationItem>
							{!isMobile && (
								<PaginationItem>
									<Button variant={"ghost"} size={"icon"} asChild>
										<Link to={"."} search={(prev) => ({ ...prev, page: 0 })}>
											1
										</Link>
									</Button>
								</PaginationItem>
							)}
						</>
					)}
					{pageable.page > 1 && !isMobile && (
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
					)}

					<PaginationItem>
						<Button variant={"outline"} size={"icon"}>
							{pageable.page + 1}
						</Button>
					</PaginationItem>
					{pageable.page < totalPages - 2 && !isMobile && (
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
					)}
					{pageable.page < totalPages - 1 && (
						<>
							{!isMobile && (
								<PaginationItem>
									<Button variant={"ghost"} size={"icon"} asChild>
										<Link
											to={"."}
											search={(prev) => ({ ...prev, page: totalPages - 1 })}
										>
											{totalPages}
										</Link>
									</Button>
								</PaginationItem>
							)}
							<PaginationItem>
								<Button asChild variant="ghost">
									<Link
										to={"."}
										search={(prev) => ({ ...prev, page: pageable.page + 1 })}
									>
										<span className="hidden sm:block">Next</span>
										<ChevronRightIcon data-icon="inline-end" />
									</Link>
								</Button>
							</PaginationItem>
						</>
					)}
				</PaginationContent>
			</Pagination>
			<Field orientation="horizontal" className="w-fit">
				<FieldLabel htmlFor="select-rows-per-page">Items per page</FieldLabel>
				<Select
					value={`${pageable.size}`}
					onValueChange={(value) =>
						navigate({
							to: ".",
							replace: true,
							search: (prev) => ({ ...prev, size: value }),
						})
					}
				>
					<SelectTrigger className="w-20" id="select-rows-per-page">
						<SelectValue />
					</SelectTrigger>
					<SelectContent align="start">
						<SelectGroup>
							{PAGE_SIZES.map((pageSize) => (
								<SelectItem key={pageSize} value={`${pageSize}`}>
									{pageSize}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
			</Field>
		</div>
	);
}
