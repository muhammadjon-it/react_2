import { create } from "zustand";

export interface IData {
    id: number,
    name: string,
    number: number,
    job: string,
    city: string,
    status: boolean,
}
interface TodoState {
    data: IData[],
    delUser: (id: number) => void
    editedUser: (id: number, name: string, number: number, job: string, city: string, status: boolean) => void
    AddedUser: (name: string, number: number, job: string, city: string, status: boolean) => void

}

export const useTodo = create<TodoState>((set) => ({
    data: [
        {
            id: 1,
            name: "Abdullo",
            number: 207551441,
            job: "Student",
            city: "Kulob",
            status: true,
        }, {
            id: 2,
            name: "Ahmad",
            number: 123432525,
            job: "Programer",
            city: "Khujand",
            status: false,
        }, {
            id: 3,
            name: "Ali",
            number: 132212525,
            job: "Fireman",
            city: "Bokhtar",
            status: true,
        }, {
            id: 4,
            name: "Lola",
            number: 878767525,
            job: "Farmer",
            city: "Teacher",
            status: false,
        }
    ],

    delUser: (id) => set((state) => ({ data: state.data.filter((el) => el.id != id) })),

    editedUser: (id, name, number, job, city, status) => set((state) => ({ data: state.data.map((el) => el.id == id ? { ...el, name: name, number: number, job: job, city: city, status: status } : el) })),

    AddedUser: (name, number, job, city, status) => set((state) => ({ data: [...state.data, { id: Date.now(), name: name, number: number, job: job, city: city, status: status }] }))

}))