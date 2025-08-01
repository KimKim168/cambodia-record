import useTranslation from '@/hooks/use-translation';
import { Link, usePage } from '@inertiajs/react';
import MyAllView from './news-component/my-all-view';
// import { CalendarClock } from 'lucide-react';

// const newsItems = [
//     {
//         id: 1,
//         title: 'Liberal Arts Colleges Rankings',
//         description: 'Liberal Arts Colleges emphasize undergraduate education and award at least half of their degrees in the liberal arts fields of study.',
//         image: 'assets/demo-images/banner5.jpg',
//     },
//     {
//         id: 2,
//         title: 'Ways Parents and Counselors Can Help Students Earn Scholarships',
//         description: 'Liberal Arts Colleges emphasize undergraduate education and award at least half of their degrees in the liberal arts fields of study.',
//         image: 'assets/demo-images/banner3.jpg',
//     },
//     {
//         id: 3,
//         title: 'Ways Parents and Counselors Can Help Students Earn Scholarships',
//         description: 'Liberal Arts Colleges emphasize undergraduate education and award at least half of their degrees in the liberal arts fields of study.',
//         image: 'assets/demo-images/banner3.jpg',
//     },
//     {
//         id: 4,
//         title: 'Ways Parents and Counselors Can Help Students Earn Scholarships',
//         description: 'Liberal Arts Colleges emphasize undergraduate education and award at least half of their degrees in the liberal arts fields of study.',
//         image: 'assets/demo-images/banner4.jpg',
//     },
//     {
//         id: 5,
//         title: 'Liberal Arts Colleges Rankings',
//         description: 'Liberal Arts Colleges emphasize undergraduate education and award at least half of their degrees in the liberal arts fields of study.',
//         image: 'assets/demo-images/banner3.jpg',
//     },
//     {
//         id: 6,
//         title: 'Liberal Arts Colleges Rankings',
//         description: 'Liberal Arts Colleges emphasize undergraduate education and award at least half of their degrees in the liberal arts fields of study.',
//         image: 'assets/demo-images/banner3.jpg',
//     },
// ];

const MyLastestNew = () => {
    const { tableData, locale } = usePage().props;
    const { t } = useTranslation();
    const fontClass = locale === 'kh' ? 'font-kantumruy' : '';
      if (!tableData || tableData.length === 0) {
        return <div className='mb-10'></div>; // or a loading/empty state if you want
    }

    return (
        <div className="mx-auto max-w-screen-2xl px-6 py-12 text-center dark:bg-gray-900 sm:px-20 transition-colors duration-300">
            <h2 className="text-4xl font-bold text-primary dark:text-white sm:text-4xl">{t('Latest News')}</h2>
            <div className="mx-auto mt-5 h-1 w-16 bg-primary dark:bg-white" />

            <div className="mx-auto my-12 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
                {tableData?.map((item) => (
                    <a
                        key={item.id}
                        href={`/detail/${item.id}`}
                        className="overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg hover:cursor-pointer transition-all duration-300"
                    >
                        <img
                            src={`/assets/images/posts/${item?.images?.[0]?.image}`}
                            width={400}
                            height={250}
                            className="aspect-video w-full object-cover"
                            alt={item?.title}
                        />
                        <div className="p-4 text-start">
                            <h2 className={`text-xl font-medium line-clamp-2 text-red-700 dark:text-red-400 ${fontClass}`}>
                                {locale === 'kh' ? (item.title_kh ?? item.title) : item.title}
                            </h2>
                            <p className="my-2 text-gray-500 dark:text-gray-300">
                                {locale === 'kh' ? (item.short_description_kh ?? item.short_description) : item.short_description}
                            </p>
                            {/* Uncomment to show time info
                            <div className="mt-3 flex items-center text-sm text-blue-950 dark:text-white">
                                <CalendarClock className="mr-2 h-4 w-4" />
                                <span>2 days ago</span>
                            </div>
                            */}
                        </div>
                    </a>
                ))}
            </div>
{/* 
            <Link
                href="/news"
                className="inline-flex items-center mt-6 px-6 py-3 bg-[#e31c24] text-white rounded-md shadow-md transition duration-500 hover:bg-blue-950"
            >
                {t('See More')}
            </Link> */}
            <div className='max-w-50 mx-auto'><MyAllView url='news' title={t('See More')}/></div>
        </div>
    );
};

export default MyLastestNew;
