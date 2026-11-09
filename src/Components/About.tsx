import { useAtom, useSetAtom } from "jotai"
import { addDataAtom, dataAtom, deleteDtaAtom, editDataAtom } from "./Todo.Atom"

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
import { useState } from "react"

const About = () => {
  const [data] = useAtom(dataAtom)
  const deleteData = useSetAtom(deleteDtaAtom)
  const editData = useSetAtom(editDataAtom)
  const [editedUser, setEditedUser] = useState({
    id: 0,
    name: "",
    city: "",
    phone: "",
  })
  const [editOpen, setEditOpen] = useState(false)

  const addData = useSetAtom(addDataAtom)
  const [adddUser, setAddUser] = useState({
    id: 0,
    name: "",
    city: "",
    phone: "",
  })
  const [addOpen, setAddOpen] = useState(false)

  const handleEdit = (e) => {
    e.preventDefault()
    editData(editedUser)
    e.target.reset()
    setEditOpen(false)
  }


  const handleAdd = (e) => {
    e.preventDefault()
    addData(adddUser)
    setAddUser({
      id: Date.now(),
      name: "",
      city: "",
      phone: "",
    })
    setAddOpen(false)
  }

  return (
    <div>
  <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
    <h1 className="text-2xl font-bold text-slate-800">Users</h1>
    <Dialog open={addOpen} onOpenChange={setAddOpen}>
      <DialogTrigger className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700 shadow-sm">
        Add User
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-slate-800">Add New User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleAdd} className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600 px-1">Full Name</label>
            <input
              type="text"
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              placeholder="Enter full name..."
              required
              value={adddUser.name}
              onChange={(e) => setAddUser({ ...adddUser, name: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600 px-1">Phone</label>
            <input
              type="text"
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              placeholder="Enter phone number..."
              required
              value={adddUser.phone}
              onChange={(e) => setAddUser({ ...adddUser, phone: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600 px-1">City</label>
            <input
              type="text"
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              placeholder="Enter city..."
              required
              value={adddUser.city}
              onChange={(e) => setAddUser({ ...adddUser, city: e.target.value })}
            />
          </div>
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
                      onClick={() => setEditedUser(el)}
                      className="cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 shadow-sm"
                    >
                      Edit
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] rounded-2xl">
                      <DialogHeader>
                        <DialogTitle className="text-lg font-bold text-slate-800">Edit User</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleEdit} className="flex flex-col gap-4 mt-2">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-slate-600 px-1">Full Name</label>
                          <input
                            type="text"
                            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                            placeholder="Enter full name..."
                            required
                            value={editedUser.name}
                            onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-slate-600 px-1">Phone</label>
                          <input
                            type="text"
                            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                            placeholder="Enter phone number..."
                            required
                            value={editedUser.phone}
                            onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-slate-600 px-1">City</label>
                          <input
                            type="text"
                            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                            placeholder="Enter city..."
                            required
                            value={editedUser.city}
                            onChange={(e) => setEditedUser({ ...editedUser, city: e.target.value })}
                          />
                        </div>
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
                    onClick={() => deleteData(el.id)}
                    className="cursor-pointer rounded-lg bg-red-50 text-red-600 px-3 py-1.5 text-xs font-semibold transition hover:bg-red-100 hover:text-red-700"
                  >
                    Delete
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

export default About