
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import axios from 'axios'

const api = "https://6aaa297aff4dd5698b4e152a.mockapi.io/Todo_List"

export interface IData {
    id: number
    name: string
    phone: string
    city: string
}

export interface CounterState {
    value: number
    data: IData[]
    isLoading: boolean
    error: string | null
}

const initialState: CounterState = {
    value: 0,
    data: [],
    isLoading: false,
    error: null
}

// GET
export const getData = createAsyncThunk("todo/getData",
    async () => {
        try {
            const { data } = await axios.get(api)
            return data
        }
        catch (error) {
            console.error(error);
        }
    }
)


// DELETE
export const deleteData = createAsyncThunk("todo/deleteData",
    async (id, { dispatch }) => {
        try {
            await axios.delete(`${api}/${id}`)
            dispatch(getData())
        } catch (error) {
            console.error(error);
        }
    }
)

//ADD

export const addData = createAsyncThunk("todo/addData",
    async (newUser, { dispatch }) => {
        try {
            await axios.post(api, newUser)
            dispatch(getData())
        } catch (error) {
            console.error(error);
        }
    }
)

// EDIT 

export const editData = createAsyncThunk("todo/editData",
    async (newUser, { dispatch }) => {
        try {
            await axios.post(api, newUser)
            dispatch(getData())
        } catch (error) {
            console.error(error);
        }
    }
)

// SLICE
export const counterSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder

            // GET PENDING
            .addCase(getData.pending, (state) => {
                state.isLoading = true
                state.error = null
            })

            // GET FULFILLED
            .addCase(getData.fulfilled, (state, action) => {
                state.isLoading = false
                state.data = action.payload
            })

            // GET REJECTED
            .addCase(getData.rejected, (state) => {
                state.isLoading = false
            })

            // DELETE PENDING
            .addCase(deleteData.pending, (state) => {
                state.isLoading = true
                state.error = null
            })

            // ADD PENDING
            .addCase(addData.pending, (state) => {
                state.isLoading = true
                state.error = null
            })

            // ADD FULFILLED
            .addCase(addData.fulfilled, (state, action) => {
                state.isLoading = false
            })

            // ADD REJECTED
            .addCase(addData.rejected, (state) => {
                state.isLoading = false
            })

        }
})

export const selectCount = (state: RootState) => state.counter.value

export default counterSlice.reducer
