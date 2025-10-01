
import { useState, useEffect, useRef } from 'react';
import { CarouselSlide } from './corousel-slide';
import banner1 from '../../../assets/banner/event3.jpeg'
import banner2 from '../../../assets/banner/event4.jpeg'
import banner3 from '../../../assets/banner/event5.jpeg'
import banner4 from '../../../assets/banner/event6.jpeg'
const slides = [
  {
    image: banner3,
    title: 'Unforgettable Events, Seamlessly Managed',
    description: 'Plan, organize, and execute your events with ease and confidence.'
  },
  {
    image: banner2,
    title: 'Smart Ticketing Solutions',
    description: 'Streamline ticket sales and registrations with our secure platform.'
  },
  {
    image: banner1,
    title: 'Connect Organizers and Attendees',
    description: 'Build stronger engagement and enhance attendee experiences.'
  },
  {
    image: banner4,
    title: 'Your Vision, Our Technology',
    description: 'From small meetups to grand conferences — we power it all.'
  }
];


export const HeroCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [progress, setProgress] = useState(0); // 0-100
    const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const duration = 5000; // ms
    const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const heroSectionRef = useRef<HTMLDivElement>(null);

    // Autoplay logic (never stops)
    useEffect(() => {
        setProgress(0);
        if (progressRef.current) clearInterval(progressRef.current);
        let start = Date.now();
        progressRef.current = setInterval(() => {
            const elapsed = Date.now() - start;
            setProgress(Math.min(100, (elapsed / duration) * 100));
            if (elapsed >= duration) {
                setCurrentSlide((prev) => (prev + 1) % slides.length);
                start = Date.now();
                setProgress(0);
            }
        }, 30);
        return () => {
            if (progressRef.current) clearInterval(progressRef.current);
        };
    }, [currentSlide]);

    // Click on index: jump to slide, autoplay continues
    const handleIndexClick = (idx: number) => {
        setCurrentSlide(idx);
        setProgress(0);
    };

    return (
        <div className="relative h-screen" ref={heroSectionRef}>
            {/* Slides */}
            {slides.map((slide, index) => (
                <CarouselSlide
                    key={index}
                    active={currentSlide === index}
                    {...slide}
                />
            ))}

            {/* Glassmorphic Index Bar (full width, small height, flex row, no rounded corners) */}
            <div className="absolute bottom-0 left-0 z-30 w-full flex justify-center items-end px-0 pb-0">
                <div className="backdrop-blur-md bg-white/20 border-t divide-x-[1px] divide-white/40 border-white/20 shadow-lg flex flex-row w-full max-w-full h-20 overflow-x-auto scrollbar-hide md:overflow-x-visible ">
                    {slides.map((slide, idx) => (
                        <button
                            key={idx}
                            ref={el => { btnRefs.current[idx] = el; }}
                            onClick={() => handleIndexClick(idx)}
                            className={`transition-all  flex-shrink-0 h-full min-w-[200px] md:flex-1  px-4 py-2 text-center font-playfair text-base md:text-lg  ${currentSlide === idx ? 'bg-white/30 text-white font-bold shadow-lg' : 'text-white/80 hover:bg-white/10'}`}
                            style={{backdropFilter: 'blur(8px)', borderRadius: 0}}
                        >
                            <div className=" w-full text-sm ">{slide.title}</div>
                            {/* Progress bar for active */}
                            {currentSlide === idx && (
                                <div className="mt-2 h-1 w-full bg-white/30 overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-primary to-white transition-all"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
//
