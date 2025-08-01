'use client';
import { usePage } from '@inertiajs/react';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { useState } from 'react';

export default function MyMultipleSlides() {
    const { slideBottom } = usePage().props;
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000, stopOnInteraction: false })]);

    const handleClose = () => setCurrentIndex(null);
    const showPrev = () => setCurrentIndex((prev) => (prev === 0 ? slideBottom.length - 1 : prev! - 1));
    const showNext = () => setCurrentIndex((prev) => (prev === slideBottom.length - 1 ? 0 : prev! + 1));

    return (
        <>
            {/* Embla Carousel */}
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {slideBottom?.map((item, index) => (
                        <div key={index} className="shrink-0 basis-1/1 cursor-pointer px-2 md:basis-1/5" onClick={() => setCurrentIndex(index)}>
                            <div className="aspect-square overflow-hidden rounded-lg shadow-md transition hover:scale-105">
                                <img src={`/assets/images/banners/${item.image}`} alt={`Slide ${index + 1}`} className="h-full w-full object-cover" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Fullscreen Overlay Modal */}
            {currentIndex !== null && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90">
                    <div className="absolute inset-0 backdrop-blur-sm" onClick={handleClose} />

                    {/* Close Button */}
                    <button onClick={handleClose} className="absolute top-5 right-6 z-50 text-4xl text-white transition hover:text-red-400">
                        ✕
                    </button>

                    {/* Prev Button */}
                    <button
                        onClick={showPrev}
                        className="absolute top-1/2 left-4 z-50 -translate-y-1/2 text-5xl text-white transition hover:text-blue-400"
                    >
                        ❮
                    </button>

                    {/* Image Preview */}
                    <div className="relative z-40 w-full max-w-4xl px-4">
                        <img
                            src={`/assets/images/banners/${slideBottom[currentIndex].image}`}
                            alt={`Popup ${currentIndex}`}
                            className="h-auto w-full rounded-xl border-4 border-white shadow-xl"
                        />
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={showNext}
                        className="absolute top-1/2 right-4 z-50 -translate-y-1/2 text-5xl text-white transition hover:text-blue-400"
                    >
                        ❯
                    </button>

                    {/* Thumbnails */}
                    <div className="z-50 mt-6 flex gap-4 overflow-x-auto px-6 pb-4">
                        {slideBottom.map((item, index) => (
                            <img
                                key={index}
                                src={`/assets/images/banners/${item.image}`}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-20 w-32 cursor-pointer rounded-md border-2 object-cover ${
                                    index === currentIndex ? 'border-blue-400' : 'border-transparent hover:border-white'
                                } transition`}
                                alt={`Thumb ${index}`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
