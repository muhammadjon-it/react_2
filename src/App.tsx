import React, { createContext, useState } from 'react'
import { StudentProvider } from './context/StudentContext'
import Students from './Components/Students'

export const Cntcontext = createContext(0)

const App = () => {
  return (
    <>
      <StudentProvider>
        <Students />
      </StudentProvider>
    </>
  )
}

export default App