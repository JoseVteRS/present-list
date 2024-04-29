import { Item, List } from '@prisma/client';
import { create } from 'zustand';

export interface ListStore {
    lists: List[];
    getListByUser: () => Promise<void>
}


const useListStore = create<ListStore>()((set) => ({
    lists: [],
    getListByUser: async () => {
        const response = await fetch('http://localhost:3000/api/list')
        const lists = await response.json()
        set(state => ({
            ...state,
            lists
        }))
    }
}));
export default useListStore;
