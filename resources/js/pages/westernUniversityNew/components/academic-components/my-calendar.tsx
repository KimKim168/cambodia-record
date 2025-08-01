import MyNoData from '@/components/my-no-data';
import { usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';

const MyCalendar = () => {
    const { schoolCalendar } = usePage().props;

    const groupedEvents = useMemo(() => {
        if (!Array.isArray(schoolCalendar)) return [];

        const groups = {};

        schoolCalendar.forEach((event) => {
            const date = new Date(event.post_date);
            const monthYear = date.toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
            });

            if (!groups[monthYear]) groups[monthYear] = [];
            groups[monthYear].push(event);
        });

        return Object.entries(groups).map(([month, events]) => ({
            month,
            Children: events,
        }));
    }, [schoolCalendar]);

    const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
    const currentMonth = groupedEvents[currentMonthIndex];

    const handlePrev = () => {
        setCurrentMonthIndex((prev) => (prev > 0 ? prev - 1 : prev));
    };

    const handleNext = () => {
        setCurrentMonthIndex((prev) => (prev < groupedEvents.length - 1 ? prev + 1 : prev));
    };

    if (groupedEvents.length === 0 || !currentMonth || currentMonth.Children.length === 0) {
        return (
            <div className="mt-16">
                <MyNoData />
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-screen-2xl px-4 py-16 text-center sm:px-16">
            {/* Month Navigation */}
            <div className="my-8 flex items-center justify-center space-x-6">
                <button
                    onClick={handlePrev}
                    className="rounded-lg border border-gray-200 p-2 shadow-sm hover:bg-gray-100 disabled:opacity-50 dark:border-gray-700 dark:hover:bg-gray-800"
                    disabled={currentMonthIndex === 0}
                >
                    <svg className="h-5 w-5 text-gray-500 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <h2 className="text-primary text-2xl font-semibold dark:text-white">{currentMonth?.month}</h2>

                <button
                    onClick={handleNext}
                    className="rounded-lg border border-gray-200 p-2 shadow-sm hover:bg-gray-100 disabled:opacity-50 dark:border-gray-700 dark:hover:bg-gray-800"
                    disabled={currentMonthIndex === groupedEvents.length - 1}
                >
                    <svg className="h-5 w-5 text-gray-500 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
            <div className="bg-primary mx-auto my-6 h-1 w-16 dark:bg-white"></div>
            {/* Events Grid */}
            <div className="grid grid-cols-1 justify-center gap-6 sm:grid-cols-2 xl:grid-cols-[repeat(auto-fit,_minmax(250px,400px))]">
                {currentMonth?.Children.map((event) => {
                    const date = new Date(event.post_date);
                    const day = date.toLocaleDateString('en-US', { day: '2-digit' });
                    const month = date.toLocaleDateString('en-US', { month: 'long' });
                    const year = date.toLocaleDateString('en-US', { year: 'numeric' });
                    return (
                        <div
                            key={event.id}
                            className="group relative overflow-hidden bg-white shadow-lg transition-all duration-300 dark:bg-gray-900 dark:shadow-md"
                        >
                            <div className="relative">
                                <img
                                    className="aspect-[9/10] w-full object-cover"
                                    src={`/assets/images/posts/${event?.images?.[0]?.image}`}
                                    alt="Event"
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-blue-950/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    <a href={`/detail/${event?.id}`} className="rounded-lg border border-white px-4 py-2 font-semibold text-white">
                                        Learn More
                                    </a>
                                </div>
                            </div>
                            <div className="flex h-full space-x-3">
                                <div className="bg-[#2c318a] px-6 py-2 text-white">
                                    <p className="text-base font-bold">{day}</p>
                                    <p className="text-base uppercase">{month}</p>
                                    <p className="text-base font-bold">{year}</p>
                                </div>
                                <div className="my-2 text-left">
                                    <h2 className="font-noto-san-extra-light dark:text-primary mb-2 line-clamp-2 text-base text-red-700">
                                        {event.title}
                                    </h2>
                                    <div
                                    className="prose line-clamp-2 dark:prose-invert w-full max-w-none"
                                    dangerouslySetInnerHTML={{ __html: event.short_description }}
                                />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MyCalendar;
