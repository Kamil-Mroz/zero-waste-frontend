import { create } from "zustand";

type UsersSelectionStoreState = {
	selectedIds: string[];
	clearSelectionTrigger: number;
};

type UserSelectionStore = UsersSelectionStoreState;

export const useTableStore = create<UserSelectionStore>(() => ({
	selectedIds: [],
	clearSelectionTrigger: 0,
}));

export function clearSelection() {
	useTableStore.setState((s) => ({
		selectedIds: [],
		clearSelectionTrigger: s.clearSelectionTrigger + 1,
	}));
}
export function setSelectedIds(ids: string[]) {
	useTableStore.setState(() => ({ selectedIds: ids }));
}
