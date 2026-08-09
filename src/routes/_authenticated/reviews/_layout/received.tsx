import { createFileRoute, redirect } from "@tanstack/react-router";
import { ReceivedReviewsQueryOptions } from "@/features/review/hooks/query-options";
import { getValidPage } from "@/lib/utils";

export const Route = createFileRoute(
	"/_authenticated/reviews/_layout/received",
)({
	staticData: {
		getTitle: () => "Received",
	},
	beforeLoad: async ({ context, search }) => {
		const { page, size } = search;
		const data = await context.queryClient.ensureQueryData(
			ReceivedReviewsQueryOptions({ page, size }),
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
