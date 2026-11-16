import React from 'react'
import { Link, Outlet } from 'react-router'

const Layout = () => {
    return (
        <div className="min-h-screen bg-slate-100">

            <nav className="flex items-center gap-8 border-b bg-white px-8 py-5 shadow-sm">
                <h1 className="mr-auto text-xl font-bold text-blue-600">
                    My App
                </h1>

                <Link
                    to="/"
                    className="font-medium text-slate-600 transition hover:text-blue-600"
                >
                    Home
                </Link>

                <Link
                    to="/about"
                    className="font-medium text-slate-600 transition hover:text-blue-600"
                >
                    About
                </Link>
            </nav>

            <main className="mx-auto max-w-6xl p-6">
                <Outlet />
            </main>

        </div>
    )
}

export default Layout