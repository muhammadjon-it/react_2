import { useState } from 'react'
import type { AppStore } from '../redux/store'
import { addUser, deleteUser, editUser } from '../redux/counter'
import { useDispatch, useSelector } from 'react-redux'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

const Home = () => {
    const { data } = useSelector((store: AppStore) => store.counter)
    const dispatch = useDispatch()
    const [addOpen, setAddOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const [editedUser, setEditUser] = useState({
        id: 0,
        name: "",
        phone: "",
        city: ""
    })

    const handleAdd = (e) => {
        e.preventDefault()

        const newUser = {
            id: Date.now(),
            name: e.target.name.value,
            phone: e.target.phone.value,
            city: e.target.city.value,
        }

        dispatch(addUser(newUser))
        e.target.reset()
        setAddOpen(false)
    }

    const handleEditUser = (e) => {
        e.preventDefault()

        const updatedUser = {
            id: editedUser.id,
            name: editedUser.name,
            phone: editedUser.phone,
            city: editedUser.city,
        }

        dispatch(editUser(updatedUser))
        setEditOpen(false)
        setEditUser({
            id: 0,
            name: "",
            phone: "",
            city: ""
        })

    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <h1 className="text-2xl font-bold text-slate-800">Users</h1>
                <Dialog open={addOpen} onOpenChange={setAddOpen}>
                    <DialogTrigger className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700 shadow-sm">
                        Add +
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] rounded-2xl">
                        <DialogHeader>
                            <DialogTitle className="text-lg font-bold text-slate-800">Add New User</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleAdd} className="flex flex-col gap-4 mt-2">
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your name...."
                                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                            />
                            <input
                                type="text"
                                name="phone"
                                placeholder="Enter your phone..."
                                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                            />
                            <input
                                type="text"
                                name="city"
                                placeholder="Enter your city..."
                                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                            />
                            <button
                                type="submit"
                                className="cursor-pointer rounded-xl bg-blue-600 mt-2 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-95"
                            >
                                Save
                            </button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                <Table>
                    <TableCaption className="pb-4 text-xs text-slate-400">A list of your recent invoices.</TableCaption>
                    <TableHeader className="bg-slate-50">
                        <TableRow>
                            <TableHead className="font-semibold text-slate-700 py-3">Name</TableHead>
                            <TableHead className="font-semibold text-slate-700 py-3">Phone</TableHead>
                            <TableHead className="font-semibold text-slate-700 py-3">City</TableHead>
                            <TableHead className="font-semibold text-slate-700 py-3 text-right pr-6">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((el) => {
                            return (
                                <TableRow key={el.id} className="hover:bg-slate-50/50 transition">
                                    <TableCell className="font-medium text-slate-900 py-3.5">{el.name}</TableCell>
                                    <TableCell className="text-slate-600 py-3.5">{el.phone}</TableCell>
                                    <TableCell className="text-slate-600 py-3.5">{el.city}</TableCell>
                                    <TableCell className="py-3.5 pr-6">
                                        <div className="flex items-center justify-end gap-2">
                                            <Dialog open={editOpen} onOpenChange={setEditOpen}>
                                                <DialogTrigger
                                                    onClick={() => setEditUser(el)}
                                                    className="cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 shadow-sm"
                                                >
                                                    edit
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[425px] rounded-2xl">
                                                    <DialogHeader>
                                                        <DialogTitle className="text-lg font-bold text-slate-800">Edit User</DialogTitle>
                                                    </DialogHeader>
                                                    <form onSubmit={handleEditUser} className="flex flex-col gap-4 mt-2">
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            placeholder="Enter your name...."
                                                            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                                                            value={editedUser.name}
                                                            onChange={(e) => setEditUser({ ...editedUser, name: e.target.value })}
                                                        />
                                                        <input
                                                            type="text"
                                                            name="phone"
                                                            placeholder="Enter your phone..."
                                                            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                                                            value={editedUser.phone}
                                                            onChange={(e) => setEditUser({ ...editedUser, phone: e.target.value })}
                                                        />
                                                        <input
                                                            type="text"
                                                            name="city"
                                                            placeholder="Enter your city..."
                                                            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                                                            value={editedUser.city}
                                                            onChange={(e) => setEditUser({ ...editedUser, city: e.target.value })}
                                                        />
                                                        <button
                                                            type="submit"
                                                            className="cursor-pointer rounded-xl bg-blue-600 mt-2 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-95"
                                                        >
                                                            Save
                                                        </button>
                                                    </form>
                                                </DialogContent>
                                            </Dialog>
                                            <button
                                                onClick={() => dispatch(deleteUser(el.id))}
                                                className="cursor-pointer rounded-lg bg-red-50 text-red-600 px-3 py-1.5 text-xs font-semibold transition hover:bg-red-100 hover:text-red-700"
                                            >
                                                delete
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>

    )
}

export default Home