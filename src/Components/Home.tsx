import React, { useEffect, useState } from 'react'
import { useTodo } from '../Components/Todo'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

const Home = () => {
    const { data, getData, delteData, addData, editData } = useTodo()
    const [editOpen, setEditOpen] = useState(false)
    const [user, setUser] = useState({
        name: "",
        description: "",
        images: null
    })
    const [editUser, setEditUser] = useState({
        id: 0,
        name: "",
        description: "",
    })

    const handleAdd = (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append("name", user.name)
        formData.append("description", user.description)
        formData.append("images", user.images)



        addData(formData)
        e.target.reset()
        setUser({
            name: "",
            description: "",
            images: null
        })
    }

    const handlEdit = (e) => {
        e.preventDefault()

        const newUSer = {
            id: editUser.id,
            name: editUser.name,
            description: editUser.description,
        }

        editData(newUSer)
        setEditOpen(false)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="min-h-screen bg-slate-100 p-8">
            <div className="mx-auto max-w-4xl">
                <div className="mb-8 flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
                    <h2 className="text-2xl font-bold text-slate-800">
                        Users
                    </h2>
                    <form
                        onSubmit={handleAdd}
                        className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <input
                            type="file"
                            accept="image/*"
                            required
                            className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 w-31"
                            onChange={(e) => setUser({ ...user, images: e.target.files?.[0] })}
                        />
                        <input
                            type="text"
                            placeholder="Enter your full name..."
                            required
                            className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                            value={user.name}
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Enter your job..."
                            required
                            className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                            value={user.description}
                            onChange={(e) => setUser({ ...user, description: e.target.value })}
                        />
                        <button
                            type="submit"
                            className="cursor-pointer rounded-xl bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 active:scale-95"
                        >
                            Save
                        </button>
                    </form>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    {data.map((el) => (
                        <div
                            key={el.id}
                            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                        >
                            <div>
                                <h1 className="text-lg font-semibold text-slate-800">
                                    {el.name}
                                </h1>

                                <p className="mt-1 text-sm text-slate-500">
                                    {el.description}
                                </p>
                            </div>

                            <div className="mt-4 flex gap-2 border-t border-slate-100 pt-3">
                                <button
                                    onClick={() => delteData(el.id)}
                                    className="cursor-pointer rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100"
                                >
                                    Delete
                                </button>
                                <Dialog open={editOpen} onOpenChange={setEditOpen}>
                                    <DialogTrigger
                                    onClick={()=>setEditUser(el)}
                                        className="cursor-pointer rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-200">Edit</DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Edit User</DialogTitle>
                                            <DialogDescription>
                                                <form
                                                onSubmit={handlEdit}
                                                    className='flex flex-col w-full  gap-4'
                                                >
                                                    <input
                                                        type="text"
                                                        className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                                                        placeholder="Enter your full name..."
                                                        required
                                                        value={editUser.name}
                                                        onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                                                    />
                                                    <input
                                                        type="text"
                                                        className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                                                        placeholder="Enter your job..."
                                                        required
                                                        value={editUser.description}
                                                        onChange={(e) => setEditUser({ ...editUser, description: e.target.value })}
                                                    />


                                                    <button
                                                        type='submit'
                                                        className="cursor-pointer rounded-xl bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 active:scale-95">
                                                        Save
                                                    </button>

                                                </form>
                                            </DialogDescription>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home