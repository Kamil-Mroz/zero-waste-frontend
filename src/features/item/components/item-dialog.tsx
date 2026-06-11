import { getRouteApi } from "@tanstack/react-router";
import ResponsiveDialog from "@/features/shared/components/responsive-dialog";
import { useFilters } from "@/features/shared/hooks/use-filters";
import OfferItemDialog from "../../offer/components/offer-item-dialog";
import { itemDialogConfig } from "../constants";
import { ItemDeleteDialog } from "./item-delete-dialog";
import { ItemHideDialog } from "./item-hide-dialog";
import { ItemPublishDialog } from "./item-publish-dialog";

export function ItemDialog() {
	const routeId = "/marketplace/$itemId";
	const routeApi = getRouteApi(routeId);
	const { modal } = routeApi.useSearch();
	const { itemId } = routeApi.useParams();

	const { resetFilters } = useFilters(routeId);

	const isOpen = !!modal;
	const isDelete = modal === "delete";
	const isOffer = modal === "offer";
	const isHide = modal === "hide";
	const isPublish = modal === "publish";

	const config = itemDialogConfig[modal ?? "empty"];

	const close = () => {
		resetFilters();
	};
	return (
		<ResponsiveDialog
			isOpen={isOpen}
			setIsOpen={(open) => !open && close()}
			title={config.title}
			description={config.description}
		>
			{isDelete && <ItemDeleteDialog onDone={close} id={itemId} />}
			{isOffer && <OfferItemDialog onDone={close} id={itemId} />}
			{isHide && <ItemHideDialog onDone={close} id={itemId} />}
			{isPublish && <ItemPublishDialog onDone={close} id={itemId} />}
		</ResponsiveDialog>
	);
}
