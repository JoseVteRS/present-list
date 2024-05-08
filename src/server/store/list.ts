import { ListWithPresents } from '@/server/types/list';
import { create } from 'zustand';
import { listGetAllByOwn } from '../actions/list';

export interface ListStore {
    lists: ListWithPresents[];
    getListByUser: () => Promise<void>
}


const useListStore = create<ListStore>()((set) => ({
    lists: [],
    getListByUser: async () => {
        const [error, lists] = await listGetAllByOwn()
        if (lists) {
            set(state => ({
                ...state,
                lists
            }))
        }
    }
}));
export default useListStore;
