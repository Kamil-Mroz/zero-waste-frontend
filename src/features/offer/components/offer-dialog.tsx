import ResponsiveDialog from "@/features/shared/components/responsive-dialog";
import { useFilters } from "@/features/shared/hooks/use-filters";
import { offersDialogConfig } from "../constants";
import OfferAcceptDialog from "./offer-accept-dialog";
import OfferRejectDialog from "./offer-reject-dialog";
import OfferCancelDialog from "./offer-cancel-dialog";

function OfferDialog({
	routeId,
}: {
	routeId: "/_authenticated/offers/own" | "/_authenticated/offers/received";
}) {
	const {
		filters: { modal, offerId },
		clearFilters,
	} = useFilters(routeId);
	const isOpen = !!modal;
	const isCancel = modal === "cancel";
	const isAccept = modal === "accept";
	const isReject = modal === "reject";

	const config = offersDialogConfig[modal || "empty"];

	const close = () => {
		clearFilters(["modal", "offerId"]);
	};

	return offerId ? (
		<ResponsiveDialog
			isOpen={isOpen}
			setIsOpen={(open) => !open && close()}
			title={config.title}
			description={config.description}
		>
			{isAccept && <OfferAcceptDialog onDone={close} offerId={offerId} />}
			{isReject && <OfferRejectDialog onDone={close} offerId={offerId} />}
			{isCancel && <OfferCancelDialog onDone={close} offerId={offerId} />}
		</ResponsiveDialog>
	) : null;
}
export default OfferDialog;
