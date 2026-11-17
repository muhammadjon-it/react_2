import React, { createContext, useState } from 'react'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import  Layout from './Layout/Layout';
import ZustandSinc from './pages/Zustand/ZustandSinc/ZustandSinc';
import JotaiSinc from './pages/Jotai/JotaiSinc/JotaiSinc';
import ReduxSinc from './pages/Redux/ReduxSinc/ReduxSinc';

export const Cntcontext = createContext(0)

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <ZustandSinc />
        }, {
          path:"jotaisinc",
          element: <JotaiSinc />
        }, {
          path:"reduxsinc",
          element: <ReduxSinc />
        },
      ]
    },
  ]);
  return (
    <RouterProvider router={router} />
  )
}

export default App