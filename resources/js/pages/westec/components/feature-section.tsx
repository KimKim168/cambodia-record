import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import useTranslation from '@/hooks/use-translation';
import { ChevronUp } from 'lucide-react';
import { useRef, useState } from 'react';

export function FeatureSection({ item, defaultDropDown = true }: { item: any; defaultDropDown?: boolean }) {
    const { t, currentLocale } = useTranslation();

    const [selectedData, setSelectedData] = useState(defaultDropDown ? item?.children[0] : null);
    const bannerRef = useRef<HTMLDivElement | null>(null);

    const handleSelect = (item: any) => {
        setSelectedData(item);
        setTimeout(() => {
            bannerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 0); // slight delay ensures the state update doesn't interrupt scroll
    };

    return (
        <>
            <div className="relative bg-black" id={item?.code}>
                <img src={`/assets/images/pages/${item?.images[0]?.image}`} className="min-h-[260px] w-full object-cover" alt="" />
                <div className="absolute top-0 left-0">
                    <div className="flex flex-col p-4 text-start md:text-left lg:grid-cols-2 lg:p-16">
                        <h1 className="font-proxima-nova-bold text-xl leading-[30px] text-white md:mb-4 md:text-2xl md:leading-[30px] lg:text-4xl lg:leading-[50px] 2xl:text-5xl">
                            {currentLocale == 'kh' ? item?.title_kh : item?.title}
                        </h1>
                        <p
                            className="font-proxima-nova-regular text-base text-white capitalize md:max-w-[65%] lg:text-xl 2xl:text-3xl"
                            dangerouslySetInnerHTML={{
                                __html: currentLocale == 'kh' ? item?.short_description_kh : item?.short_description,
                            }}
                        ></p>
                    </div>
                </div>
                <div className="absolute right-0 bottom-0 left-0">
                    <div ref={bannerRef} className="h-[90px]"></div>
                    <ScrollArea className="w-full whitespace-nowrap">
                        {item?.children?.length > 0 && (
                            <div className="flex w-full flex-nowrap justify-end gap-2.5 px-4 py-2.5 lg:justify-end lg:px-16">
                                {item?.children?.map((child, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSelect(child)}
                                        className={`${
                                            child.id === selectedData?.id ? 'border border-white' : ''
                                        } bg-true-primary/45 flex aspect-square size-[100px] shrink-0 flex-col items-center justify-center p-1 transition-transform duration-300 hover:scale-110 lg:size-[125px] lg:p-2 2xl:size-[170px]`}
                                    >
                                        <img
                                            src={`/assets/images/pages/${child.images[0]?.image}`}
                                            className="w-[40px] object-contain lg:w-[50px]"
                                            alt=""
                                        />
                                        <p className="mt-2 line-clamp-3 text-center text-[10px] whitespace-normal text-white lg:text-xs 2xl:text-base">
                                            {currentLocale == 'kh' ? child?.title_kh : child?.title}
                                        </p>
                                    </button>
                                ))}
                            </div>
                        )}

                        <ScrollBar orientation="horizontal" className="h-2" />
                    </ScrollArea>
                </div>
            </div>
            {selectedData != null && (
                <div className="relative bg-black">
                    <div
                        className="prose mb-2 max-w-none text-xs font-medium text-white lg:text-xl xl:text-3xl"
                        dangerouslySetInnerHTML={{
                            __html: currentLocale == 'kh' ? selectedData?.long_description_kh : selectedData?.long_description,
                        }}
                    ></div>
                    <div className="absolute right-4 lg:right-8 bottom-2">
                        <Button size='icon' className="flex w-full flex-nowrap justify-end rounded-none opacity-50" onClick={() => setSelectedData(null)}>
                            <ChevronUp className="size-8 lg:size-16 stroke-white stroke-1" />
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}
