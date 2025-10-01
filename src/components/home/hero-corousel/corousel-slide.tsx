interface CarouselSlideProps {
    image: string;
    title: string;
    description: string;
    active: boolean;
}

export const CarouselSlide = ({ image, title, description, active }: CarouselSlideProps) => {
    return (
        <div className={`absolute inset-0 transition-opacity duration-700 ${
            active ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
            {/* Background Image */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <img 
                    src={image} 
                    alt={title}
                    className="w-full h-full object-cover"
                />
            </div>
            
            {/* Content */}
            <div className="absolute bottom-[10%] left-[10%] right-0 z-20 pb-20">
                <div className="app-container">
                    <div className="max-w-xs md:max-w-2xl">
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-12 sm:mb-10 font-playfair leading-[2.25]">
                            {title}
                        </h2>
                        <p className="text-lg md:text-xl text-white/90 italic">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
