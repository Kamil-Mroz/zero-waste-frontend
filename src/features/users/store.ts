import { create } from "zustand";

type UsersSelectionStoreState = { selectedIds: string[] };
type UserSelectionStoreActions = {
	setSelectedIds: (ids: string[]) => void;
	clear: () => void;
};

type UserSelectionStore = UsersSelectionStoreState & UserSelectionStoreActions;

export const useUserSelectionStore = create<UserSelectionStore>((set) => ({
	selectedIds: [],
	setSelectedIds: (ids) => set({ selectedIds: ids }),
	clear: () => set({ selectedIds: [] }),
}));
