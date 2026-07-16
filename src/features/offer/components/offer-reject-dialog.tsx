import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { Button } from "@/features/shared/components/ui/button";
import { Spinner } from "@/features/shared/components/ui/spinner";
import { useIsMobile } from "@/features/shared/hooks/use-mobile";
import { OFFER_QUERY_KEYS } from "../constants";
import { offerRejectMutationOptions } from "../hooks/mutation-options";
import type { OfferDialogProps } from "../types";

function OfferRejectDialog({ onDone, offerId }: OfferDialogProps) {
	const client = useQueryClient();
	const router = useRouter();

	const isMobile = useIsMobile();
	const mutation = useMutation({
		...offerRejectMutationOptions(),
		onSuccess: async () => {
			await Promise.all([
				client.invalidateQueries({ queryKey: OFFER_QUERY_KEYS.received() }),
			]);
			await router.invalidate();
			onDone();
		},
	});
	return (
		<div className="grid md:grid-cols-2 gap-2">
			{isMobile ? null : (
				<Button variant="outline" onClick={onDone}>
					Cancel
				</Button>
			)}
			<Button
				variant="destructive"
				onClick={() => mutation.mutate(offerId)}
				disabled={mutation.isPending}
			>
				{mutation.isPending ? <Spinner /> : "Reject"}
			</Button>
		</div>
	);
}
export default OfferRejectDialog;
