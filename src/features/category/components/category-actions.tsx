import { Link } from "@tanstack/react-router";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/features/shared/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/features/shared/components/ui/dropdown-menu";

import type { CategoryActionsProps } from "../types";

export function CategoryActions({ category }: CategoryActionsProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="sm">
					<MoreHorizontal />
					<span className="sr-only">Open menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem asChild>
					<Link
						to="/admin/categories"
						search={{ modal: "create", categoryId: category.id }}
					>
						Add
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link
						to="/admin/categories"
						search={{
							modal: "edit",
							categoryId: category.id,
						}}
					>
						Edit
					</Link>
				</DropdownMenuItem>
				{category.children.length === 0 ? (
					<>
						<DropdownMenuSeparator />
						<DropdownMenuItem variant="destructive" asChild>
							<Link
								to="/admin/categories"
								search={{
									modal: "delete",
									categoryId: category.id,
								}}
							>
								Delete
							</Link>
						</DropdownMenuItem>
					</>
				) : null}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
