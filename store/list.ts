import { Item } from '@prisma/client';
import { create } from 'zustand';

export interface ItemStore {
    items: Item[];
    addItem: (item: Item) => void;
    removeItem: (item: Item) => void;
}


const useItemStore = create<ItemStore>()((set) => ({
    items: [],
    addItem: (item) => set(state => ({ items: [...state.items, item] })),
    removeItem: (item) => set(state => ({ items: state.items.filter(i => i !== item) })),
}));
export default useItemStore;
