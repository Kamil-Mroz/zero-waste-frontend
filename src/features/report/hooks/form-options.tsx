import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useAppForm } from "@/features/shared/components/form/form";
import { appToast } from "@/features/shared/components/toast";
import { actionsBySubject, REPORT_QUERY_KEYS } from "../constants";
import {
	reportRejectSchema,
	reportResolveSchema,
	reportSchema,
} from "../schemas/report.schema";
import type { Report, ReportRequest, ReportSubjectType } from "../types";
import {
	rejectReportMutationOptions,
	resolveReportMutationOptions,
	sendReportMutationOptions,
} from "./mutation-options";

export const useReportForm = ({
	subjectType,
	subjectId,
	closeModal,
	showToast,
}: {
	subjectType: ReportSubjectType;
	subjectId: string;
	closeModal: () => void;
	showToast: boolean;
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
			try {
				await sendRaportMutation.mutateAsync({ value, form: formApi });
				formApi.reset();
				await queryClient.invalidateQueries({
					queryKey: REPORT_QUERY_KEYS.all,
				});
				await router.invalidate();
				closeModal();
				if (showToast)
					appToast.success({ description: "Report submitted successfully" });
			} catch {}
		},
	});
};

export const useReportRejectForm = ({
	onSuccess,
	report,
}: {
	report: Report;
	onSuccess: () => void;
}) => {
	const queryClient = useQueryClient();
	const router = useRouter();
	const rejectReportMutation = useMutation(
		rejectReportMutationOptions(report.id),
	);

	return useAppForm({
		defaultValues: {
			adminNote: "",
		},
		validators: {
			onSubmit: reportRejectSchema,
		},
		onSubmit: async ({ value, formApi }) => {
			try {
				await rejectReportMutation.mutateAsync({ value, form: formApi });
				formApi.reset();
				await queryClient.invalidateQueries({
					queryKey: REPORT_QUERY_KEYS.all,
				});
				await router.invalidate();
				onSuccess();
				appToast.success({ description: "Report rejected successfully" });
			} catch {}
		},
	});
};

export const useReportResolveForm = ({
	onSuccess,
	report,
}: {
	report: Report;
	onSuccess: () => void;
}) => {
	const queryClient = useQueryClient();
	const router = useRouter();
	const resolveReportMutation = useMutation(
		resolveReportMutationOptions(report.id),
	);

	return useAppForm({
		defaultValues: {
			action: actionsBySubject[report.subjectType].actions[0].value,
			adminNote: "",
		},
		validators: {
			onSubmit: reportResolveSchema,
		},
		onSubmit: async ({ value, formApi }) => {
			try {
				await resolveReportMutation.mutateAsync({ value, form: formApi });
				formApi.reset();
				await queryClient.invalidateQueries({
					queryKey: REPORT_QUERY_KEYS.all,
				});
				await router.invalidate();
				onSuccess();
				appToast.success({ description: "Report resolved successfully" });
			} catch {}
		},
	});
};
