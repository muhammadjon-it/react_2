
import { useState } from "react";
import { ArrowRight, Pencil, Trash2 } from "lucide-react";


import {
    useGetFoldersQuery,
    useAddFolderMutation,
    useEditFolderMutation,
    useDeleteFolderMutation,
} from "../API/FolderApi";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "../components/ui/dialog";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useNavigate } from "react-router";

const Folder = () => {
    const { data: folders = [], isLoading, error } = useGetFoldersQuery();

    const [deleteFolder] = useDeleteFolderMutation();

    const [editOpen, setEditOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [addName, setAddName] = useState("");
    const [addColor, setAddColor] = useState("#477DFF");
    const [editName, setEditName] = useState("");
    const [editColor, setEditColor] = useState("#477DFF");
    const [editingId, setEditingId] = useState<string | null>(null);

    const handleAdd = (e) => {

        e.preventDefault()

        addFolder({
            name: addName,
            color: addColor
        });
        setAddOpen(false)
        setAddName("")
        setAddColor("#477DFF")
    }

    const handleEdit = (e) => {
        e.preventDefault()


        editFolder({
            id: editingId,
            data: {
                name: editName,
                color: editColor,
            },
        });

        setEditOpen(false);
        setEditingId(null);
        setEditName("")
        setEditColor("")
    }

    const navigate = useNavigate();

    if (isLoading) {
        return <div className="p-8 text-gray-500">Loading folders...</div>;
    }

    if (error) {
        return <div className="p-8 text-red-500">Folder not found!</div>;
    }

    return (
        <div className="min-h-screen bg-[#F7F9FC] p-8">

            <div className="flex items-center justify-between mb-9">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">
                        My Folders
                    </h1>

                </div>

                <Dialog open={addOpen} onOpenChange={setAddOpen}>
                    <DialogTrigger className=" flex items-center h-10 gap-2 rounded-xl bg-blue-600 px-4 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow">

                        <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add Folder
                    </DialogTrigger>

                    <DialogContent className="overflow-hidden rounded-3xl border border-gray-100 p-0 shadow-xl sm:max-w-[440px]">
                        <DialogHeader className="border-b border-gray-100 bg-slate-50/60 px-6 py-5 text-left">
                            <DialogTitle className="text-lg font-bold text-gray-900">
                                Create New Folder
                            </DialogTitle>
                        </DialogHeader>

                        <form
                            onSubmit={handleAdd}
                            className="space-y-6 p-6">
                            <div className="flex items-center gap-4 rounded-2xl p-3.5 w-full justify-center">
                                <div
                                    className="flex h-22 w-22 shrink-0 items-center justify-center rounded-xl transition-colors"
                                    style={{
                                        backgroundColor: `${addColor}18`,
                                        color: addColor,
                                    }}
                                >
                                    <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M10 4H3a2 2 0 0 0-2 2v2h22V7a2 2 0 0 0-2-2h-9l-2-1Z" />
                                        <path d="M1 10v9a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2v-9H1Z" />
                                    </svg>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="folderName" className="text-sm font-medium text-gray-700">
                                    Folder Name
                                </Label>
                                <Input
                                    id="folderName"
                                    value={addName}
                                    onChange={(e) => setAddName(e.target.value)}
                                    placeholder="Enter your folder name...."
                                    className="h-11 rounded-xl border-gray-200 px-3.5 text-sm focus-visible:ring-blue-500"
                                    required
                                />
                            </div>

                            <div className="space-y-2.5">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="folderColor" className="text-sm font-medium text-gray-700">
                                        Folder Color
                                    </Label>
                                    <span className="font-mono text-xs uppercase text-gray-400">{addColor}</span>
                                </div>

                                <div className="flex flex-wrap items-center gap-2.5">
                                    {[
                                        "#2563eb",
                                        "#10b981",
                                        "#f59e0b",
                                        "#ef4444",
                                        "#8b5cf6",
                                        "#ec4899",
                                        "#06b6d4",
                                    ].map((el) => (
                                        <button
                                            key={el}
                                            type="button"
                                            onClick={() => setAddColor(el)}
                                            style={{ backgroundColor: el }}
                                            className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${addColor == el
                                                ? "scale-110 ring-2 ring-gray-900 ring-offset-2"
                                                : "opacity-85 hover:scale-105 hover:opacity-100"
                                                }`}
                                        >
                                        </button>
                                    ))}

                                    <label
                                        htmlFor="folderColor"
                                        title="Custom color"
                                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-dashed border-gray-300 bg-gray-50 text-gray-500 transition hover:border-gray-400 hover:text-gray-700"
                                    >
                                        <span className="text-xs font-bold">+</span>
                                        <input
                                            id="folderColor"
                                            type="color"
                                            value={addColor}
                                            onChange={(e) => setAddColor(e.target.value)}
                                            className="sr-only"
                                        />
                                    </label>
                                </div>
                            </div>

                            <DialogFooter className="gap-2 pt-2 sm:gap-2">
                                <DialogClose >
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="h-10 rounded-xl border-gray-200 px-4 text-gray-600 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </Button>
                                </DialogClose>

                                <Button
                                    type="submit"
                                    className="h-10 rounded-xl bg-blue-600 px-5 font-medium text-white shadow-sm hover:bg-blue-700 disabled:opacity-50"
                                >
                                    Save
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

            </div>

            {folders.length > 0 ? (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-7">
                    {folders.map((folder: any) => (
                        <div
                            key={folder.id}
                            className="w-90 group bg-white border border-slate-200 rounded-[24px] p-7 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-5 min-w-0">
                                    <div
                                        className="w-[78px] h-[78px] rounded-[24px] flex items-center justify-center shrink-0"
                                        style={{ backgroundColor: `${folder.color}18` }}
                                    >
                                        <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24" style={{ color: folder.color }}>
                                            <path d="M10 4H3a2 2 0 0 0-2 2v2h22V7a2 2 0 0 0-2-2h-9l-2-1Z" />
                                            <path d="M1 10v9a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2v-9H1Z" />
                                        </svg>
                                    </div>

                                    <div className="min-w-0">
                                        <h2 className="text-xl font-bold text-slate-800 truncate">
                                            {folder.name}
                                        </h2>
                                        <p className="text-sm text-gray-400 mt-1">
                                            Folder
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1">

                                    <Dialog open={editOpen && folder.id == editingId} onOpenChange={setEditOpen}>
                                        <DialogTrigger
                                            onClick={() => {
                                                setEditingId(folder.id)
                                                setEditName(folder.name)
                                                setEditColor(folder.color)
                                                setEditOpen(true)
                                            }}
                                            className="text-gray-500 hover:text-blue-600"
                                            title="Edit folder">
                                            <Pencil className="w-4 h-4" />
                                        </DialogTrigger>

                                        <DialogContent className="overflow-hidden rounded-3xl border border-gray-100 p-0 shadow-xl sm:max-w-[440px]">
                                            <DialogHeader className="border-b border-gray-100 bg-slate-50/60 px-6 py-5 text-left">
                                                <DialogTitle className="text-lg font-bold text-gray-900">
                                                    Create New Folder
                                                </DialogTitle>
                                            </DialogHeader>

                                            <form
                                                onSubmit={handleEdit}
                                                className="space-y-6 p-6">
                                                <div className="flex items-center gap-4 rounded-2xl p-3.5 w-full justify-center">
                                                    <div
                                                        className="flex h-22 w-22 shrink-0 items-center justify-center rounded-xl transition-colors"
                                                        style={{
                                                            backgroundColor: `${editColor}18`,
                                                            color: editColor,
                                                        }}
                                                    >
                                                        <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M10 4H3a2 2 0 0 0-2 2v2h22V7a2 2 0 0 0-2-2h-9l-2-1Z" />
                                                            <path d="M1 10v9a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2v-9H1Z" />
                                                        </svg>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="folderName" className="text-sm font-medium text-gray-700">
                                                        Folder Name
                                                    </Label>
                                                    <Input
                                                        id="folderName"
                                                        value={editName}
                                                        onChange={(e) => setEditName(e.target.value)}
                                                        placeholder="Enter your folder name...."
                                                        className="h-11 rounded-xl border-gray-200 px-3.5 text-sm focus-visible:ring-blue-500"
                                                        required
                                                    />
                                                </div>

                                                <div className="space-y-2.5">
                                                    <div className="flex items-center justify-between">
                                                        <Label htmlFor="folderColor" className="text-sm font-medium text-gray-700">
                                                            Folder Color
                                                        </Label>
                                                        <span className="font-mono text-xs uppercase text-gray-400">{editColor}</span>
                                                    </div>

                                                    <div className="flex flex-wrap items-center gap-2.5">
                                                        {[
                                                            "#2563eb",
                                                            "#10b981",
                                                            "#f59e0b",
                                                            "#ef4444",
                                                            "#8b5cf6",
                                                            "#ec4899",
                                                            "#06b6d4",
                                                        ].map((el) => (
                                                            <button
                                                                key={el}
                                                                type="button"
                                                                onClick={() => setEditColor(el)}
                                                                style={{ backgroundColor: el }}
                                                                className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${editColor == el
                                                                    ? "scale-110 ring-2 ring-gray-900 ring-offset-2"
                                                                    : "opacity-85 hover:scale-105 hover:opacity-100"
                                                                    }`}
                                                            >
                                                            </button>
                                                        ))}

                                                        <label
                                                            htmlFor="folderColor"
                                                            title="Custom color"
                                                            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-dashed border-gray-300 bg-gray-50 text-gray-500 transition hover:border-gray-400 hover:text-gray-700"
                                                        >
                                                            <span className="text-xs font-bold">+</span>
                                                            <input
                                                                id="folderColor"
                                                                type="color"
                                                                value={editColor}
                                                                onChange={(e) => setEditColor(e.target.value)}
                                                                className="sr-only"
                                                            />
                                                        </label>
                                                    </div>
                                                </div>

                                                <DialogFooter className="gap-2 pt-2 sm:gap-2">
                                                    <DialogClose
                                                        type="button"
                                                        className="h-10 rounded-xl border-gray-200 px-4 text-gray-600 hover:bg-gray-50">
                                                        Cancel
                                                    </DialogClose>

                                                    <Button
                                                        type="submit"
                                                        className="h-10 rounded-xl bg-blue-600 px-5 font-medium text-white shadow-sm hover:bg-blue-700 disabled:opacity-50"
                                                    >
                                                        Save
                                                    </Button>
                                                </DialogFooter>
                                            </form>
                                        </DialogContent>
                                    </Dialog>

                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => deleteFolder(folder.id)}
                                        className="text-gray-500 hover:text-red-600"
                                        title="Delete folder"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>


                            <div className="flex justify-end mt-7 pt-5 border-t border-gray-100">
                                <button
                                    onClick={() => navigate(`/contacts?folder_id=${folder.id}`)}
                                    className="text-gray-400 hover:text-blue-600 transition"
                                    title="Open folder"
                                >
                                    <ArrowRight className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white border border-dashed border-gray-300 rounded-3xl py-20 text-center">
                    <svg className="w-14 h-14 text-blue-300 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24" >
                        <path d="M10 4H3a2 2 0 0 0-2 2v2h22V7a2 2 0 0 0-2-2h-9l-2-1Z" />
                        <path d="M1 10v9a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2v-9H1Z" />
                    </svg>
                    <h2 className="text-xl font-semibold text-gray-700">
                        No folders yet
                    </h2>
                    <p className="text-gray-400 mt-2 mb-6">
                        Create your first folder to organize your debts.
                    </p>

                </div>
            )}


        </div>
    );
};

export default Folder;