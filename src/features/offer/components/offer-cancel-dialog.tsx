import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { Button } from "@/features/shared/components/ui/button";
import { Spinner } from "@/features/shared/components/ui/spinner";
import { OFFER_QUERY_KEYS } from "../constants";
import { offerCancelMutationOptions } from "../hooks/mutation-options";
import type { OfferDialogProps } from "../types";
import { useIsMobile } from "@/features/shared/hooks/use-mobile";

function OfferCancelDialog({ onDone, offerId }: OfferDialogProps) {
	const client = useQueryClient();
	const router = useRouter();
  const isMobile = useIsMobile()

	const mutation = useMutation({
		...offerCancelMutationOptions(),
		onSuccess: async () => {
			await Promise.all([
				client.invalidateQueries({ queryKey: OFFER_QUERY_KEYS.own() }),
			]);
			await router.invalidate();

			onDone();
		},
	});
	return (
		<div className="grid sm:grid-cols-2 gap-2">
      {isMobile ? null :
			<Button variant="outline" onClick={onDone}>
				Cancel
			</Button>
      }
			<Button
				variant="warning"
				onClick={() => mutation.mutate(offerId)}
				disabled={mutation.isPending}
			>
				{mutation.isPending ? <Spinner /> : "Cancel Offer"}
			</Button>
		</div>
	);
}
export default OfferCancelDialog;
