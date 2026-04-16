import { Link } from "@tanstack/react-router";
import { Button } from "@/features/shared/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/features/shared/components/ui/empty";
import type { EmptyComponentProps } from "../types";

export function EmptyComponent(desc: EmptyComponentProps) {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<desc.icon />
				</EmptyMedia>
				<EmptyTitle>{desc.title}</EmptyTitle>
				<EmptyDescription>{desc.description}</EmptyDescription>
			</EmptyHeader>

			{desc.linkLabel && desc.linkTo ? (
				<EmptyContent>
					<Button asChild className="">
						<Link to={desc.linkTo}>{desc.linkLabel}</Link>
					</Button>
				</EmptyContent>
			) : null}
		</Empty>
	);
}
