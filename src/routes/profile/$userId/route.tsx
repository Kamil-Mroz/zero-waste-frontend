import { createFileRoute, notFound } from "@tanstack/react-router";
import { idParamSchema } from "@/features/shared/schemas/uuid.schema";

export const Route = createFileRoute("/profile/$userId")({
	staticData: {
		getTitle: () => "Profile",
	},
	params: {
		parse: (params) => {
			const result = idParamSchema.safeParse({ id: params.userId });
			if (!result.success) {
				throw notFound();
			}
			return {
				userId: result.data.id,
			};
		},
	},
});
