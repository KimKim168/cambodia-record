import { Link, usePage } from '@inertiajs/react';
import MyAllView from './news-component/my-all-view';
import useTranslation from '@/hooks/use-translation';

const MyNewMiddleSection = () => {
    const { outreachPrograms, locale } = usePage().props;
    const { t } = useTranslation();
    if (!outreachPrograms || outreachPrograms?.lengt == 0) {
        return <div className="my-10"></div>;
    }
    return (
        <div className="bg-blue-950 dark:bg-gray-900">
            <div className="mx-auto grid max-w-screen-2xl items-center lg:grid-cols-2">
                <div className="h-full w-full">
                    <img src={`/assets/images/pages/${outreachPrograms?.images?.[0]?.image}`} className="h-full w-full object-cover" />
                </div>

                <div className="h-full w-full px-6 py-12 text-white sm:px-10 md:p-24">
                    <h2 className="text-4xl font-bold">{locale === 'kh' ? (outreachPrograms?.title_kh ?? outreachPrograms?.title) : outreachPrograms?.title}</h2>
                    <div className="my-5 h-1 w-16 bg-white"></div>
                    <div className="prose line-clamp-2 text-gray-300" dangerouslySetInnerHTML={{ __html: locale === 'kh' ? (outreachPrograms?.long_description_kh ?? outreachPrograms?.long_description) : outreachPrograms?.long_description }}></div>
                    {outreachPrograms?.children?.map((item) => (
                        <Link href={`/outreach_programs/${item.id}`}>
                            <div className="mt-6 flex overflow-hidden bg-white text-gray-800 shadow-md">
                                <img src={`/assets/images/pages/${item?.images?.[0]?.image}`} alt="Course Image" className="w-1/4 object-cover" />
                                <div className="w-3/4 space-y-2 p-4">
                                    <h3 className="text-lg font-semibold text-red-700">{locale === 'kh' ? (item?.title_kh ?? item?.title) : item?.title}</h3>
                                    <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: locale === 'kh' ? (item?.short_description_kh ?? item?.short_description) : item?.short_description }}></div>
                                </div>
                            </div>
                        </Link>
                    ))}
                    {outreachPrograms?.children?.length >= 3 && (
                        <div className='mt-6 mx-auto '><MyAllView url='outreach_programs' title={t('All Outreach Programs')}/></div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyNewMiddleSection;
