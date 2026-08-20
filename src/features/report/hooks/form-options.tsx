import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useAppForm } from "@/features/shared/components/form/form";
import { appToast } from "@/features/shared/components/toast";
import { reportSchema } from "../schemas/report.schema";
import type { ReportRequest, ReportSubjectType } from "../types";
import { sendReportMutationOptions } from "./mutation-options";

export const useReportForm = ({
	subjectType,
	subjectId,
	closeModal,
}: {
	subjectType: ReportSubjectType;
	subjectId: string;
	closeModal: () => void;
}) => {
	const queryClient = useQueryClient();
	const router = useRouter();
	const sendRaportMutation = useMutation(sendReportMutationOptions());

	return useAppForm({
		defaultValues: {
			subjectType: subjectType,
			subjectId: subjectId,
			reason: "SPAM",
			comment: "",
		} as ReportRequest,
		validators: {
			onSubmit: reportSchema,
		},
		onSubmit: async ({ value, formApi }) => {
			console.log(value);
			// TODO: CONNECT FRONTEND WITH BACKEND

			await sendRaportMutation.mutateAsync(value);

			formApi.reset();
			// await queryClient.invalidateQueries({
			// 	queryKey: AUTH_QUERY_KEYS.connections(),
			// });
			await router.invalidate();
			closeModal();
			appToast.success({ description: "Report submitted successfully" });
		},
	});
};
