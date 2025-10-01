import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Spinner } from "@heroui/react";
import toast from "react-hot-toast";
import { getEventById } from "../service/userService";
import { LucideArrowLeft, Plus, Minus } from "lucide-react";
import { Button } from "@heroui/react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { bookTicket } from "../service/ticketService";
import { useSelector } from "react-redux";
import type { RootState } from "../ReduxStore/store";
import Swal from "sweetalert2";

interface IEvent {
  _id: string;
  title: string;
  description: string;
  venue: string;
  address: string;
  startAt: string;
  endAt: string;
  capacity: number;
  images: string[];
  quantity: number;
  sold: number;
}

const EventDetails = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [booking, setBooking] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const location = useLocation();
  const navigate = useNavigate();

  const [event, setEvent] = useState<IEvent | null>(
    (location.state as { event?: IEvent })?.event || null
  );
  const [loading, setLoading] = useState(!event);
  const [ticketQty, setTicketQty] = useState(1); 

  useEffect(() => {
    const fetchEvent = async () => {
      if (!event && eventId) {
        setLoading(true);
        try {
          const data = await getEventById(eventId);
          setEvent(data);
        } catch (error) {
          toast.error("Failed to fetch event details");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchEvent();
  }, [event, eventId]);

  const handleBookTicket = async () => {
  if (!event) return;
  try {
    setBooking(true);
    const userId = user._id;

    const ticket = await bookTicket(event._id, userId, ticketQty);

    Swal.fire({
      icon: "success",
      title: "Booking Confirmed 🎉",
      text: `You have successfully booked ${ticketQty} ticket(s) for "${event.title}".`,
      confirmButtonColor: "#d33",
      confirmButtonText: "Awesome!"
    });

    console.log("Booked ticket:", ticket);

     setEvent((prev) =>
      prev
        ? {
            ...prev,
            sold: prev.sold + ticketQty,
          }
        : prev
    );

    setTicketQty(1);
  } catch (error: any) {
    Swal.fire({
      icon: "error",
      title: "Booking Failed",
      text: error.response?.data?.error || "Failed to book ticket",
      confirmButtonColor: "#d33",
    });
  } finally {
    setBooking(false);
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

  const remainingTickets = event ? event.quantity - event.sold : 0;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  if (!event) {
    return (
      <p className="text-center text-red-500 mt-10">Event not found</p>
    );
  }

  return (
    <div className="min-h-screen w-full flex justify-center pt-20 relative">
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 10%, #000000 40%, #2b0707 100%)",
        }}
      />
      {/* Main Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 px-4 sm:px-6 lg:px-8 py-10 max-w-6xl w-full rounded-lg shadow-lg">
        {/* Left: Image */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <Zoom>
            <img
              src={event.images?.[0] || "/default-event.jpg"}
              alt={event.title}
              className="shadow-lg max-w-xs w-full h-auto object-cover aspect-[3/4] bg-gray-100 border border-gray-200 rounded-md"
            />
          </Zoom>
        </div>

        {/* Right: Details */}
        <div className="w-full md:w-1/2 flex flex-col gap-4 text-gray-800">
          {/* Back button */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline w-fit mb-2"
          >
            <LucideArrowLeft size={18} />
            Back
          </button>

          <h1 className="text-2xl font-bold">{event.title}</h1>
          <p className="text-gray-600">{event.description}</p>
          <p className="text-gray-700">
            📍 {event.venue}, {event.address}
          </p>
          <p className="text-gray-700">👥 Capacity: {event.capacity}</p>
          <p className="text-gray-700">
            🕒 {formatDateTime(event.startAt)} - {formatDateTime(event.endAt)}
          </p>
          <p className="text-gray-700">
            🎟 Remaining Tickets: {remainingTickets}
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mt-2">
            <Button
              isIconOnly
              onPress={() => setTicketQty((prev) => Math.max(1, prev - 1))}
              disabled={ticketQty <= 1}
            >
              <Minus />
            </Button>
            <span className="text-lg font-semibold">{ticketQty}</span>
            <Button
              isIconOnly
              onPress={() =>
                setTicketQty((prev) =>
                  prev < remainingTickets ? prev + 1 : prev
                )
              }
              disabled={ticketQty >= remainingTickets}
            >
              <Plus />
            </Button>
          </div>

          {/* Book Button */}
          <div className="mt-4">
            <Button
              color="danger"
              variant="shadow"
              onPress={handleBookTicket}
              disabled={booking || remainingTickets <= 0}
            >
              {booking
                ? "Booking..."
                : remainingTickets > 0
                ? "Book Ticket"
                : "Sold Out"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
