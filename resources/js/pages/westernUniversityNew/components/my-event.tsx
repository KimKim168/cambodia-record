import { Link, usePage } from '@inertiajs/react';
import MyAllView from './news-component/my-all-view';
import useTranslation from '@/hooks/use-translation';

const MyEvent = () => {
    const { activitiesAndEvents, locale } = usePage().props;
    const { t } = useTranslation();
    if (!activitiesAndEvents || activitiesAndEvents.length === 0) {
        return <div className="mb-10"></div>; // or a loading/empty state if you want
    }
    return (
        <div className="mx-auto max-w-screen-2xl border-t border-gray-200 px-6 py-16 text-center transition-colors duration-300 sm:px-16 lg:px-20 dark:border-gray-700 dark:bg-gray-900">
            <h2 className="text-primary text-3xl font-bold sm:text-4xl dark:text-white">{t('Events')}</h2>
            <div className="bg-primary dark:bg-white mx-auto mt-5 h-1 w-16"></div>

            <div className="container mx-auto py-12">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                    {activitiesAndEvents?.children?.map((item) => (
                        <div
                            key={item.id}
                            className="group relative overflow-hidden bg-white shadow-lg transition-colors duration-300 dark:bg-gray-800 dark:shadow-gray-700"
                        >
                            {/* Image with Hover Effect */}
                            <div className="relative">
                                <img
                                    className="aspect-[9/10] w-full object-cover"
                                    src={`/assets/images/pages/${item?.images?.[0]?.image}`}
                                    alt="Event Image"
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-blue-950/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    <Link
                                        href={`/activities_and_events#event_id${item.id}`}
                                        className="rounded-lg border border-white px-4 py-2 font-semibold text-white"
                                    >
                                        {t('Learn More')}
                                    </Link>
                                </div>
                            </div>

                            {/* Event Details */}
                            <div className="p-4">
                                <h2 className="dark:text-primary line-clamp-2 font-medium text-start text-base text-red-700">
                                    {locale === 'kh' ? (item?.title_kh ?? item?.title) : item?.title}
                                </h2>
                                <div
                                    className="prose prose-p:line-clamp-2 prose-p:text-start text-sm text-gray-600 dark:text-gray-300"
                                    dangerouslySetInnerHTML={{ __html: locale === 'kh' ? (item?.short_description_kh ?? item?.short_description) : item?.short_description}}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

               {/*Bottun all view  */}
           <div className='max-w-72 mx-auto'><MyAllView url='activities_and_events' title={t('All Events')}/></div>
            {/*Bottun all view  */}
        </div>
    );
};

export default MyEvent;
