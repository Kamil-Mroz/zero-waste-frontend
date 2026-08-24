import type { Report } from "../types";

export function getSubjectPath(report: Report) {
	switch (report.subjectType) {
		case "ITEM":
			return {
				url: `/marketplace/$itemId`,
				params: {
					itemId: report.subjectId,
				},
			};

		case "USER":
			return {
				url: `/profile/$userId`,
				params: {
					userId: report.subjectId,
				},
			};

		case "REVIEW":
			return {
				url: `/admin/reviews/$reviewId`,
				params: {
					reviewId: report.subjectId,
				},
			};
		case "BLOG":
			return {
				url: `/eco-hub/blogs/$blogId`,
				params: {
					blogId: report.subjectId,
				},
			};
	}
}
