
import { NavLink, Outlet } from "react-router";

const Layout = () => {
    return (
        <div className="flex min-h-screen bg-[#F5F8FF]">

            <div className="w-64 min-h-screen bg-white border-r border-blue-100 p-6">
             
                <nav className="space-y-2">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `block rounded-xl px-4 py-3 font-medium transition ${isActive
                                ? "bg-blue-600 text-white"
                                : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                            }`
                        }
                    >
                       Home
                    </NavLink>

                </nav>
            </div>

            <main className="flex-1 p-8">
                <Outlet />
            </main>

        </div>
    );
};

export default Layout;
