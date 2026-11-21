import React, { createContext, useState } from 'react'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Layout from './Layout/Layout';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Auth from './Components/Auth';
import Debts from './pages/Debts';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import Folder from './pages/Folder';

export const Cntcontext = createContext(0)

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element:
            <Auth>
              <Dashboard />
            </Auth>
        }, {
          path: "folders",
          element:
            <Auth>
              <Folder />
            </Auth>
        }, {
          path: "debts",
          element:
            <Auth>
              <Debts />
            </Auth>
        }, {
          path: "profile",
          element:
            <Auth>
              <Profile />
            </Auth>
        }, {
          path: "contacts",
          element:
            <Auth>
              <Contact />
            </Auth>
        },
      ]
    }, {
      path: "login",
      element:
        <Auth NoLogin>
          <Login />
        </Auth>
    }, {
      path: "register",
      element:
        <Auth NoLogin>
          <Register />
        </Auth>
    }, {
      path: "home",
      element: <Home />
    }, {
      path: "*",
      element: <NotFound />
    }
  ]);
  return (
    <RouterProvider router={router} />
  )
}

export default App