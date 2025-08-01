import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from './ui/dialog';

const videos = [
    // Url MP4
    {
        id: 1,
        src: 'https://www.youtube.com/embed/J0NuOlA2xDc?si=IiGdSgybkKc3-Uem',
        title: 'Video 1',
        thumb: '/assets/nokor-tech/images/banners/banner1.png',
    },
    // Iframe
    {
        id: 2,
        src: '<iframe width="560" height="315" src="https://www.youtube.com/embed/q1qKv5TBaOA?si=DLEjp-qL6slnc09p" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
        title: 'Video 2',
        thumb: '/assets/nokor-tech/images/thumb/1.png',
    },
    // Youtube Embed
    {
        id: 3,
        src: 'https://www.youtube.com/embed/J0NuOlA2xDc?si=IiGdSgybkKc3-Uem',
        title: 'Video 2',
        thumb: '/assets/nokor-tech/images/thumb/2.png',
    },
    // Locale
    {
        id: 3,
        src: 'https://www.youtube.com/embed/J0NuOlA2xDc?si=IiGdSgybkKc3-Uem',
        title: 'Video 3',
        thumb: '/assets/nokor-tech/images/banners/banner3.png',
    },
];

export default function MyVideoGallery() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            console.log(`Currently displaying: ${videos[currentIndex].title}`);
        }
    }, [currentIndex, isOpen]);

    const getVideoUrl = (src: string) => {
        // Check if the src is an iframe HTML string
        const iframeRegex = /<iframe.*?src="(.*?)"/;
        const match = src.match(iframeRegex);
        return match ? match[1] : src; // Return the extracted URL or the original src
    };

    const nextSlide = () => {
        if (currentIndex < videos.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevIndex) => prevIndex - 1);
        }
    };

    return (
        <>
        <div className="max-w-screen-2xl lg:px-20 container mx-auto px-3 my-10">
      <div className="flex">
        <h2 className="text-xl md:text-2xl text-center lg:text-2xl text-black my-5 tracking-wide 
          after:content-[''] after:block after:w-8 md:after:w-10 after:h-1 after:bg-red-500 
          after:mx-auto after:mt-2 after:transition-all after:duration-300 
          hover:after:w-10 md:hover:after:w-12">
          Videos
        </h2>
      </div>
      <div >
         <div className={`grid grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4`}>
                {videos.map((item, index) => (
                    <div
                        key={index}
                        className="group cursor-pointer"
                        onClick={() => {
                            setCurrentIndex(index); // Set current video index
                            setIsOpen(true); // Open the lightbox
                        }}
                    >
                        <div className="aspect-w-16 aspect-h-9 relative w-full overflow-hidden rounded-xl bg-black">
                            <img
                                width={400}
                                height={400}
                                src={item.thumb} // Replace with dynamic thumbnail if available
                                alt={item.title}
                                className="aspect-video w-full transform object-cover transition-all duration-300 group-hover:scale-105"
                            />
                            <span className="group-hover:bg-primary bg-primary/80 absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full border-[0.5px] p-1.5 text-white">
                                <Play size={24} />
                            </span>
                        </div>
                        <div className="mt-1 text-center text-sm font-medium text-gray-700 group-hover:text-blue-500">{item.title}</div>
                    </div>
                ))}
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="flex h-full w-full flex-col border-none bg-black px-14">
                    <DialogTitle className="hidden" />
                    <DialogDescription className="hidden" />
                    <div className="relative flex-grow">
                        <iframe
                            src={`${getVideoUrl(videos[currentIndex].src)}?&autoplay=1`} // Ensure autoplay works on YouTube
                            className="h-full w-full rounded-2xl"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="group absolute top-1/2 left-2 -translate-y-1/2 transform"
                        onClick={prevSlide}
                        aria-label="Previous video"
                        disabled={currentIndex === 0} // Disable button if on the first video
                    >
                        <ChevronLeft className="text-white group-hover:text-black" size={28} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="group absolute top-1/2 right-2 -translate-y-1/2 transform"
                        onClick={nextSlide}
                        aria-label="Next video"
                        disabled={currentIndex === videos.length - 1} // Disable button if on the last video
                    >
                        <ChevronRight className="text-white group-hover:text-black" size={28} />
                    </Button>
                </DialogContent>
            </Dialog>
      </div>
    </div>
           
        </>
    );
}
