import { Item } from '@prisma/client';
import { create } from 'zustand';

export interface PresentStore {
    presents: Item[];
    getPresentsByUser: () => Promise<void>
}


const usePresentStore = create<PresentStore>()((set) => ({
    presents: [],
    getPresentsByUser: async () => {
        const response = await fetch('http://localhost:3000/api/present')
        const presents = await response.json()
        set(state => ({
            ...state,
            presents
        }))
    }
}));
export default usePresentStore;
