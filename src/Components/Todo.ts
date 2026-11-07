import { create } from "zustand";

export interface IData {
    id: number,
    name: string,
    job: string
}
interface TodoState {
    data: IData[],
    count: number,
    increment: () => void,
    deleteTodo: (id: number) => void
    AddUser: (name: string, job: string) => void;
    updateTodo: (id: number, name: string, job: string) => void;
}

export const useTodo = create<TodoState>((set) => ({
    data: [{ id: 1, name: "Abdullo", job: "Student" }, { id: 2, name: "Muhammd", job: "Farmer" }],
    count: 0,
    
    increment: () => set((state) => ({ count: state.count + 1 })),

    deleteTodo: (id) => set((state) => ({ data: state.data.filter((el) => el.id !== id) })),

    AddUser: (name, job) => set((state) => ({ data: [...state.data, { id: Date.now(), name: name, job: job }] })),

    updateTodo: (id, name, job) => set((state) => ({ data: state.data.map((el) => el.id === id ? { ...el, name: name, job: job } : el) }))
}))