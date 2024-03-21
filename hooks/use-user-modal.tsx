import { create } from 'zustand';

interface useUserModalUser {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useUserModal = create<useUserModalUser>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));