import React, { useState } from 'react'
import { useData } from './Todo'
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
import ZustandAsinc from '../ZustandAsinc/ZustandAsinc'

const ZustandSinc = () => {

  const { data, delUser, addUser, editedUser, checkbox } = useData()

  const [addOpen, setAddOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [editUser, setEditUser] = useState(null)
  const [search, setSearch] = useState("")

  const handleAdd = (e) => {
    e.preventDefault()

    let newUser = {
      name: e.target.name.value,
      phone: e.target.phone.value,
      city: e.target.city.value,
      email: e.target.email.value,
      status: false,
      id: Date.now()
    }
    addUser(newUser)
    e.target.reset()
    setAddOpen(false)
  }

  const handleEdit = (e) => {
    e.preventDefault()

    let newUser = {
      name: e.target.name.value,
      phone: e.target.phone.value,
      city: e.target.city.value,
      email: e.target.email.value,
      status: e.target.status.value == "true",
      id: editUser.id
    }
    editedUser(newUser)
    e.target.reset()
    setEditUser(null)
    setEditOpen(false)
  }

  const filteredData = data.filter((el) =>
    el.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>

      <div className="space-y-5 rounded-xl bg-white p-5 shadow-sm">

        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Users</h1>

          <div className="flex gap-3">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              placeholder="Search by name"
            />

            <Dialog open={addOpen} onOpenChange={setAddOpen}>
              <DialogTrigger className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                + Add
              </DialogTrigger>

              <DialogContent className="rounded-xl">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold">
                    + Add New User
                  </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleAdd} className="flex flex-col gap-3">
                  <input
                    type="text"
                    name="name"
                    className="border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                    placeholder="Enter your name"
                    required
                  />

                  <input
                    type="text"
                    name="phone"
                    className="border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                    placeholder="Enter your phone"
                    required
                  />

                  <input
                    type="text"
                    name="city"
                    className="border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                    placeholder="Enter your city"
                    required
                  />

                  <input
                    type="email"
                    name="email"
                    className="border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                    placeholder="Enter your email"
                    required
                  />

                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
                  >
                    Save
                  </button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="border border-gray-100 rounded-xl overflow-hidden">
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>

            <TableHeader className="bg-gray-50">
              <TableRow className="hover:bg-gray-50">
                <TableHead className="font-semibold text-gray-700">Name</TableHead>
                <TableHead className="font-semibold text-gray-700">Phone</TableHead>
                <TableHead className="font-semibold text-gray-700">City</TableHead>
                <TableHead className="font-semibold text-gray-700">Email</TableHead>
                <TableHead className="font-semibold text-gray-700">Status</TableHead>
                <TableHead className="font-semibold text-gray-700">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredData.map((el: any) => {
                return (
                  <TableRow
                    key={el.id}
                    className="hover:bg-blue-50/40 transition-colors"
                  >
                    <TableCell className="flex gap-2 items-center font-medium text-gray-800">
                      <input
                        type="checkbox"
                        checked={el.status}
                        onChange={() => checkbox(el.id)}
                        className="accent-blue-600 w-4 h-4 cursor-pointer"
                      />
                      {el.name}
                    </TableCell>

                    <TableCell className="text-gray-600">{el.phone}</TableCell>
                    <TableCell className="text-gray-600">{el.city}</TableCell>
                    <TableCell className="text-gray-600">{el.email}</TableCell>

                    <TableCell>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${el.status
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                        }`}>
                        {el.status ? "Active" : "Inactive"}
                      </span>
                    </TableCell>

                    <TableCell className="flex gap-2">
                      <Dialog
                        open={editOpen && el.id == editUser?.id}
                        onOpenChange={setEditOpen}
                      >
                        <DialogTrigger
                          onClick={() => setEditUser(el)}
                          className="text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-md text-sm font-medium transition"
                        >
                          Edit
                        </DialogTrigger>

                        <DialogContent className="rounded-xl">
                          <DialogHeader>
                            <DialogTitle>Edit User</DialogTitle>
                          </DialogHeader>

                          <form onSubmit={handleEdit} className="flex flex-col gap-3">
                            <input
                              type="text"
                              name="name"
                              className="border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                              placeholder="Enter your name"
                              required
                              defaultValue={editUser?.name}
                            />

                            <input
                              type="text"
                              name="phone"
                              className="border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                              placeholder="Enter your phone"
                              required
                              defaultValue={editUser?.phone}
                            />

                            <input
                              type="text"
                              name="city"
                              className="border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                              placeholder="Enter your city"
                              required
                              defaultValue={editUser?.city}
                            />

                            <input
                              type="email"
                              name="email"
                              className="border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                              placeholder="Enter your email"
                              required
                              defaultValue={editUser?.email}
                            />

                            <select
                              name="status"
                              defaultValue={editUser?.status}
                              className="border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                            >
                              <option value="true">Active</option>
                              <option value="false">Inactive</option>
                            </select>

                            <button
                              type="submit"
                              className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
                            >
                              Save
                            </button>
                          </form>
                        </DialogContent>
                      </Dialog>

                      <button
                        onClick={() => delUser(el.id)}
                        className="text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-md text-sm font-medium transition"
                      >
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
        <br /> <br /> <br />
      </div>
        <ZustandAsinc />
    </>
  )
}

export default ZustandSinc