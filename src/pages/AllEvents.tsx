import { useEffect, useState } from "react"
import { getAllEvents } from "../service/userService"
import { EventCard } from "../components/ui/Card"
import { Spinner } from "@heroui/react"
import toast from "react-hot-toast"


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
}

const AllEvents = () => {
    const [events, setEvents] = useState<IEvent[]>([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const fetchAllEvents = async () => {
            setLoading(true)
            try {
                const data: IEvent[] = await getAllEvents();
                setEvents(data)
            } catch (error) {
                toast.error('failed to fetch Events')
            } finally {
                setLoading(false)
            }
        }
        fetchAllEvents()
    }, [])
    return (
        <div className="min-h-screen w-full relative flex items-center flex-col text-white pt-16">
            {/* Crimson Depth Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: "radial-gradient(125% 125% at 50% 10%, #000000 40%, #2b0707 100%)",
                }}
            />
            <div className="relative z-10 flex flex-col items-center w-full bg-gradient-to-l from-indigo-500 via-red-500 to-indigo-500 text-transparent bg-clip-text "></div>
            <div className="w-full mt-10 px-2 flex flex-col items-center">
                <h1 className="text-2xl font-bold  mb-5 bg-gradient-to-l from-indigo-500 via-red-500 to-indigo-500 text-transparent bg-clip-text">My Events</h1>
                {loading ? (
                    <Spinner size="lg" color="primary" />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full p-4">
                        {events.length > 0 ? (
                            events.map((event) => (
                                <EventCard key={event._id} event={event} />
                            ))
                        ) : (
                            <p>No events available</p>
                        )}
                    </div>

                )}
            </div>
        </div>


    )
}

export default AllEvents
