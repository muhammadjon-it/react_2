
import { atom } from "jotai";
import axios from "axios";

interface IImage {
    id: number;
    imageName: string;
}

export interface IData {
    id: number;
    name: string;
    description: string;
    isCompleted: boolean;
    images: IImage[];
}

const api = "https://to-dos-api.softclub.tj/api/to-dos";

export const dataAtom = atom<IData[]>([]);

// GET

export const getDataAtom = atom(
    null,
    async (get, set) => {
        const { data } = await axios.get(api);
        set(dataAtom, data.data);
    }
);

// ADD

export const addDataAtom = atom(
    null,
    async (get, set, newTodo) => {
        await axios.post(api, newTodo);

        const { data } = await axios.get(api);
        set(dataAtom, data.data);
    }
);

// EDIT

export const editDataAtom = atom(
    null,
    async (get, set, updatedTodo) => {
        await axios.put(api, updatedTodo);

        const { data } = await axios.get(api);
        set(dataAtom, data.data);
    }
);

// DELETE

export const deleteDataAtom = atom(
    null,
    async (get, set, id) => {
        await axios.delete(api + "?id=" + id);

        const { data } = await axios.get(api);
        set(dataAtom, data.data);
    }
);
