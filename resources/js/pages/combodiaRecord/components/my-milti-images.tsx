'use client';

import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// Using a type alias for better clarity
type ImageItem = {
    image: string;
};

// Using a type alias for the prop structure
type MultiImagesProps = {
    images: { images: ImageItem[] };
};

const MultiImages = ({ images }: MultiImagesProps) => {
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const lightboxRef = useRef<HTMLDivElement>(null);

    const { images: missionImages } = images; // Destructure for cleaner access

    // Handle keyboard events for navigation and closing the lightbox
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (currentIndex !== null) {
                if (event.key === 'ArrowLeft') {
                    showPrev();
                } else if (event.key === 'ArrowRight') {
                    showNext();
                } else if (event.key === 'Escape') {
                    handleClose();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex]); // Only re-run the effect if currentIndex changes

    const handleClose = () => setCurrentIndex(null);

    const showPrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? missionImages.length - 1 : (prev ?? 0) - 1));
    };

    const showNext = () => {
        setCurrentIndex((prev) => (prev === missionImages.length - 1 ? 0 : (prev ?? 0) + 1));
    };

    if (!missionImages || missionImages.length === 0) {
        return null; // Don't render anything if there are no images
    }

    // Helper function to build image source URL
    const getImageUrl = (imageName: string, type: 'thumb' | 'full' = 'full') =>
        `/assets/images/posts/${type === 'thumb' ? 'thumb/' : ''}${imageName}`;

    return (
        <div className="mx-auto max-w-screen-xl space-y-2 xl:px-0">
            {/* Main Image */}
            <div
                className="aspect-video w-full cursor-pointer overflow-hidden rounded-xl shadow-lg transition hover:scale-[1.01]"
                onClick={() => setCurrentIndex(0)}
            >
                <img src={getImageUrl(missionImages[0].image, 'thumb')} alt="Main image" className="h-full w-full object-cover" />
            </div>

            {/* Thumbnail Grid */}
            {missionImages.length > 1 && (
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {missionImages.slice(1).map((img, index) => (
                        <div
                            key={index + 1}
                            className="aspect-video w-full cursor-pointer overflow-hidden rounded-lg shadow-md transition hover:scale-105"
                            onClick={() => setCurrentIndex(index + 1)}
                        >
                            <img src={getImageUrl(img.image, 'thumb')} alt={`Thumbnail ${index + 1}`} className="h-full w-full object-cover" />
                        </div>
                    ))}
                </div>
            )}

            {/* Lightbox Modal */}
            {currentIndex !== null && (
                <div
                    ref={lightboxRef}
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90"
                    onClick={(e) => e.target === lightboxRef.current && handleClose()}
                >
                    <button
                        onClick={handleClose}
                        className="absolute top-5 right-6 z-50 text-4xl text-white transition hover:text-red-400"
                        aria-label="Close"
                    >
                        ✕
                    </button>

                    <button
                        onClick={showPrev}
                        className="absolute top-1/2 left-4 z-50 -translate-y-6/3 text-5xl text-white transition hover:text-blue-400"
                        aria-label="Previous image"
                    >
                        <ArrowLeftCircle className="h-10 w-10" />
                    </button>

                    <div className="relative z-40 w-full max-w-4xl px-4">
                        <img
                            src={getImageUrl(missionImages[currentIndex].image)}
                            alt={`Popup ${currentIndex}`}
                            className="aspect-video w-full rounded-xl border-4 border-white shadow-xl"
                        />
                    </div>

                    <button
                        onClick={showNext}
                        className="absolute top-1/2 right-4 z-50 -translate-y-6/3 text-5xl text-white transition hover:text-blue-400"
                        aria-label="Next image"
                    >
                        <ArrowRightCircle className="h-10 w-10" />
                    </button>

                    <div className="z-50 mt-6 flex gap-4 overflow-x-auto pb-4">
                        {missionImages.map((thumb, index) => (
                            <img
                                key={index}
                                src={getImageUrl(thumb.image)}
                                onClick={() => setCurrentIndex(index)}
                                alt={`Thumb ${index}`}
                                className={`aspect-video w-32 cursor-pointer rounded-md border-2 object-cover transition ${
                                    index === currentIndex ? 'border-blue-400' : 'border-transparent hover:border-white'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MultiImages;
