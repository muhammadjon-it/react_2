import { create } from 'zustand';

interface IData {
    id: number,
    phone: string
}

interface DataState {
    data: IData[];
    delUser: (id: number) => void;
}

const useDataStore = create<DataState>()((set) => ({
    data: [
        { id: 1, phone: "1-503-803-6334 x5725" },
        { id: 2, phone: "920-689-7626 x03008" },
        { id: 3, phone: "(988) 574-3542 x2249" },
        { id: 4, phone: "1-699-290-1339 x1071" },
        { id: 5, phone: "256-844-6091 x54619" },
    ],

    delUser: (id) => set((state) => ({ data: state.data.filter((el) => el.id != id) }))


}));

export default useDataStore;
