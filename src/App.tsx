import React, { createContext, useState } from 'react'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import  Layout from './Components/Layout';
import Home from './Components/Home';
import About from './Components/About';

export const Cntcontext = createContext(0)

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />
        }, {
          path:"about",
          element: <About />
        },
      ]
    },
  ]);
  return (
    <RouterProvider router={router} />
  )
}

export default App