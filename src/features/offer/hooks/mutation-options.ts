import { mutationOptions } from "@tanstack/react-query";
import { toast } from "sonner";
import { appToast } from "@/features/shared/components/toast";
import { handleApiError } from "@/lib/utils";
import {
	offerAccept,
	offerCancel,
	offerReject,
	showInterestInItem,
} from "../api";

export function showInterestInItemMutationOptions(id: string) {
	return mutationOptions({
		mutationFn: () => showInterestInItem(id),
		onError: (error) => {
			const message = handleApiError(error);
			if (message) {
				appToast.error({ title: "Show interest failed", description: message });
			}
		},
	});
}
export function offerAcceptMutationOptions() {
	return mutationOptions({
		mutationFn: offerAccept,

		onError: (error) => {
			const message = handleApiError(error);
			if (message) {
				appToast.error({ title: "Accept offer failed", description: message });
			}
		},
	});
}
export function offerRejectMutationOptions() {
	return mutationOptions({
		mutationFn: offerReject,

		onError: (error) => {
			const message = handleApiError(error);
			if (message) {
				appToast.error({ title: "Reject offer failed", description: message });
			}
		},
	});
}
export function offerCancelMutationOptions() {
	return mutationOptions({
		mutationFn: offerCancel,

		onError: (error) => {
			const message = handleApiError(error);
			if (message) {
				appToast.error({ title: "Cancel offer failed", description: message });
			}
		},
	});
}
