import { useEffect, useState } from "react";
import { cancelTicket, getMyTickets } from "../service/ticketService";
import { useSelector } from "react-redux";
import type { RootState } from "../ReduxStore/store";
import { Spinner, Button } from "@heroui/react";
import { LucideArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import Swal from "sweetalert2";


interface ITicket {
    _id: string;
    orderId: string;
    ticketCode: string;
    code: string;
    status: string;
    event: {
        _id: string;
        title: string;
        description: string;
        venue: string;
        address: string;
        startAt: string;
        endAt: string;
    };
    quantity: number;
    createdAt: string;
}

const MyTickets = () => {
    const [tickets, setTickets] = useState<ITicket[]>([]);
    const [loading, setLoading] = useState(true);
    const user = useSelector((state: RootState) => state.auth.user);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await getMyTickets(user._id);
                setTickets(response);
            } catch (error) {
                console.error("Failed to fetch tickets:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTickets();
    }, [user._id]);

    const handleCancel = async (ticketId: string) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to cancel this ticket? This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, cancel it!",
        });

        if (result.isConfirmed) {
            try {
                await cancelTicket(ticketId);
                setTickets((prev) => prev.filter((t) => t._id !== ticketId));

                Swal.fire({
                    icon: "success",
                    title: "Cancelled!",
                    text: "Your ticket has been cancelled successfully.",
                    confirmButtonColor: "#d33",
                });
            } catch (error) {
                console.error("Failed to cancel ticket:", error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong while cancelling your ticket.",
                    confirmButtonColor: "#d33",
                });
            }
        }
    };

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner size="lg" color="primary" />
            </div>
        );
    }

    if (!tickets.length) {
        return (
            <div className="flex justify-center items-center h-screen text-red-500 text-lg">
                No tickets found.
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full flex flex-col items-center pt-20 relative">
            {/* Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background:
                        "radial-gradient(125% 125% at 50% 10%, #000000 40%, #2b0707 100%)",
                }}
            />

            <div className="relative z-10 flex flex-col gap-10 max-w-6xl w-full px-4 sm:px-6 lg:px-8 py-10">
                {tickets
                    .filter(ticket => ticket.status !== "cancelled").map((ticket) => (
                        <div
                            key={ticket._id}
                            className="flex flex-col md:flex-row items-center md:items-start gap-8 w-full rounded-lg shadow-lg p-6 bg-white/90"
                        >
                            {/* Left: QR Code */}
                            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                                <div className="p-4 border rounded-md bg-white shadow">
                                    <QRCodeCanvas value={ticket.ticketCode} size={180} />

                                </div>
                            </div>

                            {/* Right: Ticket Details */}
                            <div className="w-full md:w-1/2 flex flex-col gap-3 text-gray-800">
                                <button
                                    type="button"
                                    onClick={() => navigate(-1)}
                                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline w-fit mb-2"
                                >
                                    <LucideArrowLeft size={18} />
                                    Back
                                </button>

                                <h2 className="text-xl font-bold">{ticket.event.title}</h2>
                                <p className="text-gray-600">{ticket.event.description}</p>
                                <p className="text-gray-700">
                                    📍 {ticket.event.venue}, {ticket.event.address}
                                </p>
                                <p className="text-gray-700">
                                    🕒 {formatDateTime(ticket.event.startAt)} -{" "}
                                    {formatDateTime(ticket.event.endAt)}
                                </p>

                                <p className="text-gray-700">
                                    🆔 Order ID: {ticket.orderId}
                                </p>
                                <p className="text-gray-700 break-all">
                                    🔑 Ticket Code: {ticket.code}
                                </p>
                                <p className="text-gray-500 text-sm">
                                    Booked At: {formatDateTime(ticket.createdAt)}
                                </p>

                                <Button
                                    color="danger"
                                    variant="shadow"
                                    onClick={() => handleCancel(ticket._id)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default MyTickets;
