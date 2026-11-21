import { useGetDashboardQuery } from "../API/DashboardApi";
import { MonthlyDebtsChart } from "../Components/MonthlyDebtsChart";

const Dashboard = () => {
    const { data, isLoading, isError } = useGetDashboardQuery();

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Data not found</p>;



    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                <div className="flex items-center gap-6 rounded-3xl border-2 border-emerald-500 bg-slate-50/60 p-6 transition-all hover:shadow-md py-10">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-amber-100/80 text-amber-600">
                        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M21 7.28V5c0-1.1-.9-2-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14c1.1 0 2-.9 2-2v-2.28A2 2 0 0022 15V9a2 2 0 00-1-1.72zM20 9v6h-7V9h7zM5 19V5h14v2h-6c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h6v2H5z" />
                            <circle cx="16" cy="12" r="1.5" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Net Total</p>
                        <div className="mt-1 flex items-baseline gap-1.5">
                            <span className="text-3xl font-bold text-amber-500">
                                {(data.totals.they_owe_me)-(data.totals.i_owe_them)}
                            </span>
                            <span className="text-base font-medium text-gray-500">TJS</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-blue-400 hover:border-2 py-10">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-500">
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <rect x="2" y="5" width="20" height="14" rx="3" />
                            <path strokeLinecap="round" d="M2 10h20M16 14v4m0 0l-2-2m2 2l2-2" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Owes Me</p>
                        <div className="mt-1 flex items-baseline gap-1.5">
                            <span className="text-3xl font-bold text-emerald-500">
                                {data.totals.they_owe_me}
                            </span>
                            <span className="text-base font-medium text-gray-500">TJS</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-blue-400 hover:border-2 py-10">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-rose-50 text-rose-500">
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <rect x="2" y="5" width="20" height="14" rx="3" />
                            <path strokeLinecap="round" d="M2 10h20M16 18v-4m0 0l-2 2m2-2l2 2" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">I Owe</p>
                        <div className="mt-1 flex items-baseline gap-1.5">
                            <span className="text-3xl font-bold text-rose-500">
                                {data.totals.i_owe_them}
                            </span>
                            <span className="text-base font-medium text-gray-500">TJS</span>
                        </div>
                    </div>
                </div>

            </div>
            <MonthlyDebtsChart/>
        </div>


    );
};

export default Dashboard