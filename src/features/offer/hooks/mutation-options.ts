import { mutationOptions } from "@tanstack/react-query";
import {
	offerAccept,
	offerCancel,
	offerReject,
	showInterestInItem,
} from "../api";

export function showInterestInItemMutationOptions(id: string) {
	return mutationOptions({
		mutationFn: () => showInterestInItem(id),
	});
}
export function offerAcceptMutationOptions() {
	return mutationOptions({
		mutationFn: offerAccept,
	});
}
export function offerRejectMutationOptions() {
	return mutationOptions({
		mutationFn: offerReject,
	});
}
export function offerCancelMutationOptions() {
	return mutationOptions({
		mutationFn: offerCancel,
	});
}
