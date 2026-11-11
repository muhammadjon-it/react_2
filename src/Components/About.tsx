import React from 'react';
import useDataStore from '../zustand/Todo';
import { dataAtom, delUserAtom } from '../jotai/Atom';
import { useAtom, useSetAtom } from 'jotai';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../redux/store';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { deleteUsers } from '../redux/counter';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


const About = () => {

  const data_1 = useSelector((store: RootState) => store.counter.data)
  const dispatch = useDispatch()
  const [data_2] = useAtom(dataAtom);
  const data_3 = useDataStore((state) => state.data);

  const delUser = useDataStore((state) => state.delUser);
  const deleteUserAtom = useSetAtom(delUserAtom)

  const handleDelete = (id: number) => {
    delUser(id)
    deleteUserAtom(id)
    dispatch(deleteUsers(id))

  }

  let data = []


  for (let el1 of data_1) {
    for (let el2 of data_2) {
      for (let el3 of data_3) {
        if (el1.id === el2.id && el2.id === el3.id) {
          const user = { ...el1, ...el2, ...el3 }
          data.push(user)
        }
      }
    }
  }

  return (
    <div>
      <div>
        <h1>Users</h1>
        <Dialog>
          <DialogTrigger>+ Add</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Users</DialogTitle>
            </DialogHeader>
            <form className='flex flex-col gap-3'>
              <input 
              type="text" 
              name="name" 
              placeholder='Enter your name...'
              className='border-2'
              />
              <input 
              type="text" 
              name="phone" 
              placeholder='Enter your phone'
              className='border-2'
              />
              
              <input 
              type="text" 
              name="city"
              placeholder='Enter your city' 
              className='border-2'
              />
              <button type='submit'>SAVE</button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              data.map((el) => {
                return <TableRow key={el.id}>
                  <TableCell>{el.name}</TableCell>
                  <TableCell>{el.phone}</TableCell>
                  <TableCell>{el.city}</TableCell>
                  <TableCell className="flex gap-3">
                    <button>edit</button>
                    <button
                      onClick={() => handleDelete(el.id)}
                    >delete</button>
                  </TableCell>
                </TableRow>
              })
            }

          </TableBody>
        </Table>
      </div>

    </div>
  );
};

export default About