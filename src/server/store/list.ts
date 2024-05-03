import { ListWithPresents } from '@/types/list';
import { create } from 'zustand';

export interface ListStore {
    lists: ListWithPresents[];
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
