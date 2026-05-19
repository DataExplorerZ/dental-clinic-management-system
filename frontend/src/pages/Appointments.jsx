import {
    useEffect,
    useState
} from "react";

import MainLayout from "../layouts/MainLayout";

import AddAppointmentForm from "../components/AddAppointmentForm";

import AppointmentsTable from "../components/AppointmentsTable";

import {
    getAppointments
} from "../services/appointmentService";

export default function Appointments() {

    const [appointments, setAppointments] =
        useState([]);

    const [search, setSearch] =
        useState("");

    const [status, setStatus] =
        useState("");

    const fetchAppointments =
        async (
            searchValue = "",
            statusValue = ""
        ) => {

            try {

                const data =
                    await getAppointments(
                        searchValue,
                        statusValue
                    );

                setAppointments(data);

            } catch (error) {
                console.error(error);
            }
        };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleSearch = (e) => {

        const value = e.target.value;

        setSearch(value);

        fetchAppointments(value, status);
    };

    const handleStatus = (e) => {

        const value = e.target.value;

        setStatus(value);

        fetchAppointments(search, value);
    };

    return (
        <MainLayout>

            <div>

                <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">

                    <h1 className="text-3xl font-bold">
                        Appointments
                    </h1>

                    <div className="flex gap-4">

                        <input
                            type="text"
                            placeholder="Search appointments..."
                            className="border p-3 rounded-lg"
                            value={search}
                            onChange={handleSearch}
                        />

                        <select
                            className="border p-3 rounded-lg"
                            value={status}
                            onChange={handleStatus}
                        >

                            <option value="">
                                All Status
                            </option>

                            <option value="Scheduled">
                                Scheduled
                            </option>

                            <option value="Completed">
                                Completed
                            </option>

                            <option value="Cancelled">
                                Cancelled
                            </option>

                        </select>

                    </div>

                </div>

                <AddAppointmentForm
                    fetchAppointments={fetchAppointments}
                />

                <AppointmentsTable
                    appointments={appointments}
                    fetchAppointments={fetchAppointments}
                />

            </div>

        </MainLayout>
    );
}