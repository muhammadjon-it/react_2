
import {
    Wallet,
    ArrowRight,
    ShieldCheck,
    ChartNoAxesCombined,
    Users,
    Globe,
    Check,
    Menu,
} from "lucide-react";
import { Link } from "react-router";

function Home() {
    return (
        <div className="min-h-screen bg-[#F8FAFF] text-slate-900">

            <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">

                <Link to="/" className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                        <Wallet size={23} />
                    </div>

                    <span className="text-2xl font-bold tracking-tight">
                        Debt<span className="text-blue-600">Tracker</span>
                    </span>
                </Link>

                <nav className="hidden items-center gap-9 md:flex">
                    <a href="#features" className="text-sm text-slate-600 hover:text-blue-600">
                        Features
                    </a>
                    <a href="#about" className="text-sm text-slate-600 hover:text-blue-600">
                        About
                    </a>
                    <a href="#contact" className="text-sm text-slate-600 hover:text-blue-600">
                        Contact
                    </a>
                </nav>

                <div className="flex items-center gap-3">
                    <Link
                        to="/login"
                        className="hidden rounded-xl px-5 py-3 font-medium text-slate-700 hover:bg-slate-100 sm:block"
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
                    >
                        Get Started
                    </Link>
                </div>

            </header>

            <div>
                <section>
                    <div className="flex flex-col items-center justify-center py-5">
                        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
                            <span className="h-2 w-2 rounded-full bg-blue-600" />
                            SMART DEBT MANAGEMENT
                        </div>

                        <h1 className="text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">
                            Track Every Debt.
                            <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                                Own Your Finances.
                            </span>
                        </h1>

                        <p className="mt-7 max-w-xl text-lg leading-8 text-slate-500">
                            A powerful platform for managing debts, tracking contacts,
                            and keeping your financial records organized.
                        </p>

                        <div className="mt-9 flex flex-wrap items-center gap-4">
                            <Link
                                to="/register"
                                className="inline-flex items-center gap-3 rounded-xl bg-blue-600 px-7 py-4 font-semibold text-white shadow-xl shadow-blue-200 transition hover:-translate-y-1 hover:bg-blue-700"
                            >
                                Get Started Free
                                <ArrowRight size={20} />
                            </Link>

                            <Link
                                to="/login"
                                className="rounded-xl px-6 py-4 font-semibold text-slate-600 hover:bg-slate-100"
                            >
                                Sign In
                            </Link>
                        </div>

                        <div className="mt-10 flex flex-wrap gap-3">
                            <span className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500">
                                <Check size={14} className="mr-2 inline text-green-500" />
                                Secure
                            </span>
                            <span className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500">
                                <Check size={14} className="mr-2 inline text-green-500" />
                                Easy to Use
                            </span>
                            <span className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500">
                                <Check size={14} className="mr-2 inline text-green-500" />
                                Multi-Language
                            </span>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section id="features" className="border-t border-slate-100 bg-white py-24">
                    <div className="mx-auto max-w-7xl px-6">

                        <div className="mx-auto mb-16 max-w-2xl text-center">
                            <p className="font-semibold text-blue-600">FEATURES</p>
                            <h2 className="mt-4 text-4xl font-bold">
                                Everything you need to manage debts
                            </h2>
                            <p className="mt-5 text-slate-500">
                                Keep your financial life organized in one place.
                            </p>
                        </div>

                        <div className="grid gap-7 md:grid-cols-3">
                            {[
                                {
                                    icon: Wallet,
                                    title: "Debt Management",
                                    description: "Track money you owe and money others owe you.",
                                },
                                {
                                    icon: Users,
                                    title: "Contact Management",
                                    description: "Keep all your contacts and financial records organized.",
                                },
                                {
                                    icon: ChartNoAxesCombined,
                                    title: "Financial Reports",
                                    description: "Understand your financial situation with clear reports.",
                                },
                            ].map((feature) => (
                                <div
                                    key={feature.title}
                                    className="rounded-2xl border border-slate-200 bg-white p-8 transition hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-100"
                                >
                                    <div className="mb-6 inline-flex rounded-xl bg-blue-50 p-4 text-blue-600">
                                        <feature.icon size={28} />
                                    </div>

                                    <h3 className="text-xl font-bold">{feature.title}</h3>
                                    <p className="mt-3 leading-7 text-slate-500">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                    </div>
                </section>

                {/* About */}
                <section id="about" className="py-20">
                    <div className="mx-auto max-w-7xl px-6 text-center">
                        <div className="mx-auto max-w-2xl">
                            <Globe className="mx-auto text-blue-600" size={38} />
                            <h2 className="mt-6 text-3xl font-bold">
                                Your Finances. Your Control.
                            </h2>
                            <p className="mt-5 leading-8 text-slate-500">
                                Debt Tracker helps you manage your financial relationships
                                with a simple, secure and organized experience.
                            </p>
                        </div>
                    </div>
                </section>

            </div>

            {/* Footer */}
            <footer id="contact" className="border-t border-slate-200 bg-white py-10">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 md:flex-row">
                    <span className="text-xl font-bold">
                        Debt<span className="text-blue-600">Tracker</span>
                    </span>

                    <p className="text-sm text-slate-400">
                        © 2026 Debt Tracker. All rights reserved.
                    </p>
                </div>
            </footer>

        </div>
    );
}

export default Home;
