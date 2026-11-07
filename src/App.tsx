import { useState } from "react";
import { useStudents } from "../src/Components/StudentContext";
import Dialog from "../src/Components/Dialog";

function App() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editUserId, setEditUserId] = useState(null)
  const { students, dispatch } = useStudents();

  const [users, setUsers] = useState({ name: "", city: "", email: "" });

  // Add Student
  function addStudent(e) {
    e.preventDefault();
    dispatch({
      type: "ADD",
      data: { ...users, id: Date.now().toString() }
    });
    setUsers({ name: "", city: "", email: "" });
    setIsAddOpen(false);
  }

  function editUser(e) {
    e.preventDefault();
    dispatch({
      type: "EDIT",
      id: editUserId.id,
      data: editUserId
    });
    setEditUserId(null)
    setIsEditOpen(false)
  }

  // Delete Student
  function deleteStudent(id) {
    dispatch({
      type: "DELETE",
      id: id
    });
  }

  return (

    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Students List</h1>
        <button
          onClick={() => setIsAddOpen(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow text-sm"
        >
          Add
        </button>
        <Dialog title={"Add New"}  isOpen={isAddOpen} setIsOpen={setIsAddOpen}>

          <form onSubmit={addStudent}>
            <div className="py-4">
              <label className="block text-sm font-medium text-gray-700 my-1">
                Student Name
              </label>
              <input
                type="text"
                required
                placeholder="Enter full name"
                value={users.name}
                onChange={(e) => setUsers({ ...users, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />

              <label className="block text-sm font-medium text-gray-700 my-1 mt-3">
                Student City
              </label>
              <input
                type="text"
                required
                placeholder="Enter city"
                value={users.city}
                onChange={(e) => setUsers({ ...users, city: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />

              <label className="block text-sm font-medium text-gray-700 mb-1 mt-3">
                Student Email
              </label>
              <input
                type="email"
                required
                placeholder="Enter email"
                value={users.email}
                onChange={(e) => setUsers({ ...users, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <div className="flex justify-end space-x-3 border-t border-gray-100 pt-3">
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                type='submit'
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm transition-colors shadow"
              >
                Save Student
              </button>
            </div>
          </form>
        </Dialog>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
          <thead className="bg-gray-50 text-gray-700 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">City</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-600">
            {students.map(student => (
              <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{student.name}</td>
                <td className="px-6 py-4 font-medium text-gray-900">{student.city}</td>
                <td className="px-6 py-4 font-medium text-gray-900">{student.email}</td>
                <td className="px-6 py-4 text-right flex gap-3">
                  <button
                    onClick={() => deleteStudent(student.id)}
                    className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-md transition-colors"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => { setIsEditOpen(true); setEditUserId(student) }}
                    className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium rounded-md transition-colors"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Dialog title={"Edit"} isOpen={isEditOpen} setIsOpen={setIsEditOpen}>
        <form onSubmit={editUser}>
          <div className="py-4">
            <label className="block text-sm font-medium text-gray-700 my-1">
              Student Name
            </label>
            <input
              type="text"
              required
              placeholder="Enter full name"
              value={editUserId?.name}
              onChange={(e) => setEditUserId({ ...editUserId, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />

            <label className="block text-sm font-medium text-gray-700 my-1 mt-3">
              Student City
            </label>
            <input
              type="text"
              required
              placeholder="Enter city"
              value={editUserId?.city}
              onChange={(e) => setEditUserId({ ...editUserId, city: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />

            <label className="block text-sm font-medium text-gray-700 mb-1 mt-3">
              Student Email
            </label>
            <input
              type="email"
              required
              placeholder="Enter email"
              value={editUserId?.email}
              onChange={(e) => setEditUserId({ ...editUserId, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <div className="flex justify-end space-x-3 border-t border-gray-100 pt-3">
            <button
              type="button"
              onClick={() => setIsEditOpen(false)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type='submit'
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm transition-colors shadow"
            >
              Save Student
            </button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}

export default App;
