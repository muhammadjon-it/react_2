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

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

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
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="mx-auto max-w-4xl">
                <div className="mb-8 flex flex-col justify-between gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">Users</h2>
                    </div>
                    <Dialog>
                        <DialogTrigger className="cursor-pointer rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-95 flex items-center gap-2">
                            <span className="text-base">+</span> Add User
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] rounded-2xl">
                            <DialogHeader>
                                <DialogTitle className="text-xl font-bold text-slate-900">Add New User</DialogTitle>
                              
                            </DialogHeader>
                            <form onSubmit={handleAdd} className="flex flex-col gap-4 mt-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-slate-600 px-1">Profile Image</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        required
                                        className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                                        onChange={(e) => setUser({ ...user, images: e.target.files?.[0] })}
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-slate-600 px-1">Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter full name..."
                                        required
                                        className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                                        value={user.name}
                                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-slate-600 px-1">Descriptoin Job</label>
                                    <input
                                        type="text"
                                        placeholder="Enter job title..."
                                        required
                                        className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                                        value={user.description}
                                        onChange={(e) => setUser({ ...user, description: e.target.value })}
                                    />
                                </div>
                                <button type="submit" className="cursor-pointer rounded-xl bg-blue-600 mt-2 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-95">
                                    Save User
                                </button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                    <Table className="w-full">
                        <TableCaption className="py-4 text-xs text-slate-400 border-t border-slate-50">A list of your current active users.</TableCaption>
                        <TableHeader className="bg-slate-50/70">
                            <TableRow>
                                <TableHead className="font-semibold text-slate-700 h-11 px-6">Name</TableHead>
                                <TableHead className="font-semibold text-slate-700 h-11 px-6">Description</TableHead>
                                <TableHead className="font-semibold text-slate-700 h-11 px-6 text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((el) => {
                                return (
                                    <TableRow key={el.id} className="hover:bg-slate-50/50 transition-colors border-b border-slate-100 last:border-0">
                                        <TableCell className="px-6 py-4 font-medium text-slate-900">
                                            <div className="flex items-center gap-3">
                                               
                                                <span>{el.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-6 py-4 text-slate-600">{el.description}</TableCell>
                                        <TableCell className="px-6 py-4 text-right">
                                            <div className="flex gap-2.5 justify-end items-center">
                                                <Dialog open={editOpen} onOpenChange={setEditOpen}>
                                                    <DialogTrigger onClick={() => setEditUser(el)} className="cursor-pointer rounded-lg bg-slate-50 border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900">
                                                        Edit
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[425px] rounded-2xl">
                                                        <DialogHeader>
                                                            <DialogTitle className="text-xl font-bold text-slate-900">Edit User </DialogTitle>
                                                            
                                                        </DialogHeader>
                                                        <form onSubmit={handlEdit} className='flex flex-col w-full gap-4 mt-4'>
                                                            <div className="flex flex-col gap-1.5">
                                                                <label className="text-xs font-semibold text-slate-600 px-1">Full Name</label>
                                                                <input
                                                                    type="text"
                                                                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                                                                    placeholder="Enter full name..."
                                                                    required
                                                                    value={editUser.name}
                                                                    onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                                                                />
                                                            </div>
                                                            <div className="flex flex-col gap-1.5">
                                                                <label className="text-xs font-semibold text-slate-600 px-1">Descriptoin Job</label>
                                                                <input
                                                                    type="text"
                                                                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                                                                    placeholder="Enter job title..."
                                                                    required
                                                                    value={editUser.description}
                                                                    onChange={(e) => setEditUser({ ...editUser, description: e.target.value })}
                                                                />
                                                            </div>
                                                            <button type='submit' className="cursor-pointer rounded-xl bg-blue-600 mt-2 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-95">
                                                                Save 
                                                            </button>
                                                        </form>
                                                    </DialogContent>
                                                </Dialog>
                                                <button onClick={() => delteData(el.id)} className="cursor-pointer rounded-lg bg-rose-50 border border-rose-100 px-3 py-1.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-100 hover:text-rose-700">
                                                    Delete
                                                </button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>

    )
}

export default Home