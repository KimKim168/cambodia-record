import useTranslation from '@/hooks/use-translation';
import { useState } from 'react';

const OurCommitmentCard = ({ item, i }: { item: any; i: number }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const { t, currentLocale } = useTranslation();

    const handleCardClick = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div
            className="card perspective h-full border lg:border-none"
            // onClick={handleCardClick}
        >
            <div className={`card__content relative h-full cursor-pointer py-4 transition-transform duration-700 ${isFlipped ? 'rotate-y-180' : ''}`}>
                {/* Front */}
                <div className="card__front flex items-center gap-8 p-8 text-start text-white backface-hidden">
                    <div className="flex w-full items-center justify-start gap-8">
                        <span className="size-20 xl:size-32 shrink-0">
                            <img src={`/assets/images/pages/${item.images[0]?.image}`} alt="" className="h-full w-full object-contain" />
                        </span>
                        <div>
                            <p className="mt-4 text-start text-xl whitespace-pre-line text-white 2xl:text-2xl">
                                {currentLocale == 'kh' ? item?.title_kh : item?.title}
                            </p>
                            <p
                                className="mt-4 text-start text-base whitespace-pre-line 2xl:text-lg"
                                dangerouslySetInnerHTML={{ __html: currentLocale == 'kh' ? item?.short_description_kh : item?.short_description }}
                            ></p>
                        </div>
                    </div>
                </div>

                {/* Back */}
                {/* <div className="card__back absolute top-0 right-0 bottom-0 left-0 flex h-full rotate-y-180 items-center justify-center gap-8 truncate bg-white p-8 backface-hidden">
                    <p className="text-primary text-7xl font-bold">{i}</p>
                    <div className="text-true-primary flex w-full flex-col items-start justify-start">
                        <p className="text-start text-xl font-bold 2xl:text-2xl">{currentLocale == 'kh' ? item?.title_kh : item?.title}</p>
                        <p
                            className="mt-4 text-start text-base whitespace-pre-line 2xl:text-lg"
                            dangerouslySetInnerHTML={{ __html: currentLocale == 'kh' ? item?.short_description_kh : item?.short_description }}
                        ></p>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default OurCommitmentCard;
