import { usePage } from '@inertiajs/react';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useState } from 'react';
import EnrollNow from './enroll-now';

export function MyNewSlide() {
    const { banners } = usePage().props;

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true },
        [Autoplay({ delay: 4000, stopOnInteraction: false })]
    );

    useEffect(() => {
        if (!emblaApi) return;
        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
        emblaApi.on('select', onSelect);
        onSelect();
    }, [emblaApi]);

    return (
        <div className="relative mx-auto w-full">
            {/* Carousel */}
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {banners?.map((item) => (
                        <div key={item.id} className="flex-[0_0_100%]">
                            <div className="relative aspect-[21/7] w-full">
                                <img
                                    src={`/assets/images/banners/${item.image}`}
                                    alt="Banner"
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black opacity-50"></div>
                                <div className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 px-4 text-white sm:px-10 md:px-16 lg:px-20">
                                    <div className="max-w-full p-5 px-1 text-center sm:max-w-screen-xl sm:text-left md:max-w-[50%]">
                                        <h3 className="text-base font-bold sm:text-lg md:text-2xl lg:text-4xl xl:text-5xl font-noto-san-extra-light">
                                            {item.title}
                                        </h3>
                                        <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:items-start sm:gap-4">
                                            <EnrollNow/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Dot Navigation */}
            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 transform space-x-2 sm:bottom-10 sm:space-x-4 xl:bottom-10">
                {banners?.map((_, index) => (
                    <button
                        key={index}
                        className={`h-2 w-2 rounded-full transition sm:h-3 sm:w-3 ${
                            index === selectedIndex ? 'bg-[#ffff]' : 'border-white border'
                        }`}
                        onClick={() => emblaApi && emblaApi.scrollTo(index)}
                    />
                ))}
            </div>
        </div>
    );
}
