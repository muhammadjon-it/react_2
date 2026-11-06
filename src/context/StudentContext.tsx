import { createContext, useContext, useReducer } from "react";

// 1. Create Context
const StudentContext = createContext();

// 2. Initial State
const initialState = [
  { id: 1, name: "Muhammad" },
  { id: 2, name: "Ahmad" }
];

// 3. Reducer Function
function studentReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];

    case "DELETE":
      return state.filter(
        student => student.id !== action.payload
      );

    default:
      return state;
  }
}

// 4. Provider
export function StudentProvider({ children }) {

  const [students, dispatch] = useReducer(
    studentReducer,
    initialState
  );

  return (
    <StudentContext.Provider value={{ students, dispatch }}>
      {children}
    </StudentContext.Provider>
  );
}

// 5. Custom Hook
export function useStudents() {
  return useContext(StudentContext);
}