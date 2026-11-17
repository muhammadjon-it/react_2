import { useAtom, useSetAtom } from "jotai"
import { addDataAtom, dataAtom, deleteDtaAtom, editDataAtom, checkboxAtom } from "../JotaiSinc/Todo"

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
import JotaiAsinc from "../JotayAsinc/JotaiAsinc"

const JotaiSinc = () => {
  const [data] = useAtom(dataAtom)
  const deleteData = useSetAtom(deleteDtaAtom)
  const editData = useSetAtom(editDataAtom)
  const checkbox = useSetAtom(checkboxAtom)
  const [editedUser, setEditedUser] = useState({
    id: 0,
    name: "",
    city: "",
    phone: "",
  })
  const [editOpen, setEditOpen] = useState(false)
  const [search, setSearch] = useState("")


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

  const filteredData = data.filter((el) =>
    el.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
     <>
     
   <div className="space-y-5">

  <div className="flex items-center justify-between mb-6">
    <h1 className="text-2xl font-bold text-slate-900">Users</h1>

    <div className="flex items-center gap-2">
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-52 border border-slate-200 bg-slate-50 rounded-md px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:bg-white transition"
        placeholder="Search by name"
      />

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogTrigger className="cursor-pointer rounded-md bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700">
          Add User
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px] rounded-xl border-0 shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-slate-800">Add New User</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleAdd} className="flex flex-col gap-4 mt-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600 px-1">Full Name</label>
              <input
                type="text"
                className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
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
                className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
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
                className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
                placeholder="Enter city..."
                required
                value={adddUser.city}
                onChange={(e) => setAddUser({ ...adddUser, city: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="cursor-pointer rounded-lg bg-indigo-600 mt-2 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-95"
            >
              Save
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  </div>

  <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
    <Table>
      <TableHeader className="bg-slate-100/70">
        <TableRow className="hover:bg-slate-100/70">
          <TableHead className="font-semibold text-slate-700 py-4 pl-5">Name</TableHead>
          <TableHead className="font-semibold text-slate-700 py-4">Phone</TableHead>
          <TableHead className="font-semibold text-slate-700 py-4">City</TableHead>
          <TableHead className="font-semibold text-slate-700 py-4">Status</TableHead>
          <TableHead className="font-semibold text-slate-700 py-4 pr-5">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {filteredData.map((el) => {
          return (
            <TableRow key={el.id} className="border-b border-slate-100 hover:bg-indigo-50/40 transition-colors">

              <TableCell className="font-medium text-slate-800 py-4 pl-5">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={el.status}
                    onChange={() => checkbox(el.id)}
                    className="h-4 w-4 accent-indigo-600 cursor-pointer"
                  />
                  {el.name}
                </div>
              </TableCell>

              <TableCell className="text-slate-600 text-sm py-4">{el.phone}</TableCell>

              <TableCell className="text-slate-600 text-sm py-4">{el.city}</TableCell>

              <TableCell className="py-4">
                <span className={`inline-block rounded-md px-2.5 py-1 text-xs font-medium ${
                  el.status
                    ? "bg-teal-50 text-teal-700"
                    : "bg-slate-100 text-slate-500"
                }`}>
                  {el.status ? "Acctive" : "Inactive"}
                </span>
              </TableCell>

              <TableCell className="py-4 pr-5">
                <div className="flex items-center gap-2">

                  <Dialog open={editOpen && el.id == editedUser.id} onOpenChange={setEditOpen}>
                    <DialogTrigger
                      onClick={() => setEditedUser(el)}
                      className="cursor-pointer rounded-md border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100"
                    >
                      Edit
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[425px] rounded-xl border-0 shadow-xl">
                      <DialogHeader>
                        <DialogTitle className="text-lg font-bold text-slate-800">Edit User</DialogTitle>
                      </DialogHeader>

                      <form onSubmit={handleEdit} className="flex flex-col gap-4 mt-2">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-slate-600 px-1">Full Name</label>
                          <input
                            type="text"
                            className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
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
                            className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
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
                            className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
                            placeholder="Enter city..."
                            required
                            value={editedUser.city}
                            onChange={(e) => setEditedUser({ ...editedUser, city: e.target.value })}
                          />
                        </div>

                        <button
                          type="submit"
                          className="cursor-pointer rounded-lg bg-indigo-600 mt-2 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-95"
                        >
                          Save
                        </button>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <button
                    onClick={() => deleteData(el.id)}
                    className="cursor-pointer rounded-md bg-rose-50 text-rose-600 px-3 py-1.5 text-xs font-semibold transition hover:bg-rose-100"
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
<br /> <br /> <br />

<JotaiAsinc/>
</>

  )
}

export default JotaiSinc