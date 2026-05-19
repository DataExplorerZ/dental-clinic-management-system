import {
    useEffect,
    useState
} from "react";

import {
    Users,
    Calendar,
    FileText,
    DollarSign,
    AlertCircle,
    Activity,
    Plus
} from "lucide-react";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    Tooltip,
    CartesianGrid,
    BarChart,
    Bar
} from "recharts";
import { Link } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import {
    getDashboardStats
} from "../services/dashboardService";

export default function Dashboard() {

    const [stats, setStats] =
        useState(null);
    const revenueData = [
        { month: "Jan", revenue: 12000 },
        { month: "Feb", revenue: 18000 },
        { month: "Mar", revenue: 14000 },
        { month: "Apr", revenue: 22000 },
        { month: "May", revenue: 26000 },
        { month: "Jun", revenue: 21000 },
    ];

    const appointmentData = [
        { day: "Mon", appointments: 4 },
        { day: "Tue", appointments: 7 },
        { day: "Wed", appointments: 5 },
        { day: "Thu", appointments: 9 },
        { day: "Fri", appointments: 6 },
        { day: "Sat", appointments: 3 },
    ];
    const fetchStats = async () => {

        try {

            const data =
                await getDashboardStats();

            setStats(data);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    if (!stats) {

        return (
            <MainLayout>

                <div className="text-center py-20 text-gray-500">
                    Loading Dashboard...
                </div>

            </MainLayout>
        );
    }

    const cards = [

        {
            title: "Total Patients",
            value: stats.total_patients,
            icon: Users,
            color: "bg-blue-500",
            light: "bg-blue-50",
            text: "text-blue-600"
        },

        {
            title: "Appointments",
            value: stats.total_appointments,
            icon: Calendar,
            color: "bg-purple-500",
            light: "bg-purple-50",
            text: "text-purple-600"
        },

        {
            title: "Today Appointments",
            value: stats.today_appointments,
            icon: Activity,
            color: "bg-orange-500",
            light: "bg-orange-50",
            text: "text-orange-600"
        },

        {
            title: "Invoices",
            value: stats.total_invoices,
            icon: FileText,
            color: "bg-cyan-500",
            light: "bg-cyan-50",
            text: "text-cyan-600"
        },

        {
            title: "Revenue",
            value: `Rs. ${stats.total_revenue}`,
            icon: DollarSign,
            color: "bg-green-500",
            light: "bg-green-50",
            text: "text-green-600"
        },

        {
            title: "Pending Payments",
            value: stats.pending_payments,
            icon: AlertCircle,
            color: "bg-red-500",
            light: "bg-red-50",
            text: "text-red-600"
        }
    ];

    return (

        <MainLayout>

            <div className="space-y-8">

                <div className="flex flex-col lg:flex-row justify-between gap-6">

                    <div>

                        <h1 className="text-4xl font-bold text-gray-800">
                            Dashboard Overview
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Welcome back. Here’s your clinic summary today.
                        </p>

                    </div>

                    <div className="flex gap-4">

                        <Link
                            to="/patients"
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl shadow-md transition-all"
                        >

                            <Plus size={18} />

                            Add Patient

                        </Link>

                        <Link
                            to="/appointments"
                            className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 px-6 py-4 rounded-2xl shadow-sm transition-all"
                        >

                            <Calendar size={18} />

                            Appointment

                        </Link>

                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                    {cards.map((card, index) => {

                        const Icon = card.icon;

                        return (

                            <div
                                key={index}
                                className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
                            >

                                <div className="flex items-center justify-between">

                                    <div>

                                        <p className="text-gray-500 text-sm font-medium">
                                            {card.title}
                                        </p>

                                        <h2 className={`text-4xl font-bold mt-4 ${card.text}`}>
                                            {card.value}
                                        </h2>

                                    </div>

                                    <div className={`${card.light} p-4 rounded-2xl`}>

                                        <Icon
                                            size={28}
                                            className={card.text}
                                        />

                                    </div>

                                </div>

                            </div>

                        );
                    })}

                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">

                        <div className="flex items-center justify-between mb-6">

                            <h2 className="text-2xl font-bold text-gray-800">
                                Recent Activity
                            </h2>

                            <span className="text-sm text-gray-400">
                                Today
                            </span>

                        </div>

                        <div className="space-y-5">

                            <div className="flex items-start gap-4">

                                <div className="bg-blue-100 p-3 rounded-2xl">

                                    <Users
                                        size={20}
                                        className="text-blue-600"
                                    />

                                </div>

                                <div>

                                    <p className="font-semibold text-gray-800">
                                        New patient registered
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        Patient added to clinic records
                                    </p>

                                </div>

                            </div>

                            <div className="flex items-start gap-4">

                                <div className="bg-green-100 p-3 rounded-2xl">

                                    <DollarSign
                                        size={20}
                                        className="text-green-600"
                                    />

                                </div>

                                <div>

                                    <p className="font-semibold text-gray-800">
                                        Invoice generated
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        Payment successfully recorded
                                    </p>

                                </div>

                            </div>

                            <div className="flex items-start gap-4">

                                <div className="bg-purple-100 p-3 rounded-2xl">

                                    <Calendar
                                        size={20}
                                        className="text-purple-600"
                                    />

                                </div>

                                <div>

                                    <p className="font-semibold text-gray-800">
                                        Appointment scheduled
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        Upcoming clinic appointment added
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 text-white shadow-lg">

                        <h2 className="text-3xl font-bold mb-4">
                            Clinic Performance
                        </h2>

                        <p className="text-blue-100 leading-relaxed">

                            Your clinic is performing well today.
                            Keep managing appointments, invoices,
                            and patient records efficiently to
                            improve operational productivity.

                        </p>

                        <div className="mt-10 grid grid-cols-2 gap-4">

                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5">

                                <p className="text-blue-100 text-sm">
                                    Revenue
                                </p>

                                <h3 className="text-2xl font-bold mt-2">
                                    Rs. {stats.total_revenue}
                                </h3>

                            </div>

                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5">

                                <p className="text-blue-100 text-sm">
                                    Patients
                                </p>

                                <h3 className="text-2xl font-bold mt-2">
                                    {stats.total_patients}
                                </h3>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                    {/* Revenue Chart */}

                    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">

                        <div className="mb-8">

                            <h2 className="text-2xl font-bold text-gray-800">
                                Revenue Analytics
                            </h2>

                            <p className="text-gray-500 mt-1">
                                Monthly clinic revenue overview
                            </p>

                        </div>

                        <div className="h-[320px]">

                            <ResponsiveContainer width="100%" height="100%">

                                <AreaChart data={revenueData}>

                                    <defs>

                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">

                                            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />

                                            <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />

                                        </linearGradient>

                                    </defs>

                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />

                                    <XAxis dataKey="month" />

                                    <Tooltip />

                                    <Area
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#2563eb"
                                        fillOpacity={1}
                                        fill="url(#colorRevenue)"
                                        strokeWidth={3}
                                    />

                                </AreaChart>

                            </ResponsiveContainer>

                        </div>

                    </div>

                    {/* Appointment Chart */}

                    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">

                        <div className="mb-8">

                            <h2 className="text-2xl font-bold text-gray-800">
                                Appointment Activity
                            </h2>

                            <p className="text-gray-500 mt-1">
                                Weekly appointments overview
                            </p>

                        </div>

                        <div className="h-[320px]">

                            <ResponsiveContainer width="100%" height="100%">

                                <BarChart data={appointmentData}>

                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />

                                    <XAxis dataKey="day" />

                                    <Tooltip />

                                    <Bar
                                        dataKey="appointments"
                                        radius={[12, 12, 0, 0]}
                                        fill="#2563eb"
                                    />

                                </BarChart>

                            </ResponsiveContainer>

                        </div>

                    </div>

                </div>
            </div>

        </MainLayout>
    );
}