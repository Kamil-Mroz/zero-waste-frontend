import { mutationOptions } from "@tanstack/react-query";
import { appToast } from "@/features/shared/components/toast";
import { handleApiError } from "@/lib/utils";
import { sendReport } from "../api";

export const sendReportMutationOptions = () =>
	mutationOptions({
		mutationFn: sendReport,
		onError: (error) => {
			const message = handleApiError(error);
			if (message) {
				appToast.error({ title: "Deletion failed", description: message });
			}
		},
	});
