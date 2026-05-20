import {
    useEffect,
    useState,
    useRef
} from "react";

import {
    useParams
} from "react-router-dom";

import {
    Printer,
    Receipt,
    CircleDollarSign,
    Download
} from "lucide-react";
import jsPDF from "jspdf";

import html2canvas from "html2canvas";
import {
    getSingleInvoice
} from "../services/invoiceService";

export default function InvoicePreview() {

    const { id } = useParams();

    const invoiceRef = useRef();

    const [invoice, setInvoice] =
        useState(null);

    const fetchInvoice = async () => {

        try {

            const data =
                await getSingleInvoice(id);

            setInvoice(data);

        } catch (error) {

            console.error(error);
        }
    };

    useEffect(() => {

        fetchInvoice();

    }, []);

    const handlePrint = () => {

        window.print();
    };

    const handleDownloadPDF = async () => {

        try {

            const element = invoiceRef.current;

            const canvas = await html2canvas(
                element,
                {
                    scale: 2,
                    useCORS: true,
                    backgroundColor: "#ffffff"
                }
            );

            const imgData =
                canvas.toDataURL(
                    "image/jpeg",
                    1.0
                );

            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4"
            });

            const pdfWidth = 210;

            const pageHeight = 295;

            const imgWidth = pdfWidth;

            const imgHeight =
                (canvas.height * imgWidth)
                / canvas.width;

            let heightLeft =
                imgHeight;

            let position = 0;

            pdf.addImage(
                imgData,
                "JPEG",
                0,
                position,
                imgWidth,
                imgHeight
            );

            heightLeft -= pageHeight;

            while (heightLeft > 0) {

                position =
                    heightLeft - imgHeight;

                pdf.addPage();

                pdf.addImage(
                    imgData,
                    "JPEG",
                    0,
                    position,
                    imgWidth,
                    imgHeight
                );

                heightLeft -= pageHeight;
            }

            pdf.save(
                `invoice-${invoice.id}.pdf`
            );

        } catch (error) {

            console.error(
                "PDF Download Error:",
                error
            );
        }
    };

    if (!invoice) {

        return (

            <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500 text-xl">

                Loading Invoice...

            </div>

        );
    }

    return (

        <div className="min-h-screen bg-gray-50 p-8">

            <div className="max-w-5xl mx-auto">

                {/* Action Buttons */}

                <div className="flex justify-end gap-4 mb-6 print:hidden">

                    <button
                        onClick={handleDownloadPDF}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-2xl shadow-md transition-all duration-200"
                    >

                        <Download size={20} />

                        Download PDF

                    </button>

                    <button
                        onClick={handlePrint}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl shadow-md transition-all duration-200"
                    >

                        <Printer size={20} />

                        Print Invoice

                    </button>

                </div>

                {/* Invoice */}

                <div
                    ref={invoiceRef}
                    className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden"
                >

                    {/* Header */}

                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-10">

                        <div className="flex justify-between items-start">

                            <div>

                                <div className="flex items-center gap-4 mb-4">

                                    <div className="bg-white p-4 rounded-2xl">

                                        <Receipt size={28} />

                                    </div>

                                    <div>

                                        <h1 className="text-4xl font-bold">
                                            Dental CMS
                                        </h1>

                                        <p className="text-blue-100 mt-1">
                                            Professional Dental Care
                                        </p>

                                    </div>

                                </div>

                                <p className="text-blue-100">
                                    Clinic Management System
                                </p>

                            </div>

                            <div className="text-right">

                                <p className="text-blue-100 text-sm">
                                    Invoice Number
                                </p>

                                <h2 className="text-4xl font-bold mt-2">
                                    #{invoice.id}
                                </h2>

                            </div>

                        </div>

                    </div>

                    {/* Body */}

                    <div className="p-10">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">

                            {/* Patient Info */}

                            <div className="bg-gray-50 rounded-3xl p-6">

                                <h3 className="text-xl font-bold text-gray-800 mb-5">
                                    Patient Information
                                </h3>

                                <div className="space-y-4">

                                    <div>

                                        <p className="text-sm text-gray-500">
                                            Patient ID
                                        </p>

                                        <p className="font-semibold text-gray-800 mt-1">
                                            #{invoice.patient_id}
                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-sm text-gray-500">
                                            Invoice Date
                                        </p>

                                        <p className="font-semibold text-gray-800 mt-1">
                                            {new Date().toLocaleDateString()}
                                        </p>

                                    </div>

                                    {invoice.next_visit_date && (

                                        <div>

                                            <p className="text-sm text-gray-500">
                                                Recommended Next Visit
                                            </p>

                                            <p className="font-semibold text-gray-800 mt-1">
                                                {invoice.next_visit_date}
                                            </p>

                                        </div>

                                    )}

                                </div>

                            </div>

                            {/* Payment Summary */}

                            <div className="bg-gray-50 rounded-3xl p-6">

                                <h3 className="text-xl font-bold text-gray-800 mb-5">
                                    Payment Summary
                                </h3>

                                <div className="space-y-5">

                                    <div>

                                        <p className="text-sm text-gray-500">
                                            Payment Status
                                        </p>

                                        <span
                                            className={`inline-flex mt-2 px-4 py-2 rounded-2xl text-sm font-medium ${invoice.payment_status === "Paid"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                                }`}
                                        >

                                            {invoice.payment_status}

                                        </span>

                                    </div>

                                    <div>

                                        <p className="text-sm text-gray-500">
                                            Total Amount
                                        </p>

                                        <div className="flex items-center gap-2 mt-2">

                                            <CircleDollarSign
                                                size={24}
                                                className="text-green-600"
                                            />

                                            <h2 className="text-4xl font-bold text-green-600">

                                                Rs. {invoice.total_amount}

                                            </h2>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* Treatments */}

                        <div>

                            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                Treatment Breakdown
                            </h2>

                            <div className="overflow-hidden rounded-3xl border border-gray-100">

                                <table className="w-full">

                                    <thead className="bg-gray-50">

                                        <tr>

                                            <th className="text-left px-6 py-5 text-sm font-semibold text-gray-500">
                                                Treatment
                                            </th>

                                            <th className="text-right px-6 py-5 text-sm font-semibold text-gray-500">
                                                Amount
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {invoice.items?.map(
                                            (item, index) => (

                                                <tr
                                                    key={index}
                                                    className="border-t border-gray-100"
                                                >

                                                    <td className="px-6 py-5 font-medium text-gray-800">

                                                        {item.treatment_name}

                                                    </td>

                                                    <td className="px-6 py-5 text-right font-semibold text-green-600">

                                                        Rs. {item.amount}

                                                    </td>

                                                </tr>

                                            ))}

                                    </tbody>

                                </table>

                            </div>

                        </div>

                        {/* Notes */}

                        {invoice.notes && (

                            <div className="mt-10">

                                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                    Notes
                                </h2>

                                <div className="bg-gray-50 rounded-3xl p-6 text-gray-700 leading-relaxed">

                                    {invoice.notes}

                                </div>

                            </div>

                        )}

                        {/* Footer */}

                        <div className="mt-14 border-t border-gray-100 pt-8 flex justify-between items-end">

                            <div>

                                <p className="text-gray-600">
                                    Thank you for choosing our clinic.
                                </p>

                                <p className="text-sm text-gray-400 mt-2">
                                    Generated by Dental CMS
                                </p>

                            </div>

                            <div className="text-right">

                                <p className="text-sm text-gray-500">
                                    Authorized Signature
                                </p>

                                <div className="w-52 border-b border-gray-300 mt-12"></div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}