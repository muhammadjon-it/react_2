import { createContext, useContext, useReducer } from "react";

export const StudentContext = createContext();

const data = [
    {
        "id": "1",
        "name": "Jese Leos",
        "city": "Spinkaburgh",
        "email": "Darrell19@gmail.com"
    }, {
        "id": "2",
        "name": "Bonnie Green",
        "city": "Fort Pierce",
        "email": "Monserrat_Thompson52@hotmail.com"
    }, {
        "id": "3",
        "name": "Toby Durgan",
        "city": "South Wallace",
        "email": "Morgan.Kovacek6@yahoo.com"
    }, {
        "id": "4",
        "name": "Rosa Shanahan",
        "city": "East Desireeberg",
        "email": "Demarcus.Stamm4@gmail.com"
    }, {
        "id": "5",
        "name": "Pirov",
        "city": "South Stellaburgh",
        "email": "Adaline_Reichert@gmail.com"
    }, {
        "id": "6",
        "name": "Muhammadjon",
        "city": "Mayaguez",
        "email": "Gerda.Lynch@yahoo.com"
    }, {
        "id": "7",
        "name": "Janice McLaughlin Jr.",
        "city": "Keeblerton",
        "email": "Adah56@yahoo.com"
    }
];

function studentReducer(state, action) {
    switch (action.type) {
        case "ADD":
            return [...state, action.data];

        case "DELETE":
            return state.filter(student => student.id !== action.id);

            case "EDIT":
                return state.map(student=> student.id==action.id? action.data : student)

        default:
            return state;
    }
}

export function StudentProvider({ children }) {
    const [students, dispatch] = useReducer(studentReducer, data);

    return (
        <StudentContext.Provider value={{ students, dispatch }}>
            {children}
        </StudentContext.Provider>
    );
}

export function useStudents() {
    return useContext(StudentContext);
}
