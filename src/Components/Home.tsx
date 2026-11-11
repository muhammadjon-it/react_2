
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getData, deleteData, addData } from '../redux/counter'
import type { AppDispatch, RootState } from '../../app/store'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

const Home = () => {
    const [newUser, setNewUser] = useState({
        name: "",
        phone: "",
        city: ""
    })
    const dispatch = useDispatch<AppDispatch>()

    const { data, isLoading, error } = useSelector(
        (state: RootState) => state.counter
    )

    useEffect(() => {
        dispatch(getData())
    }, [dispatch])

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    const handleAdd = (e) => {
        e.preventDefault()

        dispatch(addData(newUser))
    }

    return (
        <>
            <div>
                <h1>Users</h1>
                <Dialog>
                    <DialogTrigger>Open</DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>+ Add Users</DialogTitle>
                        </DialogHeader>
                        <form
                        onSubmit={handleAdd} 
                        className='flex flex-col gap-3'>
                            <input
                                placeholder="Name"
                                value={newUser.name}
                                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                            />

                            <input
                                placeholder="Phone"
                                value={newUser.phone}
                                onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                            />

                            <input
                                placeholder="City"
                                value={newUser.city}
                                onChange={(e) => setNewUser({ ...newUser, city: e.target.value })}
                            />
                            <button type='onsubmit'>Save</button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <div className='flex flex-wrap'>
                {
                    data.map((el) => {
                        return (
                            <div
                                key={el.id}
                                className='border-2 border-black rounded-2xl px-4 m-3'
                            >
                                <h1>{el.name}</h1>
                                <p>{el.phone}</p>
                                <p>{el.city}</p>

                                <div className='flex gap-3'>
                                    <button
                                        onClick={() => dispatch(deleteData(el.id))}
                                    >
                                        Delete
                                    </button>

                                    <button>
                                        Edit
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Home
