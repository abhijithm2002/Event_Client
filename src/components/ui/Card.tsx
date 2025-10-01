import { useNavigate } from "react-router";

interface IEvent {
  _id: string;
  title: string;
  description: string;
  venue: string;
  address: string;
  capacity: number;
  images?: string[];
}

interface EventCardProps {
  event: IEvent;
  onClick?: () => void;
  className?: string;
}

export const EventCard = ({ event, onClick, className = '' }: EventCardProps) => {
const navigate = useNavigate();

  return (
    <div
    onClick={() => navigate(`/events/${event._id}`, { state: { event } })}
  className={`group relative bg-white cursor-pointer border border-gray-300 shadow ${className} overflow-clip rounded-lg w-full max-w-sm`}
>
  {/* Image */}
  <div className="aspect-[4/3] min-h-[180px] md:min-h-[200px] relative max-w-full">
    <img
      src={event.images?.[0] || '/default-event.jpg'}
      alt={event.title}
      className="h-full w-full object-cover"
    />
  </div>

  {/* Content */}
  <div className="p-3">
    <h3 className="text-base font-semibold text-gray-800">{event.title}</h3>
    <p className="text-xs text-gray-600 line-clamp-2">{event.description}</p>
    <p className="text-xs mt-1 text-gray-700">📍 {event.venue}, {event.address}</p>
    <p className="text-xs mt-1 text-gray-700">👥 Capacity: {event.capacity}</p>
  </div>
</div>

  );
};
