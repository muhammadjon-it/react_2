import { useStudents } from "../context/StudentContext";

function Students() {

  const { students, dispatch } = useStudents();

  // Add Student
  function addStudent() {
    dispatch({
      type: "ADD",
      payload: {
        id: Date.now(),
        name: "Ali"
      }
    });
  }

  // Delete Student
  function deleteStudent(id) {
    dispatch({
      type: "DELETE",
      payload: id
    });
  }

  return (
    <div>
      <h1>Students List</h1>

      <button onClick={addStudent}>
        Add Student
      </button>

      {students.map(student => (
        <div key={student.id}>
          <h3>{student.name}</h3>

          <button onClick={() => deleteStudent(student.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Students;