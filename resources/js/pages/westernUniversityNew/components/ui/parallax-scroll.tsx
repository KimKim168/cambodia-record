'use client';

import { cn } from '@/lib/utils';
import { usePage } from '@inertiajs/react';

type ImageItem = {
    image: string;
    title: string;
    title_kh: string;
    long_description: string;
    long_description_kh: string;
    images: { image: string }[];
    type?: string;
    link?: string;
    content?: string;
};

type ParallaxScrollProps = {
    images: ImageItem[];
    className?: string;
};

export const ParallaxScroll = ({ images, className }: ParallaxScrollProps) => {
    const renderImageCard = (item: ImageItem, idx: number) => {
        const imgSrc = item.images[0]?.image ? `/assets/images/pages/${item.images[0].image}` : '/assets/images/placeholder.jpg'; // Optional placeholder
        const href = item.type && item.link ? item.link : (item.content ?? '#');
        const { locale } = usePage().props;

        return (
            <div key={idx} className="group w-full">
                <a href={href} className="block h-full">
                    <div className="flex h-full transform flex-col overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 ease-in-out group-hover:scale-[1.02] group-hover:shadow-xl dark:bg-gray-900 dark:shadow-lg">
                        <div className="overflow-hidden">
                            <img
                                src={imgSrc}
                                alt={item.title}
                                className="h-64 w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="flex flex-1 flex-col p-5 text-gray-800 dark:text-white">
                            <h3 className="mb-2 text-lg font-bold">{locale === 'kh' ? (item.title_kh ?? item.title) : item.title}</h3>
                            <p
                                className="prose prose-base line-clamp-[10] text-base whitespace-pre-line text-gray-600 dark:text-gray-300"
                                dangerouslySetInnerHTML={{
                                    __html: locale === 'kh' ? (item.long_description_kh ?? item.long_description) : item.long_description,
                                }}
                            />
                        </div>
                    </div>
                </a>
            </div>
        );
    };

    return (
        <div className={cn('w-full', className)}>
            <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-10 px-6 pt-12 pb-20 sm:grid-cols-2 xl:grid-cols-3 xl:px-16">
                {images.map((item, idx) => renderImageCard(item, idx))}
            </div>
        </div>
    );
};
