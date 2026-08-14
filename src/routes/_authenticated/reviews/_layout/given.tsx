import { createFileRoute, redirect } from "@tanstack/react-router";
import { GivenReviewsQueryOptions } from "@/features/review/hooks/query-options";
import { getValidPage } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/reviews/_layout/given")({
	head: () => ({
		meta: [
			{
				title: "Given reviews",
			},
		],
	}),
	staticData: {
		getTitle: () => "Given",
	},

	beforeLoad: async ({ context, search }) => {
		const { page, size } = search;
		const data = await context.queryClient.ensureQueryData(
			GivenReviewsQueryOptions({ page, size }),
		);

		const correctPage = getValidPage(search.page, data.totalPages);
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
	},
});
