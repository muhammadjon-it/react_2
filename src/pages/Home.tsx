import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTodos, addTodo, editTodo, deleteTodo, } from "../API/Todo";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";

const Home = () => {

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["todos"],
        queryFn: getTodos,
    });

    const queryClient = useQueryClient();

    const [editUser, setEditUser] = useState({ id: 0, name: "", description: "" })

    const [dialogEdit, setDialogEdit] = useState(false)

    const deleteMutation = useMutation({
        mutationFn: deleteTodo,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["todos"],
            });
        },
    });

    const addMutation = useMutation({
        mutationFn: addTodo,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["todos"],
            });
        },
    });

    const editMutation = useMutation({
        mutationFn: editTodo,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["todos"],
            });
        },
    });


    const handleAdd = (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append("Name", e.target.name.value)
        formData.append("Description", e.target.name.value)

        const files = e.target.Images.files

        for (let i = 0; i < files.length; i++) {

            formData.append("Images", files[i]);
        }

        addMutation.mutate(formData);
          e.target.reset()
    }

    const handleEdit = (e) => {
        e.preventDefault()

        editMutation.mutate({
            id: editUser.id,
            name: e.target.name.value,
            description: e.target.description.value
        })
        setDialogEdit(false)
        setEditUser({ id: 0, name: "", description: "" })
    }

    if (isLoading) return <h2>Loading...</h2>;

    if (isError) return <h2>{error.message}</h2>;

    return (

        <div className="min-h-screen bg-slate-50 px-4 py-12">
            <div className="mx-auto max-w-2xl">

                <h1 className="mb-8 text-3xl font-bold tracking-tight text-slate-900">
                    Todo List
                </h1>

                <div className="mb-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <form onSubmit={handleAdd} className="space-y-3">

                        <input
                            type="text"
                            name="name"
                            placeholder="Todo name"
                            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />

                        <input
                            type="text"
                            name="description"
                            placeholder="Description"
                            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />

                        <input
                            type="file"
                            name="Images"
                            multiple
                            accept="image/*"
                            className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-500 file:mr-3 file:rounded-md file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-blue-600"
                        />

                        <button
                            type="submit"
                            className="w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
                        >
                            Save
                        </button>
                    </form>
                </div>

                <div className="space-y-3">
                    {data.map((el) => {
                        return (
                            <div
                                key={el.id}
                                className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                            >
                                <div className="min-w-0">
                                    <h2 className="mb-1 text-lg font-semibold text-slate-800">
                                        {el.name}
                                    </h2>

                                    <p className="text-sm leading-6 text-slate-500">
                                        {el.description}
                                    </p>
                                </div>

                                <div className="flex shrink-0 items-center gap-2">
                                    <Dialog
                                        open={dialogEdit}
                                        onOpenChange={setDialogEdit}
                                    >
                                        <DialogTrigger
                                            onClick={() => setEditUser(el)}
                                            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
                                        >
                                            Edit
                                        </DialogTrigger>

                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>
                                                    Edit User
                                                </DialogTitle>
                                            </DialogHeader>

                                            <form onSubmit={handleEdit} className="space-y-4">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    placeholder="Todo name"
                                                    defaultValue={editUser.name}
                                                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                                />

                                                <input
                                                    type="text"
                                                    name="description"
                                                    placeholder="Description"
                                                    defaultValue={editUser.description}
                                                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                                />

                                                <button
                                                    type="submit"
                                                    className="w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                                                >
                                                    Save
                                                </button>
                                            </form>
                                        </DialogContent>
                                    </Dialog>

                                    <button
                                        onClick={() => deleteMutation.mutate(el.id)}
                                        className="rounded-lg border border-red-100 px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>

    )
}

export default Home