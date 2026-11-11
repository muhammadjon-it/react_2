import { createSlice } from '@reduxjs/toolkit'
export interface IData {
    id: number
    name: string

}
export interface CounterState {
    data: IData[]
}

const initialState: CounterState = {
    data: [
        { name: "Jese Leos", id: 1 },
        { name: "Bonnie Green", id: 2 },
        { name: "Toby Durgan", id: 3 },
        { name: "Rosa Shanahan", id: 4 },
        { name: "Pirov", id: 5 },

    ]
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {

        deleteUsers: (state, {payload})=>{
            state.data=state.data.filter((el)=>el.id!=payload)
        }
       
    }
})

export const {deleteUsers} = counterSlice.actions
export default counterSlice.reducer