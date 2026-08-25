import {
	QueryClient,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { appToast } from "@/features/shared/components/toast";
import { Button } from "@/features/shared/components/ui/button";
import { Spinner } from "@/features/shared/components/ui/spinner";
import { useIsMobile } from "@/features/shared/hooks/use-mobile";
import type { ItemOfferDialogProps } from "../../item/types";
import { OFFER_QUERY_KEYS } from "../constants";
import { showInterestInItemMutationOptions } from "../hooks/mutation-options";

function OfferItemDialog({ id, onDone }: ItemOfferDialogProps) {
	const isMobile = useIsMobile();
	const queryClient = useQueryClient();
	const mutation = useMutation({
		...showInterestInItemMutationOptions(id),

		onSuccess: async () => {
			appToast.success({
				title: "Item offer",
				description: "Offer submitted successfully",
			});

			await queryClient.invalidateQueries({ queryKey: OFFER_QUERY_KEYS.own() });

			onDone();
		},
	});
	return (
		<div className="space-y-4">
			<div className="grid md:grid-cols-2 gap-2">
				{isMobile ? null : (
					<Button variant="outline" onClick={onDone}>
						Cancel
					</Button>
				)}
				<Button
					variant="success"
					onClick={() => mutation.mutate()}
					disabled={mutation.isPending}
				>
					{mutation.isPending ? <Spinner /> : "I'm Interested"}
				</Button>
			</div>
		</div>
	);
}
export default OfferItemDialog;
