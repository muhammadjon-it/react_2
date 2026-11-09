import { atom } from "jotai"

interface ITodo {
    name: string,
    phone: string,
    city: string,
    email: string,
    status: boolean,
    role: string,
    id: number
}

export const dataAtom = atom<ITodo[]>([
    {
        name: "Jese Leos",
        phone: "1-503-803-6334 x5725",
        city: "Spinkaburgh",
        email: "Darrell19@gmail.com",
        status: true,
        role: "Administrator",
        id: 1
    },
    {
        name: "Bonnie Green",
        phone: "920-689-7626 x03008",
        city: "Fort Pierce",
        email: "Monserrat_Thompson52@hotmail.com",
        status: true,
        role: "Viewer",
        id: 2
    },
    {
        name: "Toby Durgan",
        phone: "(988) 574-3542 x2249",
        city: "South Wallace",
        email: "Morgan.Kovacek6@yahoo.com",
        status: false,
        role: "Moderator",
        id: 3
    },
    {
        name: "Rosa Shanahan",
        phone: "1-699-290-1339 x1071",
        city: "East Desireeberg",
        email: "Demarcus.Stamm4@gmail.com",
        status: true,
        role: "Moderator",
        id: 4
    },
    {
        name: "Pirov",
        phone: "256-844-6091 x54619",
        city: "South Stellaburgh",
        email: "Adaline_Reichert@gmail.com",
        status: true,
        role: "Viewer",
        id: 5
    },
    {
        name: "Muhammadjon",
        phone: "827-892-1970 x746",
        city: "Mayaguez",
        email: "Gerda.Lynch@yahoo.com",
        status: false,
        role: "Viewer",
        id: 6
    },
    {
        name: "Janice McLaughlin Jr.",
        phone: "653.729.8810 x9611",
        city: "Keeblerton",
        email: "Adah56@yahoo.com",
        status: false,
        role: "Viewer",
        id: 7
    },
    {
        name: "Wilfred Carroll",
        phone: "664.505.4454 x548",
        city: "Simonisport",
        email: "Estell_Crist@gmail.com",
        status: true,
        role: "Moderator",
        id: 8
    },
    {
        name: "Tommy Fadel",
        phone: "(325) 979-1447 x8442",
        city: "Modesto",
        email: "Cruz90@yahoo.com",
        status: true,
        role: "Viewer",
        id: 9
    }
])

export const deleteDtaAtom = atom(
    null,
    (get, set, id: number) => {
        set(dataAtom, get(dataAtom).filter((el) => el.id !== id))
    }
)

export const editDataAtom = atom(
    null,
    (get, set, editedData: ITodo) => {
        set(dataAtom, get(dataAtom).map((el) => el.id == editedData.id ? { ...el, ...editedData } : el))
    }
)

export const addDataAtom = atom(
    null,
    (get, set, newUser: ITodo) => {
        set(dataAtom, [...get(dataAtom), newUser])
    }
)