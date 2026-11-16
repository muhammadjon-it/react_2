import React, { createContext, useState } from 'react'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import  Layout from './pages/Layout';
import Home from './pages/Home';
import About from './pages/About';

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