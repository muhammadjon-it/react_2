import React, { createContext, useState } from 'react'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Layout from './Layout/Layout';

import Home from './pages/Home';
import NotFound from './pages/NotFound';

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
        }, 
      ]
    },{
      path: "*",
      element: <NotFound />
    }
  ]);
  return (
    <RouterProvider router={router} />
  )
}

export default App