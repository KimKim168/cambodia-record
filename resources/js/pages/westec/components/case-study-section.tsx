import { Button } from '@/components/ui/button';
import useTranslation from '@/hooks/use-translation';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useRef, useState } from 'react';

export function CaseStudySection({ item, defaultDropDown = true }: { item: any; defaultDropDown?: boolean }) {
    const { t, currentLocale } = useTranslation();

    const [selectedData, setSelectedData] = useState('');
    const bannerRef = useRef<HTMLDivElement | null>(null);

    const handleSelect = (item: any) => {
        setSelectedData(item);
        setTimeout(() => {
            bannerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100); // slight delay ensures the state update doesn't interrupt scroll
    };

    return (
        <>
            <div className="relative bg-black" id={item?.code}>
                <img src={`/assets/images/pages/${item?.images[0]?.image}`} className="min-h-[400px] w-full object-cover" alt="" />
                <div className="absolute top-0 left-0">
                    <div className="flex flex-col p-4 text-start md:text-left lg:grid-cols-2 lg:p-16">
                        {/* <h1 className="font-proxima-nova-bold text-xl leading-[30px] text-white md:mb-4 md:text-2xl md:leading-[30px] lg:text-4xl lg:leading-[50px] 2xl:text-5xl">
                            {currentLocale == 'kh' ? item?.title_kh : item?.title}
                        </h1> */}
                        <p
                            className="font-proxima-nova-regular prose prose-p:m-0 prose-h2:m-0 prose-strong:text-white prose-h2:text-white text-base text-white capitalize md:max-w-[60%] lg:text-xl 2xl:text-3xl"
                            dangerouslySetInnerHTML={{
                                __html: currentLocale == 'kh' ? item?.short_description_kh : item?.short_description,
                            }}
                        ></p>
                    </div>
                </div>
                <div className="absolute right-0 bottom-2">
                    <div ref={bannerRef} className="h-[90px]"></div>
                    <div className="flex w-full flex-nowrap justify-center gap-2.5 px-4 py-2.5 lg:justify-end lg:px-16">
                        {selectedData != '' ? (
                            <Button className="h-7 rounded-none 2xl:h-10 2xl:text-2xl" onClick={() => handleSelect('')}>
                                {t('Show Less')} <ChevronUp />
                            </Button>
                        ) : (
                            <Button className="h-7 rounded-none 2xl:h-10 2xl:text-2xl" onClick={() => handleSelect(item)}>
                                {t('Read More')} <ChevronDown />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
            {selectedData != '' && (
                <div className="relative">
                    <div
                        className="prose mb-2 max-w-none text-xs font-medium text-white lg:text-xl xl:text-3xl"
                        dangerouslySetInnerHTML={{
                            __html: currentLocale == 'kh' ? selectedData?.long_description_kh : selectedData?.long_description,
                        }}
                    ></div>
                    <div className="border-t bg-white">
                        <div className="absolute right-4 bottom-4 lg:right-8">
                            <Button
                                size="icon"
                                className="flex w-full flex-nowrap justify-end rounded-none opacity-50"
                                onClick={() => setSelectedData('')}
                            >
                                <ChevronUp className="size-8 stroke-white stroke-1 lg:size-16" />
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
