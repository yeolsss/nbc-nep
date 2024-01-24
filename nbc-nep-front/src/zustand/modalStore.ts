import { create } from "zustand";

interface ModalState {
  isJoinSpaceModalOpen: boolean;
  isCreateSpaceModalOpen: boolean;
}

interface ModalStoreState extends ModalState {
  openModal: (kind: keyof ModalState) => void;
  closeModal: () => void;
}

const initialState = {
  isJoinSpaceModalOpen: false,
  isCreateSpaceModalOpen: false,
};

const modalStore = create<ModalStoreState>()((set) => ({
  ...initialState,
  openModal: (kind: keyof ModalState) =>
    set(() => ({
      [kind]: true,
    })),
  closeModal: () =>
    set(() => ({
      ...initialState,
    })),
}));

export default modalStore;
