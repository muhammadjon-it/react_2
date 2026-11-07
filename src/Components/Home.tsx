import React, { useState } from 'react'
import type { IData } from '../Components/Todo'
import { useTodo } from '../Components/Todo'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog"

interface IDataAdd {
    name: string,
    number: number,
    job: string,
    city: string,
    status: boolean,
}

const Home = () => {
    const { data, delUser, editedUser, AddedUser } = useTodo()
    const [editUser, setEditUser] = useState<IData | null>(null)
    const [editOpen, setEditOpen] = useState(false)
    const [addOpen, setAddOpen] = useState(false)
    const [addUser, setAddUser] = useState<IDataAdd | null>(null)



    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                    Users
                </h1>

                <Dialog open={addOpen} onOpenChange={setAddOpen}>
                    <DialogTrigger
                        className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors">
                        <span>+</span>
                        <span>Add User</span>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[425px] rounded-2xl p-6 bg-white shadow-xl border border-slate-100">
                        <DialogHeader className="space-y-1.5 text-left">
                            <DialogTitle className="text-xl font-semibold text-slate-900">
                                Add New User
                            </DialogTitle>
                        </DialogHeader>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                AddedUser(
                                    addUser?.name,
                                    addUser?.number,
                                    addUser?.job,
                                    addUser?.city,
                                    addUser?.status
                                );
                                setAddUser(null);
                                setAddOpen(false);
                            }}
                            className="mt-4 flex flex-col gap-4"
                        >
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-slate-700">Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter full name..."
                                    value={addUser?.name}
                                    onChange={(e) => setAddUser({ ...addUser, name: e.target.value })}
                                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-slate-700">
                                    Phone Number
                                </label>
                                <input
                                    type="number"
                                    required
                                    placeholder="Enter phone number..."
                                    value={addUser?.number}
                                    onChange={(e) =>
                                        setAddUser({ ...addUser, number: e.target.value })
                                    }
                                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-slate-700">Job</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Your Job"
                                        value={addUser?.job}
                                        onChange={(e) => setAddUser({ ...addUser, job: e.target.value })}
                                        className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                                    />
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-slate-700">City</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Your City"
                                        value={addUser?.city}
                                        onChange={(e) => setAddUser({ ...addUser, city: e.target.value })}
                                        className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-slate-700">Status</label>
                                <select
                                    value={addUser?.status ? "true" : "false"}
                                    onChange={(e) =>
                                        setAddUser({ ...addUser, status: e.target.value === "true" })
                                    }
                                    className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                                >
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </select>
                            </div>

                            <div className="mt-4 flex items-center justify-end gap-2.5 border-t border-slate-100 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setAddOpen(false)}
                                    className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-colors"
                                >
                                    Add User
                                </button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                <Table>
                    <TableCaption className="pb-4 text-slate-500">
                        A list of your recent invoices.
                    </TableCaption>

                    <TableHeader className="bg-slate-50/80">
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="font-semibold text-slate-700 py-3.5">Name</TableHead>
                            <TableHead className="font-semibold text-slate-700">Phone Number</TableHead>
                            <TableHead className="font-semibold text-slate-700">Job</TableHead>
                            <TableHead className="font-semibold text-slate-700">City</TableHead>
                            <TableHead className="font-semibold text-slate-700">Status</TableHead>
                            <TableHead className="text-right font-semibold text-slate-700 pr-6">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data.map((el) => (
                            <TableRow
                                key={el.id}
                                className="transition-colors hover:bg-slate-50/80 border-b border-slate-100 last:border-none"
                            >
                                <TableCell className="font-medium text-slate-900 py-4">
                                    {el.name}
                                </TableCell>

                                <TableCell className="text-slate-600">{el.number}</TableCell>
                                <TableCell className="text-slate-600">{el.job}</TableCell>
                                <TableCell className="text-slate-600">{el.city}</TableCell>

                                <TableCell>
                                    <span
                                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${el.status
                                            ? "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20"
                                            : "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-600/20"
                                            }`}>
                                        {el.status ? "Active" : "Inactive"}
                                    </span>
                                </TableCell>

                                <TableCell className="text-right pr-6">
                                    <div className="flex items-center justify-end gap-2">

                                        <button
                                            onClick={() => delUser(el.id)}
                                            className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                                        >
                                            Delete
                                        </button>
                                        <button
                                        >

                                        </button>

                                        <Dialog open={editOpen} onOpenChange={setEditOpen}>
                                            <DialogTrigger
                                                onClick={() => setEditUser(el)}
                                                className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
                                            >
                                                Edit
                                            </DialogTrigger>

                                            <DialogContent className="sm:max-w-[425px] rounded-2xl p-6 bg-white shadow-xl border border-slate-100">
                                                <DialogHeader className="space-y-1.5 text-left">
                                                    <DialogTitle className="text-xl font-semibold text-slate-900">
                                                        Edit User
                                                    </DialogTitle>

                                                </DialogHeader>

                                                <form
                                                    onSubmit={(e) => {
                                                        e.preventDefault();
                                                        editedUser(
                                                            editUser?.id,
                                                            editUser?.name,
                                                            editUser?.number,
                                                            editUser?.job,
                                                            editUser?.city,
                                                            editUser?.status
                                                        );
                                                        setEditUser(null);
                                                        setEditOpen(false);
                                                    }}
                                                    className="mt-4 flex flex-col gap-4"
                                                >
                                                    <div className="flex flex-col gap-1.5">
                                                        <label className="text-sm font-medium text-slate-700">Name</label>
                                                        <input
                                                            type="text"
                                                            required
                                                            placeholder="Enter full name..."
                                                            value={editUser?.name}
                                                            onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                                                            className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                                                        />
                                                    </div>

                                                    <div className="flex flex-col gap-1.5">
                                                        <label className="text-sm font-medium text-slate-700">
                                                            Phone Number
                                                        </label>
                                                        <input
                                                            type="tel"
                                                            required
                                                            placeholder="Enter phone number..."
                                                            value={editUser?.number}
                                                            onChange={(e) =>
                                                                setEditUser({ ...editUser, number: e.target.value })
                                                            }
                                                            className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                                                        />
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-3">
                                                        <div className="flex flex-col gap-1.5">
                                                            <label className="text-sm font-medium text-slate-700">Job</label>
                                                            <input
                                                                type="text"
                                                                required
                                                                placeholder="Your Job"
                                                                value={editUser?.job}
                                                                onChange={(e) => setEditUser({ ...editUser, job: e.target.value })}
                                                                className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                                                            />
                                                        </div>

                                                        <div className="flex flex-col gap-1.5">
                                                            <label className="text-sm font-medium text-slate-700">City</label>
                                                            <input
                                                                type="text"
                                                                required
                                                                placeholder="Your City"
                                                                value={editUser?.city}
                                                                onChange={(e) => setEditUser({ ...editUser, city: e.target.value })}
                                                                className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col gap-1.5">
                                                        <label className="text-sm font-medium text-slate-700">Status</label>
                                                        <select
                                                            value={editUser?.status ? "true" : "false"}
                                                            onChange={(e) =>
                                                                setEditUser({ ...editUser, status: e.target.value === "true" })
                                                            }
                                                            className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                                                        >
                                                            <option value="true">Active</option>
                                                            <option value="false">Inactive</option>
                                                        </select>
                                                    </div>

                                                    <div className="mt-4 flex items-center justify-end gap-2.5 border-t border-slate-100 pt-4">
                                                        <button
                                                            type="button"
                                                            onClick={() => setEditOpen(false)}
                                                            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-colors"
                                                        >
                                                            Save Changes
                                                        </button>
                                                    </div>
                                                </form>
                                            </DialogContent>
                                        </Dialog>

                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}

export default Home