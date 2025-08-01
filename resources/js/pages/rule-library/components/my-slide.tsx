import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Link } from '@inertiajs/react';
import Autoplay from 'embla-carousel-autoplay';
import React from 'react';

const MySlide = ({ className, images = [] }: { className?: string; images?: any }) => {
    // images = [
    //     {
    //         id: '1',
    //         image: '/assets/demo-images/rule-images/slide1.jpg',
    //         alt: 'image 1',
    //         short: 'Safety and security don’t just happen; <strong>CCTV</strong> is an investment in protection',
    //         bg: '#273896',
    //     },
    //     {
    //         id: '2',
    //         image: '/assets/demo-images/rule-images/slide1.jpg',
    //         alt: 'image 2',
    //         short: 'Your safety starts at the door—let an <strong>Access Control System</strong> decide who comes through.',
    //         bg: '#008080',
    //     },
    //     {
    //         id: '3',
    //         image: '/assets/demo-images/rule-images/slide1.jpg',
    //         alt: 'image 3',
    //         short: 'Peace of mind begins with protection—<strong>Intrusion Alarms</strong> ensure you sleep soundly.',
    //         bg: '#36454f',
    //     },
    //     {
    //         id: '4',
    //         image: '/assets/demo-images/rule-images/slide1.jpg',
    //         alt: 'image 4',
    //         short: 'The sun never send a bill—<strong>Smart Solar Energy System</strong> turn its power savings.',
    //         bg: '#008080',
    //     },
    //     {
    //         id: '5',
    //         image: '/assets/demo-images/rule-images/slide1.jpg',
    //         alt: 'image 5',
    //         short: 'A smart home isn’t just about convenience—it’s about control. Automate your world with a <strong>Smart Home Automation System</strong>.',
    //         bg: '#273896',
    //     },
    // ];

    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        if (!api) return;

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap());

        api.on('select', () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    return (
        <div className={className}>
            {images.length > 0 && (
                <Carousel
                    plugins={[
                        Autoplay({
                            delay: 4000,
                            stopOnInteraction: false,
                        }),
                    ]}
                    opts={{ loop: true }}
                    setApi={setApi}
                    className="bg-true-primary relative"
                >
                    <CarouselContent>
                        {images.map((image) => (
                            <CarouselItem key={image.id} className="pl-0">
                                <Link href={image.link || '#'}>
                                    <img
                                        className={`w-full object-cover transition-all duration-500 ${
                                            image.link ? 'border-primary hover:scale-95 hover:border-2' : ''
                                        }`}
                                        src={`/assets/images/banners/${image.image}`}
                                        alt={image.alt}
                                    />
                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    {/* Dots */}
                    <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 transform space-x-2 sm:bottom-5 sm:space-x-2">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                className={`h-2 w-2 rounded-full transition sm:h-3 sm:w-3 ${index === current ? 'bg-yellow-400' : 'bg-white'}`}
                                onClick={() => api?.scrollTo(index)}
                            />
                        ))}
                    </div>

                    <CarouselPrevious className="absolute top-1/2 left-4 z-20 hidden -translate-y-1/2 rounded-full bg-white/80 p-2 text-black hover:bg-white md:flex" />
                    <CarouselNext className="absolute top-1/2 right-4 z-20 hidden -translate-y-1/2 rounded-full bg-white/80 p-2 text-black hover:bg-white md:flex" />
                </Carousel>
            )}
        </div>
    );
};

export default MySlide;
