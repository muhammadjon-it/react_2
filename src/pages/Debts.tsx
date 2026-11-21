
import { useState } from "react";

import {
    useAddDebtMutation,
    useDeleteDebtMutation,
    useEditDebtMutation,
    useGetDebtsQuery,
} from "../API/DabtsApi";

import { useGetContactsQuery, useAddContactMutation } from "../API/ContactsApi";

import {
    useGetFoldersQuery,
    useAddFolderMutation,
} from "../API/FolderApi";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useSearchParams } from "react-router";

const Debts = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const contactId = searchParams.get("contact_id");

    const { data: contacts = [] } = useGetContactsQuery(null);

    const {
        data: debts = [],
        isLoading,
        isError,
    } = useGetDebtsQuery(contactId);

    const { data: folders = [] } = useGetFoldersQuery();
    const [addFolder] = useAddFolderMutation();
    const [addContact] = useAddContactMutation();

    const [folderOpen, setFolderOpen] = useState(false);
    const [folderName, setFolderName] = useState("");
    const [selectedFolderId, setSelectedFolderId] = useState("");


    const [addDebt] = useAddDebtMutation();
    const [editDebt] = useEditDebtMutation();
    const [deleteDebt] = useDeleteDebtMutation();

    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);

    const [dataDebts, setDataDebts] = useState({
        id: "",
        contact_id: "",
        direction: "they_owe_me",
        amount: "",
        currency: "TJS",
        description: "",
        due_date: "",
        status: "pending",
    });

    const [search, setSearch] = useState("");

    const handleAdd = async (e) => {
        e.preventDefault()

        const res = await addContact({
            name: e.target.name.value,
            ...(selectedFolderId ? { folder_id: selectedFolderId } : {})
        })
        if (res.data) {
            const debtRes = await addDebt({
                contact_id: res.data.id,
                direction: e.target.direction.value,
                amount: Number(e.target.amount.value),
                currency: "TJS",
                description: e.target.description.value,
                due_date: e.target.due_date.value
            })

            if (debtRes.data) {
                e.target.reset();
                setSelectedFolderId("");
                setAddOpen(false);
            }
        }

    };

    const handleEdit = (e) => {
        e.preventDefault();

        editDebt({
            id: dataDebts.id,
            data: {
                contact_id: dataDebts.contact_id,
                direction: e.target.direction.value,
                amount: Number(e.target.amount.value),
                currency: "TJS",
                description: e.target.description.value,
                due_date: e.target.due_date.value,
                status: e.target.status.value,
            },
        });

        setEditOpen(false);
    };

    if (isLoading) return <p className="p-6">Loading...</p>;
    if (isError) return <p className="p-6">Error loading debts</p>;

    const newDebts = [];

    for (let el of debts) {
        for (let el2 of contacts) {
            if (el.contact_id === el2.id) {
                newDebts.push({ ...el, name: el2.name })

            }
        }
    }

    const filteredDebts = newDebts.filter((debt) =>
        debt.description?.toLowerCase().includes(search.toLowerCase()) ||
        debt.contact_id?.toLowerCase().includes(search.toLowerCase())
    );
    return (
        <div className="min-h-screen bg-slate-50 p-5 md:p-8">

            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">

                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                    <h1 className="text-3xl font-bold text-slate-900">
                        Debts
                    </h1>

                    <select
                        value={contactId}
                        onChange={(e) => {
                            const id = e.target.value;

                            if (id) {
                                setSearchParams({ contact_id: id });
                            } else {
                                setSearchParams({});
                            }
                        }}
                        className="h-12 min-w-[260px] rounded-xl border border-slate-300 bg-white px-4 text-slate-700 outline-none focus:border-blue-500"
                    >
                        <option value="">All Contacts</option>

                        {contacts.map((contact) => (
                            <option key={contact.id} value={contact.id}>
                                {contact.name}
                            </option>
                        ))}
                    </select>
                </div>


                <Dialog open={addOpen} onOpenChange={setAddOpen}>
                    <DialogTrigger className="flex h-12 items-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 hover:shadow-xl">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Debt
                    </DialogTrigger>

                    <DialogContent className="w-full max-w-[800px] max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-200 bg-white p-0 shadow-2xl">

                        <DialogHeader className="relative overflow-hidden rounded-t-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 px-8 py-7 text-white">
                            <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

                            <div className="relative flex items-center gap-4">
                                <div className="rounded-2xl border border-white/20 bg-white/15 p-4 shadow-lg backdrop-blur-md">
                                    <Plus className="h-7 w-7 text-white" />
                                </div>

                                <div>
                                    <DialogTitle className="text-2xl font-bold tracking-tight text-white">
                                        Add New Debt
                                    </DialogTitle>

                                    <p className="mt-1 text-sm text-blue-100">
                                        Create a new debt record
                                    </p>
                                </div>
                            </div>
                        </DialogHeader>

                        <form
                            onSubmit={handleAdd}
                            className="space-y-6 px-8 py-7"
                        >

                            <div className="space-y-2">
                                <Label className="text-sm font-semibold text-slate-700">
                                    Person Name
                                </Label>

                                <Input
                                    name="name"
                                    placeholder="Enter person name..."
                                    className="h-12 rounded-xl border-slate-200 bg-slate-50/70 px-4 text-slate-800 shadow-sm transition-all placeholder:text-slate-400 focus-visible:border-blue-500 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-blue-500/10"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-sm font-semibold text-slate-700">
                                    Folder
                                </Label>

                                <div className="flex gap-3">
                                    <select
                                        value={selectedFolderId}
                                        onChange={(e) => setSelectedFolderId(e.target.value)}
                                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 text-slate-700 shadow-sm outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                                    >
                                        <option value="">Select Folder</option>

                                        {folders.map((folder) => (
                                            <option key={folder.id} value={folder.id}>
                                                {folder.name}
                                            </option>
                                        ))}
                                    </select>

                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="h-12 w-12 shrink-0 rounded-xl border-blue-200 bg-blue-50 text-blue-600 transition-all hover:border-blue-400 hover:bg-blue-100 hover:text-blue-700"
                                        onClick={() => setFolderOpen(true)}
                                    >
                                        <Plus className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>

                            <Dialog
                                open={folderOpen}
                                onOpenChange={setFolderOpen}
                            >
                                <DialogContent className="w-full max-w-[420px] rounded-3xl border border-slate-200 bg-white p-0 shadow-2xl">

                                    <DialogHeader className="relative overflow-hidden rounded-t-3xl bg-gradient-to-br from-blue-600 to-indigo-700 px-6 py-6 text-white">
                                        <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

                                        <div className="relative flex items-center gap-3">
                                            <div className="rounded-xl border border-white/20 bg-white/15 p-3">
                                                <Plus className="h-6 w-6 text-white" />
                                            </div>

                                            <div>
                                                <DialogTitle className="text-xl font-bold text-white">
                                                    Add New Folder
                                                </DialogTitle>

                                                <p className="mt-1 text-sm text-blue-100">
                                                    Organize your debts
                                                </p>
                                            </div>
                                        </div>
                                    </DialogHeader>

                                    <div className="space-y-5 px-6 py-6">

                                        <div className="space-y-2">
                                            <Label className="text-sm font-semibold text-slate-700">
                                                Folder Name
                                            </Label>

                                            <Input
                                                value={folderName}
                                                onChange={(e) => setFolderName(e.target.value)}
                                                placeholder="Enter folder name..."
                                                className="h-12 rounded-xl border-slate-200 bg-slate-50 px-4 transition-all focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-blue-500/10"
                                            />
                                        </div>

                                        <div className="flex gap-3 border-t border-slate-100 pt-5">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="h-11 flex-1 rounded-xl border-slate-200 font-semibold text-slate-600 hover:bg-slate-100"
                                                onClick={() => {
                                                    setFolderOpen(false);
                                                    setFolderName("");
                                                }}
                                            >
                                                Cancel
                                            </Button>

                                            <Button
                                                type="button"
                                                className="h-11 flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 font-semibold text-white shadow-md shadow-blue-600/20 transition-all hover:from-blue-700 hover:to-indigo-700"
                                                onClick={() => {
                                                    if (!folderName.trim()) return;

                                                    addFolder({
                                                        name: folderName,
                                                        color: "#477DFF",
                                                    });

                                                    setFolderName("");
                                                    setFolderOpen(false);
                                                }}
                                            >
                                                <Plus className="mr-2 h-4 w-4" />
                                                Save Folder
                                            </Button>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>

                            <div className="space-y-2">
                                <Label className="text-sm font-semibold text-slate-700">
                                    Direction
                                </Label>

                                <select
                                    name="direction"
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 text-slate-700 shadow-sm outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                                    defaultValue="they_owe_me"
                                    required
                                >
                                    <option value="they_owe_me">
                                        They owe me
                                    </option>

                                    <option value="i_owe_them">
                                        I owe them
                                    </option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-sm font-semibold text-slate-700">
                                    Amount
                                </Label>

                                <Input
                                    name="amount"
                                    type="number"
                                    min="0"
                                    placeholder="Enter amount..."
                                    className="h-12 rounded-xl border-slate-200 bg-slate-50/70 px-4 text-slate-800 shadow-sm transition-all placeholder:text-slate-400 focus-visible:border-blue-500 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-blue-500/10"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-sm font-semibold text-slate-700">
                                    Description
                                </Label>

                                <Input
                                    name="description"
                                    placeholder="Write a description..."
                                    className="h-12 rounded-xl border-slate-200 bg-slate-50/70 px-4 text-slate-800 shadow-sm transition-all placeholder:text-slate-400 focus-visible:border-blue-500 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-blue-500/10"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-sm font-semibold text-slate-700">
                                    Due Date
                                </Label>

                                <Input
                                    name="due_date"
                                    type="date"
                                    className="h-12 rounded-xl border-slate-200 bg-slate-50/70 px-4 text-slate-800 shadow-sm transition-all focus-visible:border-blue-500 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-blue-500/10"
                                />
                            </div>

                            <div className="flex gap-3 border-t border-slate-100 pt-6">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="h-12 flex-1 rounded-xl border-slate-200 font-semibold text-slate-600 transition-all hover:bg-slate-100"
                                    onClick={() => setAddOpen(false)}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    type="submit"
                                    className="h-12 flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-600/30"
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Save Debt
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>

            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                <div className="border-b border-slate-200 p-5">
                    <Input
                        placeholder="Search debts..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="h-14 rounded-xl border-slate-200 text-base focus-visible:ring-blue-500"
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1000px] text-left">

                        <thead className="bg-slate-50">
                            <tr className="border-b border-slate-200 text-sm font-bold uppercase text-slate-700">
                                <th className="px-5 py-5">Full Name</th>
                                <th className="px-5 py-5">Amount</th>
                                <th className="px-5 py-5">Due Date</th>
                                <th className="px-5 py-5 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredDebts.map((debt) => (
                                <tr
                                    key={debt.id}
                                    className="border-b border-slate-100 transition hover:bg-blue-50/40"
                                >
                                    <td className="px-5 py-6 text-slate-600">
                                        {debt.name}
                                    </td>

                                    <td className="px-5 py-6 font-semibold text-slate-800">
                                        {debt.amount} {debt.currency}
                                    </td>

                                    <td className="px-5 py-6 text-slate-600">
                                        {debt.due_date ? new Date(debt.due_date).toLocaleDateString("en-GB") : "—"}
                                    </td>

                                    

                                    <td className="px-5 py-6">
                                        <div className="flex justify-center gap-2">

                                            <Dialog open={editOpen} onOpenChange={setEditOpen}>
                                                <DialogTrigger
                                                    onClick={() => setDataDebts(debt)}
                                                    className="text-slate-500 hover:text-blue-600"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </DialogTrigger>

                                                <DialogContent className="h-140 overflow-y-auto rounded-2xl border-0 p-0">

                                                    <DialogHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                                                        <div className="flex items-center gap-3">
                                                            <div className="rounded-lg bg-white/20 p-3">
                                                                <Pencil className="h-6 w-6" />
                                                            </div>

                                                            <DialogTitle className="text-3xl font-bold text-white">
                                                                Edit Debt
                                                            </DialogTitle>
                                                        </div>
                                                    </DialogHeader>

                                                    <form
                                                        onSubmit={handleEdit}
                                                        className="space-y-5 px-6 py-1"
                                                    >

                                                        <div className="space-y-2">
                                                            <Label>Direction</Label>

                                                            <select
                                                                name="direction"
                                                                defaultValue={dataDebts.direction}
                                                                className="h-11 w-full rounded-xl border px-3"
                                                            >
                                                                <option value="they_owe_me">
                                                                    They owe me
                                                                </option>

                                                                <option value="i_owe_them">
                                                                    I owe them
                                                                </option>
                                                            </select>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label>Amount</Label>

                                                            <Input
                                                                name="amount"
                                                                type="number"
                                                                min="0"
                                                                defaultValue={dataDebts.amount}
                                                                className="h-11 rounded-xl"
                                                                required
                                                            />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label>Currency</Label>

                                                            <Input
                                                                name="currency"
                                                                defaultValue={dataDebts.currency}
                                                                className="h-11 rounded-xl"
                                                                required
                                                            />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label>Description</Label>

                                                            <Input
                                                                name="description"
                                                                defaultValue={dataDebts.description}
                                                                className="h-11 rounded-xl"
                                                            />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label>Due Date</Label>

                                                            <Input
                                                                name="due_date"
                                                                type="date"
                                                                defaultValue={dataDebts.due_date}
                                                                className="h-11 rounded-xl"
                                                                required
                                                            />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label>Status</Label>

                                                            <select
                                                                name="status"
                                                                defaultValue={dataDebts.status}
                                                                className="h-11 w-full rounded-xl border px-3"
                                                            >
                                                                <option value="pending">
                                                                    Pending
                                                                </option>

                                                                <option value="partial">
                                                                    Partial
                                                                </option>

                                                                <option value="paid">
                                                                    Paid
                                                                </option>
                                                            </select>
                                                        </div>

                                                        <div className="flex gap-3 border-t pt-5">
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                className="h-11 flex-1 rounded-xl"
                                                                onClick={() => setEditOpen(false)}
                                                            >
                                                                Cancel
                                                            </Button>

                                                            <Button
                                                                type="submit"
                                                                className="h-11 flex-1 rounded-xl bg-blue-600 hover:bg-blue-700"
                                                            >
                                                                Save Debt
                                                            </Button>
                                                        </div>
                                                    </form>
                                                </DialogContent>
                                            </Dialog>

                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-slate-500 hover:bg-red-50 hover:text-red-600"
                                                onClick={() => deleteDebt(debt.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>

                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {filteredDebts.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="py-12 text-center text-slate-400"
                                    >
                                        No debts found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Debts;
