import ResponsiveDialog from "@/features/shared/components/responsive-dialog";
import { useFilters } from "@/features/shared/hooks/use-filters";
import { usersDialogConfig } from "../constants";
import { useTableStore } from "../store";
import { UserBanForm } from "./user-ban-form";
import { UserCreateForm } from "./user-create-form";
import { UserDeleteDialog } from "./user-delete-dialog";
import { UserUnbanForm } from "./user-unban-form";
import { UserUpdateForm } from "./user-update-form";

export function UsersDialog() {
	const routeId = "/_authenticated/admin/users/";
	const {
		filters: { modal, userId },
		clearFilters,
	} = useFilters(routeId);
	const isOpen = !!modal;
	const isCreate = modal === "create";
	const isEdit = modal === "edit";
	const isBan = modal === "ban";
	const isDelete = modal === "delete";
	const isUnban = modal === "unban";

	const selectedIds = useTableStore((s) => s.selectedIds);

	const ids = userId ? [userId] : selectedIds;

	const config = usersDialogConfig[modal || "empty"];

	const close = () => {
		clearFilters(["modal", "userId"]);
	};

	return (
		<ResponsiveDialog
			isOpen={isOpen}
			setIsOpen={(open) => !open && close()}
			title={config.title}
			description={config.description}
		>
			{isCreate && <UserCreateForm onDone={close} />}
			{isEdit && userId && <UserUpdateForm onDone={close} userId={userId} />}
			{isDelete && <UserDeleteDialog ids={ids} onDone={close} />}
			{isBan && <UserBanForm ids={ids} onDone={close} />}
			{isUnban && <UserUnbanForm ids={ids} onDone={close} />}
		</ResponsiveDialog>
	);
}
