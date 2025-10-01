interface CarouselButtonProps {
    direction: 'prev' | 'next';
    onClick: () => void;
}

export const CarouselButton = ({ direction, onClick }: CarouselButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`absolute top-1/2 -translate-y-1/2 ${
                direction === 'prev' ? 'left-6' : 'right-6'
            } z-10 p-2 text-white hover:text-primary transition-colors`}
        >
            {direction === 'prev' ? (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="square" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            ) : (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="square" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            )}
        </button>
    );
};
