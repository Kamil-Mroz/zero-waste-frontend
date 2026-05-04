import { getRouteApi } from "@tanstack/react-router";
import ResponsiveDialog from "@/features/shared/components/responsive-dialog";
import { useFilters } from "@/features/shared/hooks/use-filters";
import { itemDialogConfig } from "../constants";
import { ItemDeleteDialog } from "./item-delete-dialog";

export function ItemDialog() {
	const routeId = "/marketplace/$itemId";
	const routeApi = getRouteApi(routeId);
	const { modal } = routeApi.useSearch();
	const { itemId } = routeApi.useParams();

	const { resetFilters } = useFilters(routeId);

	const isOpen = !!modal;
	const isDelete = modal === "delete";

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
		</ResponsiveDialog>
	);
}
