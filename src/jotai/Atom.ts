import { atom } from 'jotai';

export const countAtom = atom(0);



export const dataAtom = atom([
    { id:1, city:"Dushanbe"},
    { id:2, city:"Kullob"},
    { id:3, city:"Khujand"},
    { id:4, city:"Bokhtar"},
    { id:5, city:"Norak"},
]);

export const delUserAtom = atom(null, 
    (get, set, id)=> {
        set(dataAtom, get(dataAtom).filter((el)=> el.id!=id))
    }
)

