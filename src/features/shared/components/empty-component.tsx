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
import type { PropsWithChildren } from "react";

export function EmptyComponent(desc: EmptyComponentProps & PropsWithChildren) {
	return (
		<Empty className="h-full">
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<desc.icon />
				</EmptyMedia>
				<EmptyTitle>{desc.title}</EmptyTitle>
				<EmptyDescription>{desc.description}</EmptyDescription>
			</EmptyHeader>

				<EmptyContent>
          {desc.children}
				</EmptyContent>
		</Empty>
	);
}
