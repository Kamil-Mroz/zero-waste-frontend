import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod/v4";

import { paginationSchema } from "@/features/shared/schemas/pagination.schema";

import {
	userQueryOptions,
	usersQueryOptions,
} from "@/features/users/hooks/query-options";
import { userParamsSchema } from "@/features/users/schemas/user.schema";
import { getValidPage } from "@/lib/utils";

const usersSearchSchema = z.object({
	...userParamsSchema.shape,
	...paginationSchema.shape,
});

export const Route = createFileRoute("/_authenticated/admin/users/")({
	validateSearch: usersSearchSchema,
	loaderDeps: ({ search }) => {
		const { modal, page, roles, size, text, userId } = search;
		return { modal, page, roles, size, text, userId };
	},
	loader: async ({ context, deps: search }) => {
		if (context.auth.hasRole("DEMO")) {
			return;
		}

		const { modal, userId, ...usersSearch } = search;
		const page = await context.queryClient.ensureQueryData(
			usersQueryOptions(usersSearch),
		);

		const correctPage = getValidPage(search.page, page.totalPages);
		if (correctPage) {
			throw redirect({
				to: ".",
				search: {
					...search,
					page: correctPage,
				},
				replace: true,
			});
		}
		if (modal === "edit" && userId) {
			await context.queryClient.ensureQueryData(userQueryOptions(userId));
		}
	},
});
