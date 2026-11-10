import { createSlice } from '@reduxjs/toolkit'
export interface IData {
    id: number
    name: string
    city: string
    phone: string
}
export interface CounterState {
    value: number
    data: IData[]
}

const initialState: CounterState = {
    value: 100,
    data: [
        {
            name: "Jese Leos",
            phone: "1-503-803-6334 x5725",
            city: "Spinkaburgh",
            id: 1
        },
        {
            name: "Bonnie Green",
            phone: "920-689-7626 x03008",
            city: "Fort Pierce",
            id: 2
        },
        {
            name: "Toby Durgan",
            phone: "(988) 574-3542 x2249",
            city: "South Wallace",
            id: 3
        },
        {
            name: "Rosa Shanahan",
            phone: "1-699-290-1339 x1071",
            city: "East Desireeberg",
            id: 4
        },
        {
            name: "Pirov",
            phone: "256-844-6091 x54619",
            city: "South Stellaburgh",
            id: 5
        },
        {
            name: "Muhammadjon",
            phone: "827-892-1970 x746",
            city: "Mayaguez",
            id: 6
        },
        {
            name: "Janice McLaughlin Jr.",
            phone: "653.729.8810 x9611",
            city: "Keeblerton",
            id: 7
        },
        {
            name: "Wilfred Carroll",
            phone: "664.505.4454 x548",
            city: "Simonisport",
            id: 8
        },
        {
            name: "Tommy Fadel",
            phone: "(325) 979-1447 x8442",
            city: "Modesto",
            id: 9
        }
    ]
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        deleteUser: (state, { payload: id }) => {
            state.data = state.data.filter((e) => e.id != id)
        },
        addUser: (state, { payload: newUser }) => {
            state.data = [...state.data, newUser]
        },
        editUser: (state, { payload: newUser }) => {
            state.data = state.data.map((e) => e.id == newUser.id ? newUser : e)
        }
    }
})

export const { deleteUser, addUser, editUser } = counterSlice.actions


export default counterSlice.reducer