
import { useState } from "react";
import { useNavigate } from "react-router";
import { useGetContactsQuery } from "../API/ContactsApi";
import {
    useAddContactMutation,
    useEditContactMutation,
    useDeleteContactMutation,
} from "../API/ContactsApi";

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



const Contacts = () => {

    const { data: folders = [] } = useGetFoldersQuery();

    const [addFolder] = useAddFolderMutation();

    const [searchParams] = useSearchParams();

    const folder_Id = searchParams.get("folder_id");

    const [selectedFolderId, setSelectedFolderId] = useState(
        folder_Id
    );


    const [newFolderName, setNewFolderName] = useState("");
    const [showAddFolder, setShowAddFolder] = useState(false);

    const [folderOpen, setFolderOpen] = useState(false);


    const { data: contacts, isLoading, isError } =
        useGetContactsQuery(folder_Id);

    const [addContact] = useAddContactMutation();
    const [editContact] = useEditContactMutation();
    const [deleteContact] = useDeleteContactMutation();

    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);


    const [dataContacts, setDataContacts] = useState({
        id: "",
        name: "",
        phone: "",
        email: "",
        note: "",
        folder_id: "",
    })

    const [search, setSearch] = useState("");


 const handleEdit = (e) => {
        e.preventDefault();


        editContact({
            id: dataContacts.id,
            data: {
                name: e.target.name.value,
                phone: e.target.phone.value,
                email: e.target.email.value,
                note: e.target.note.value,
                folder_id: dataContacts.folder_id,
            },
        })

        setEditOpen(false);

    };
    const handleAdd = (e) => {
        e.preventDefault();

        addContact({
            name: e.target.name.value,
            phone: e.target.phone.value,
            email: e.target.email.value,
            note: e.target.note.value,
             ...(selectedFolderId ? { folder_id: selectedFolderId } : {})
        })
        e.target.reset()
        setAddOpen(false)
    };

   

    const handleAddFolder = (e) => {
    e.preventDefault();

    addFolder({
        name: newFolderName,
        color: "#477DFF",
    });

    setNewFolderName("");
    setFolderOpen(false);
};
    

    const navigate = useNavigate();

    if (isLoading) return <p className="p-6">Loading...</p>;
    if (isError) return <p className="p-6">Error loading contacts</p>;


    const filteredContacts = contacts?.filter((contact) =>
        contact.name.toLowerCase().includes(search.toLowerCase()) ||
        contact.phone?.includes(search)
    );


    return (
        <div className="min-h-screen bg-slate-50 p-5 md:p-8">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">
                        Contacts
                    </h1>

                </div>

                <div>
                    <Dialog open={addOpen} onOpenChange={setAddOpen}>
                        <DialogTrigger className="flex h-12 items-center rounded-xl bg-blue-600 px-6 font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 hover:bg-blue-700">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Contact
                        </DialogTrigger>

                        <DialogContent className="max-h-[90vh] w-[calc(100%-24px)] max-w-lg overflow-y-auto rounded-2xl border-0 bg-white p-0 shadow-2xl">
                            <DialogHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-xl bg-white/20 p-3 shadow-inner">
                                        <Plus className="h-8 w-8" />
                                    </div>
                                    <div>
                                        <DialogTitle className="text-2xl font-bold text-white">
                                            Add New Contact
                                        </DialogTitle>
                                    </div>
                                </div>
                            </DialogHeader>

                            <form onSubmit={handleAdd} className="space-y-5 px-6 py-6">
                                <div className="space-y-2">
                                    <Label className="font-semibold text-slate-700">Full Name</Label>
                                    <Input
                                        name="name"
                                        placeholder="Enter full name"
                                        className="h-12 rounded-xl border-slate-200 bg-slate-50/50 transition focus-visible:ring-2 focus-visible:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="font-semibold text-slate-700">Phone Number</Label>
                                    <Input
                                        name="phone"
                                        placeholder="+992 900 00 00 00"
                                        className="h-12 rounded-xl border-slate-200 bg-slate-50/50 transition focus-visible:ring-2 focus-visible:ring-blue-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="font-semibold text-slate-700">Email Address</Label>
                                    <Input
                                        name="email"
                                        type="email"
                                        placeholder="example@gmail.com"
                                        className="h-12 rounded-xl border-slate-200 bg-slate-50/50 transition focus-visible:ring-2 focus-visible:ring-blue-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="font-semibold text-slate-700">Notes</Label>
                                    <Input
                                        name="note"
                                        placeholder="Write a note..."
                                        className="h-12 rounded-xl border-slate-200 bg-slate-50/50 transition focus-visible:ring-2 focus-visible:ring-blue-500"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <Label className="font-semibold text-slate-700">Folder</Label>

                                    {folder_Id ? (
                                        <Input
                                            value={folders.find((folder) => folder.id === folder_Id)?.name}
                                            className="h-12 rounded-xl border-blue-200 bg-blue-50 font-medium text-blue-700"
                                        />
                                    ) : (
                                        <select
                                            value={selectedFolderId}
                                            onChange={(e) => setSelectedFolderId(e.target.value)}
                                            required
                                            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">Select Folder</option>
                                            {folders.map((folder) => (
                                                <option key={folder.id} value={folder.id}>
                                                    {folder.name}
                                                </option>
                                            ))}
                                        </select>
                                    )}

                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="h-11 w-full rounded-xl border-dashed border-blue-300 font-semibold text-blue-600 transition hover:border-blue-500 hover:bg-blue-50"
                                        onClick={() => setFolderOpen(true)}
                                    >
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add New Folder
                                    </Button>

                                    {showAddFolder && (
                                        <div className="flex gap-2 rounded-xl border border-blue-100 bg-blue-50/50 p-3">
                                            <Input
                                                value={newFolderName}
                                                onChange={(e) => setNewFolderName(e.target.value)}
                                                placeholder="Enter folder name"
                                                className="h-11 rounded-xl bg-white"
                                            />

                                            <Button
                                                type="button"
                                                className="h-11 rounded-xl bg-blue-600 px-5 hover:bg-blue-700"
                                                onClick={() => {

                                                    addFolder({
                                                        name: newFolderName,
                                                        color: "#477DFF",
                                                    });

                                                    setNewFolderName("");
                                                    setShowAddFolder(false);
                                                }}
                                            >
                                                Save
                                            </Button>
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-3 border-t border-slate-100 pt-5">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="h-12 flex-1 rounded-xl border-slate-200 font-semibold hover:bg-slate-50"
                                        onClick={() => setAddOpen(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="h-12 flex-1 rounded-xl bg-blue-600 font-bold shadow-md shadow-blue-600/20 transition hover:bg-blue-700"
                                    >
                                        Save Contact
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>

                    <Dialog open={folderOpen} onOpenChange={setFolderOpen}>
                        <DialogContent className="w-[calc(100%-24px)] max-w-md rounded-2xl border-0 bg-white p-0 shadow-2xl">
                            <DialogHeader className="rounded-t-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-xl bg-white/20 p-3">
                                        <Plus className="h-7 w-7" />
                                    </div>
                                    <div>
                                        <DialogTitle className="text-2xl font-bold text-white">
                                            Add New Folder
                                        </DialogTitle>
                                    </div>
                                </div>
                            </DialogHeader>

                            <form
                                onSubmit={handleAddFolder}
                                className="space-y-5 p-6"
                            >
                                <div className="space-y-2">
                                    <Label className="font-semibold text-slate-700">Folder Name</Label>

                                    <Input
                                        value={newFolderName}
                                        onChange={(e) => setNewFolderName(e.target.value)}
                                        placeholder="Enter folder name"
                                        className="h-12 rounded-xl border-slate-200 bg-slate-50/50 focus-visible:ring-2 focus-visible:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div className="flex gap-3 border-t border-slate-100 pt-5">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="h-12 flex-1 rounded-xl font-semibold"
                                        onClick={() => setFolderOpen(false)}
                                    >
                                        Cancel
                                    </Button>

                                    <Button
                                        type="submit"
                                        className="h-12 flex-1 rounded-xl bg-blue-600 font-bold shadow-md shadow-blue-600/20 hover:bg-blue-700"
                                    >
                                        Save Folder
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 p-5">
                    <Input
                        placeholder="Search contacts..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="h-14 rounded-xl border-slate-200 text-base focus-visible:ring-blue-500"
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[750px] text-left">
                        <thead className="bg-slate-50">
                            <tr className="border-b border-slate-200 text-sm font-bold uppercase text-slate-700">
                                <th className="px-9 py-5">Full Name</th>
                                <th className="px-5 py-5">Phone</th>
                                <th className="px-5 py-5">Email</th>
                                <th className="px-5 py-5">Notes</th>
                                <th className="px-5 py-5 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredContacts.map((contact) => (
                                <tr
                                    key={contact.id}
                                    className="border-b border-slate-100 transition hover:bg-blue-50/40"
                                    onClick={() => navigate(`/debts?contact_id=${contact.id}`)}
                                >
                                    <td className="px-9 py-6 font-semibold text-slate-800">
                                        {contact.name}
                                    </td>

                                    <td className="px-5 py-6 text-slate-600">
                                        {contact.phone || "—"}
                                    </td>

                                    <td className="px-5 py-6">
                                        {contact.email || "—"}
                                    </td>

                                    <td className="px-5 py-6 text-slate-600">
                                        {contact.note || "—"}
                                    </td>

                                    <td className="px-5 py-6">
                                        <div className="flex justify-center gap-2">

                                            <Dialog open={editOpen} onOpenChange={setEditOpen}>
                                                <DialogTrigger onClick={() => setDataContacts(contact)}
                                                    className="text-slate-500 hover:text-blue-600">
                                                    <Pencil className="mr-2 h-4 w-4 font-bold" />
                                                </DialogTrigger>


                                                <DialogContent className=" rounded-2xl border-0 p-0 overflow-hidden h-140">
                                                    <DialogHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                                                        <div className="flex items-center gap-3">
                                                            <div className="rounded-[8px] bg-white/20 p-3">
                                                                <Pencil className="h-6 w-6" />
                                                            </div>
                                                            <div>
                                                                <DialogTitle className="text-3xl font-bold text-white">
                                                                    Edit Contact
                                                                </DialogTitle>

                                                            </div>
                                                        </div>
                                                    </DialogHeader>

                                                    <form onSubmit={handleEdit} className="space-y-5 px-6 py-1">
                                                        <div className="space-y-2">
                                                            <Label>Full Name</Label>
                                                            <Input
                                                                name="name"
                                                                placeholder="Enter full name"
                                                                className="h-11 rounded-xl"
                                                                required
                                                                defaultValue={dataContacts.name}
                                                            />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label>Phone Number</Label>
                                                            <Input
                                                                name="phone"
                                                                placeholder="+992 900 00 00 00"
                                                                className="h-11 rounded-xl"
                                                                defaultValue={dataContacts.phone}
                                                            />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label>Email Address</Label>
                                                            <Input
                                                                name="email"
                                                                type="email"
                                                                placeholder="example@gmail.com"
                                                                className="h-11 rounded-xl"
                                                                defaultValue={dataContacts.email}
                                                            />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label>Notes</Label>
                                                            <Input
                                                                name="note"
                                                                placeholder="Write a note..."
                                                                className="h-11 rounded-xl"
                                                                defaultValue={dataContacts.note}
                                                            />
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
                                                                Save Contact
                                                            </Button>
                                                        </div>
                                                    </form>
                                                </DialogContent>

                                            </Dialog>

                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-slate-500 hover:bg-red-50 hover:text-red-600"
                                                onClick={() => deleteContact(contact.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {filteredContacts.length == 0 && (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center text-slate-400">
                                        No contacts found
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

export default Contacts;
