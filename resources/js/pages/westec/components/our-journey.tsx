import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import useTranslation from '@/hooks/use-translation';
import { cn } from '@/lib/utils';

export function OurJourney({ items }: { items: any[] }) {
    const { t, currentLocale } = useTranslation();

    const Colors = ['true-primary-two', 'true-primary', 'true-primary-three', 'true-primary-four', 'true-primary-five'];
    return (
        <Carousel
            opts={{
                align: 'start',
            }}
            className="w-full px-4 lg:px-16"
        >
            <CarouselContent className="-ml-10">
                {items.map((item, index) => (
                    <CarouselItem key={index} className="pl-10 sm:basis-1/2 lg:basis-1/4">
                        <div>
                            <div className="flex h-full w-full items-end">
                                <p
                                    className={cn(
                                        'text-true-primary text-true-primary-two text-true-primary-three text-true-primary-four text-true-primary-five mr-2 translate-y-[7px] text-2xl font-bold 2xl:text-4xl',
                                        `text-${Colors[index % Colors.length]}`,
                                    )}
                                >
                                    {item.code}
                                </p>
                                <div className="flex flex-1 flex-col">
                                    <span className="flex justify-center py-2">
                                        <span className="size-28 shrink-0 xl:size-32">
                                            <img
                                                src={`/assets/images/pages/${item.images[0]?.image}`}
                                                alt=""
                                                className="h-full w-full object-contain"
                                            />
                                        </span>
                                    </span>
                                    <div
                                        className={cn(
                                            'bg-true-primary mt-1.5 bg-true-primary-two bg-true-primary-three bg-true-primary-four bg-true-primary-five h-5 w-full 2xl:h-7',
                                            `bg-${Colors[index % Colors.length]}`,
                                        )}
                                    ></div>
                                </div>
                            </div>
                            <div className="flex h-full w-full items-end mt-2">
                                <p className={`text-${Colors[index % Colors.length]} invisible mr-2 translate-y-1 text-2xl font-bold 2xl:text-4xl`}>
                                    {item.code}
                                </p>
                                <div className="flex flex-1 flex-col">
                                    <p className="py-1 text-xl 2xl:text-2xl">{currentLocale == 'kh' ? item?.title_kh : item?.title}</p>
                                    <p
                                        className="text-sm 2xl:text-lg"
                                        dangerouslySetInnerHTML={{
                                            __html: currentLocale == 'kh' ? item?.short_description_kh : item?.short_description,
                                        }}
                                    ></p>
                                </div>
                            </div>
                            {/* <span className="text-3xl font-semibold">{index + 1}</span> */}
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className="mt-10 flex items-center justify-center gap-8">
                <CarouselPrevious className="relative translate-0" />
                <CarouselNext className="relative translate-0" />
            </div>
        </Carousel>
    );
}
