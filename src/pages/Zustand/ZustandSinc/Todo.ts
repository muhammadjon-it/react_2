import { create } from 'zustand'

export interface IData {
    name: string,
    phone: string,
    city: string,
    email: string,
    status: boolean,
    id: number,
}

export interface ITodo {
    data: IData[],
    delUser: (id: number) => void
    addUser: (user: IData) => void
    editedUser: (user: IData) => void
    checkbox: (id: number) => void
}

export const useData = create<ITodo>((set) => ({
    data: [
        {
            name: "Carroll Collins",
            phone: "404-226-2284 x5648",
            city: "East Marcelle",
            email: "Torey.Kulas@gmail.com",
            status: false,
            id: 1
        },
        {
            name: "John Anderson",
            phone: "202-555-0145",
            city: "New York",
            email: "john.anderson@gmail.com",
            status: true,
            id: 2
        },
        {
            name: "Sophia Martinez",
            phone: "305-555-0198",
            city: "Miami",
            email: "sophia.martinez@gmail.com",
            status: true,
            id: 3
        },
        {
            name: "Michael Brown",
            phone: "415-555-0123",
            city: "San Francisco",
            email: "michael.brown@gmail.com",
            status: false,
            id: 4
        },
        {
            name: "Emma Wilson",
            phone: "212-555-0176",
            city: "Chicago",
            email: "emma.wilson@gmail.com",
            status: true,
            id: 5
        },
        {
            name: "Daniel Taylor",
            phone: "617-555-0189",
            city: "Boston",
            email: "daniel.taylor@gmail.com",
            status: false,
            id: 6
        },
        {
            name: "Olivia Johnson",
            phone: "702-555-0164",
            city: "Las Vegas",
            email: "olivia.johnson@gmail.com",
            status: true,
            id: 7
        }
    ],
    delUser: (id) => set((state) => ({ data: state.data.filter((el) => el.id != id) })),
    addUser: (user) => set((state) => ({ data: [...state.data, user] })),
    editedUser: (user) => set((state) => ({ data: state.data.map((el) => el.id == user.id ? { ...el, ...user } : el) })),
     checkbox: (id) => set((state) => ({ data: state.data.map((el) => el.id == id ? { ...el, status: !el.status } : el) }))
}))