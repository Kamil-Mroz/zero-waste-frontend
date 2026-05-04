import { getRouteApi } from "@tanstack/react-router";
import { categoryDialogConfig } from "@/features/category/constants";
import ResponsiveDialog from "@/features/shared/components/responsive-dialog";
import { CategoryCreateDialog } from "./category-create-dialog";
import { CategoryDeleteDialog } from "./category-delete-dialog";
import { CategoryUpdateDialog } from "./category-update-dialog";

export function CategoryDialog() {
	const routeApi = getRouteApi("/_authenticated/admin/categories/");
	const { useNavigate, useSearch } = routeApi;
	const navigate = useNavigate();
	const { categoryId, modal } = useSearch();

	const isEdit = modal === "edit";
	const isCreate = modal === "create";
	const isDelete = modal === "delete";
	const isOpen = !!modal;

	const config = categoryDialogConfig[modal ?? "empty"];

	const closeModal =  () => {
		navigate({
			to: "/admin/categories",
			search: {},
			replace: true,
		});
	};

	return (
		<ResponsiveDialog
			isOpen={isOpen}
			setIsOpen={(value) => {
				if (!value) closeModal();
			}}
			title={config.title}
			description={config.description}
		>
			{isEdit && categoryId && (
				<CategoryUpdateDialog id={categoryId} onDone={closeModal} />
			)}
			{isDelete && categoryId && (
				<CategoryDeleteDialog onDone={closeModal} id={categoryId} />
			)}
			{isCreate && <CategoryCreateDialog id={categoryId} />}
		</ResponsiveDialog>
	);
}
