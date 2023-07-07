import {create} from 'zustand';
// this page controller the modal states and actions, 
// 
interface useStoreModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useStoreModal = create<useStoreModalStore>((set) => (
    {
        isOpen: false,
        onOpen: () => set({isOpen: true}),
        onClose: () => set({isOpen: false})
    }
))