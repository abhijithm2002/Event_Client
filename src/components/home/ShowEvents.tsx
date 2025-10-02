import React, { useEffect, useRef } from "react";
import "./ShowEvents.css";
import { useState } from "react";
import { getAllEvents } from "../../service/userService";

export const ShowEvents: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    getAllEvents().then((data) => {
      setEvents(data || []);
    });
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    let interval: number;
    if (slider && events.length > 1) {
      interval = window.setInterval(() => {
        slider.scrollLeft += 320;
        if (slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth) {
          slider.scrollLeft = 0;
        }
      }, 2500);
    }
    return () => window.clearInterval(interval);
  }, [events]);

  return (
    <div className="show-events-footer-bg">
      <div className="show-events-slider" ref={sliderRef}>
        {events.length === 0 ? (
          <div className="show-events-card">No events found.</div>
        ) : (
          events.map((event, idx) => (
            <div className="show-events-card" key={idx}>
              {event.images && (
                <img src={event.images} alt={event.title} className="show-events-img" />
              )}
              <div className="show-events-info">
                <h3>{event.title}</h3>
                <p>{event.date}</p>
                <p>{event.location}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
