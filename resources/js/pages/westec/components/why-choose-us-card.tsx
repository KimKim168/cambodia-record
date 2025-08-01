import useTranslation from '@/hooks/use-translation';
import { useState } from 'react';

const WhyChooseUsCard = ({ item, i }: { item: any; i: number }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const { t, currentLocale } = useTranslation();

    const handleCardClick = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="card perspective h-full border lg:border-none" onClick={handleCardClick}>
            <div className={`card__content h-full relative cursor-pointer py-4 transition-transform duration-700 ${isFlipped ? 'rotate-y-180' : ''}`}>
                {/* Front */}
                <div className="card__front flex items-center gap-8 p-8 text-start text-white backface-hidden">
                    <p className="text-7xl font-bold">{i}</p>
                    <div className="flex w-full flex-col items-center justify-start">
                        <span className="size-24">
                            <img src={`/assets/images/pages/${item.images[0]?.image}`} alt="" className="h-full w-full object-contain" />
                        </span>
                        <p className="mt-4 text-center text-xl whitespace-pre-line text-white 2xl:text-2xl">
                            {currentLocale == 'kh' ? item?.title_kh : item?.title}
                        </p>
                    </div>
                </div>

                {/* Back */}
                <div className="card__back h-full absolute top-0 right-0 bottom-0 left-0 flex rotate-y-180 items-center justify-center gap-8 truncate bg-white p-8 backface-hidden">
                    <p className="text-primary text-7xl font-bold">{i}</p>
                    <div className="text-true-primary flex w-full flex-col items-start justify-start">
                        <p className="text-start text-xl font-bold 2xl:text-2xl">{currentLocale == 'kh' ? item?.title_kh : item?.title}</p>
                        <p
                            className="mt-4 text-start text-base whitespace-pre-line 2xl:text-lg"
                            dangerouslySetInnerHTML={{ __html: currentLocale == 'kh' ? item?.short_description_kh : item?.short_description }}
                        ></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUsCard;
