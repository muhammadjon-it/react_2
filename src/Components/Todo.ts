import { Axis3DIcon } from "lucide-react";
import { create } from "zustand";
import axios from "axios";

interface IImage {
    id: number,
    imageName: string,
}
export interface IData {

    id: number,
    isCompleted: boolean,
    "images": IImage[],
    name: string,
    description: string
}

const api = "https://to-dos-api.softclub.tj/api/to-dos"
interface TodoState {
    data: IData[],
    getData: () => void
    delteData: (id: number) => void
    addData: (newUser: object)=>void
    editData: (newUser: object)=>void

}

export const useTodo = create<TodoState>((set, get) => ({
    data: [],
    getData: async () => {
        try {
            const { data } = await axios.get(api)
            set(() => ({ data: data.data }))
        } catch (error) {
            console.error(error)
        }
    },

    delteData: async (id) => {
        try {
            await axios.delete(api + "?id=" + id)
            get().getData()
        } catch (error) {
            console.error(error)
        }
    },

    addData: async (newUser) => {
        try {
            await axios.post(api, newUser)
            get().getData()
        } catch (error) {
            console.error(error)
        }
    },

    editData: async (newUser) => {
        try {
            await axios.put(api, newUser)
            get().getData()
        } catch (error) {
            console.error(error)
        }
    },


}))