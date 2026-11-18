
import { useAtom, useSetAtom } from "jotai";
import { useEffect, useState } from "react";

import {
    dataAtom,
    getDataAtom,
    addDataAtom,
    deleteDataAtom,
    editDataAtom,
    type IData
} from "./Todo";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const JotaiAsinc = () => {
    const [data] = useAtom(dataAtom);

    const getData = useSetAtom(getDataAtom);
    const addUser = useSetAtom(addDataAtom);
    const deleteUser = useSetAtom(deleteDataAtom);
    const editUser = useSetAtom(editDataAtom);

    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [editedUser, setEditedUser] = useState<IData | null>(null);

    useEffect(() => {
        getData();
    }, []);

    // ADD

    const handleAdd = (e) => {

        e.preventDefault();

        const formData = new FormData();

        formData.append("Name", e.target.name.value);
        formData.append("Description", e.target.description.value);
        formData.append("Images", e.target.image.files[0]);

        addUser(formData);
        setAddOpen(false);
    };

    // EDIT
    
    const handleEdit = (e) => {
        e.preventDefault();

        const updatedTodo = { ...editedUser, name: e.target.name.value, description: e.target.description.value };

        editUser(updatedTodo);

        setEditOpen(false);
        setEditedUser(null);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <h1 className="text-2xl font-bold text-slate-800">
                    ToDo
                </h1>

                <Dialog open={addOpen} onOpenChange={setAddOpen}>
                    <DialogTrigger asChild>
                        <button className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700 shadow-sm">
                            Add +
                        </button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[425px] rounded-2xl">
                        <DialogHeader>
                            <DialogTitle className="text-lg font-bold text-slate-800">
                                Add New Todo
                            </DialogTitle>
                        </DialogHeader>

                        <form onSubmit={handleAdd} className="flex flex-col gap-4 mt-2">
                            <input
                                type="file"
                                name="image"
                                required
                                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-blue-500"

                            />
                            <input
                                name="name"
                                placeholder="Enter your name...."
                                required
                                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-blue-500"

                            />

                            <input
                                name="description"
                                placeholder="Enter your description..."
                                required
                                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                            />

                            <button
                                type="submit"
                                className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                            >
                                Save
                            </button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                <Table>
                    <TableCaption className="pb-4 text-xs text-slate-400">
                        A list of your todos.
                    </TableCaption>

                    <TableHeader className="bg-slate-50">
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right pr-6">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data.map((el) => (
                            <TableRow key={el.id} className="hover:bg-slate-50/50">
                                <TableCell className="font-medium">
                                    {el.name}
                                </TableCell>

                                <TableCell>{el.description}</TableCell>

                                <TableCell className="pr-6">
                                    <div className="flex justify-end gap-2">

                                        <Dialog open={editOpen && editedUser?.id == el.id} onOpenChange={setEditOpen}>
                                            <DialogTrigger>
                                                <button onClick={() => setEditedUser(el)}
                                                    className="rounded-lg border px-3 py-1.5 text-xs font-semibold hover:bg-slate-50">
                                                    Edit
                                                </button>
                                            </DialogTrigger>

                                            <DialogContent className="sm:max-w-[425px] rounded-2xl">
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Edit Todo
                                                    </DialogTitle>
                                                </DialogHeader>

                                                <form
                                                    onSubmit={handleEdit}
                                                    className="flex flex-col gap-4 mt-2"
                                                >
                                                    <input
                                                        name="name"
                                                        defaultValue={editedUser?.name}
                                                        required
                                                        className="rounded-xl border px-4 py-2.5 text-sm"
                                                    />

                                                    <input
                                                        name="description"
                                                        defaultValue={editedUser?.description}
                                                        required
                                                        className="rounded-xl border px-4 py-2.5 text-sm"
                                                    />

                                                    <button
                                                        type="submit"
                                                        className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white"
                                                    >
                                                        Save Changes
                                                    </button>
                                                </form>
                                            </DialogContent>
                                        </Dialog>

                                        <button
                                            onClick={() => deleteUser(el.id)}
                                            className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100"
                                        >
                                            Delete
                                        </button>

                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )

};

export default JotaiAsinc;
