import useTranslation from '@/hooks/use-translation';
import { usePage } from '@inertiajs/react';

const MyHeroHistory = () => {
    const { ourHestory, locale } = usePage().props;
    return (
        <section className="px-6 pt-16 lg:px-20">
            <div className="mx-auto grid max-w-screen-xl gap-16 lg:grid-cols-2">
                {/* Text Section */}
                <div className="text-primary">
                    <h1 className="mb-4  leading-tight font-bold tracking-tight text-3xl md:text-4xl">{locale === 'kh' ? (ourHestory?.title_kh ?? ourHestory?.title) : ourHestory?.title}</h1>
                    <div className="bg-primary mb-4 h-[3px] w-20" />
                    <div 
                        className="max-w-[70ch] prose prose-p:dark:text-white text-base leading-relaxed whitespace-pre-line dark:text-white"
                        dangerouslySetInnerHTML={{ __html: locale === 'kh' ? (ourHestory?.long_description_kh ?? ourHestory?.long_description) : ourHestory?.long_description }}
                    ></div>
                </div>
                {/* Image Section */}
                <div className="aspect-[4/3] w-full transform overflow-hidden rounded-lg transition duration-500 hover:scale-105">
                    <img
                        src={`/assets/images/pages/${ourHestory?.images?.[0]?.image || 'default.jpg'}`}
                        alt={ourHestory?.title || 'History image'}
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>
        </section>
    );
};

export default MyHeroHistory;
