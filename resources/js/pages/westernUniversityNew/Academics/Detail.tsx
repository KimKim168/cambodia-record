import { Link, usePage } from '@inertiajs/react';
import MyNewLayout from '../layout/MyLayout';

export default function ResourceDetail() {
    const { showData, relatedPosts } = usePage().props;

    return (
        <MyNewLayout>
            <section className="mx-auto max-w-screen-2xl px-4 py-10 sm:px-6 lg:px-20">
                {/* Main Layout */}
                <div className="flex flex-col gap-12 lg:flex-row">
                    {/* Content Area */}
                    <div className="w-full">
                        <h1 className="mb-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                            {showData?.title}
                        </h1>

                        {showData?.images?.[0]?.image && (
                            <img
                                src={`/assets/images/posts/${showData.images[0].image}`}
                                alt={showData.name}
                                className="mb-8 h-auto w-full rounded-xl object-cover"
                                loading="lazy"
                                decoding="async"
                            />
                        )}

                        <div
                            className="prose dark:prose-invert ck-content w-full max-w-none"
                            dangerouslySetInnerHTML={{ __html: showData?.long_description }}
                        />
                    </div>

                    {/* Sidebar */}
                    <div className="sticky top-8 lg:w-1/4">
                        <h2 className="mb-6 border-l-4 border-red-700 pl-2 text-2xl font-semibold text-gray-800 sm:text-3xl dark:text-gray-200">
                            Related
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6">
                            {relatedPosts?.map((item) => {
                                const date = new Date(item.post_date || item.created_at);
                                const day = date.toLocaleDateString('en-US', { day: '2-digit' });
                                const month = date.toLocaleDateString('en-US', { month: 'long' });
                                const year = date.toLocaleDateString('en-US', { year: 'numeric' });

                                return (
                                    <Link
                                        key={item.id}
                                        href={`/detail/${item.id}`}
                                        className="group block overflow-hidden bg-white shadow-sm transition-shadow hover:shadow-md dark:bg-gray-800 dark:hover:bg-gray-700"
                                    >
                                        <div className="relative">
                                            <img
                                                src={`/assets/images/posts/${item.images?.[0]?.image ?? 'placeholder.jpg'}`}
                                                alt={item.title}
                                                className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                loading="lazy"
                                                decoding="async"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center bg-blue-950/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                                <span className="rounded-lg border border-white px-4 py-2 text-xs font-semibold text-white">
                                                    Learn More
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex h-full space-x-3">
                                            {/* Date Block */}
                                            <div className=" bg-[#2c318a] px-3 py-2 text-center text-white">
                                                <p className="text-sm font-bold">{day}</p>
                                                <p className="text-sm uppercase">{month}</p>
                                                <p className="text-sm font-bold">{year}</p>
                                            </div>

                                            {/* Text Content */}
                                            <div className="flex flex-col py-2">
                                                <h3 className="mb-1 line-clamp-2 text-sm font-semibold text-red-700 dark:text-primary">
                                                    {item.title}
                                                </h3>
                                                <p className="line-clamp-2 text-xs text-gray-700 dark:text-gray-300">
                                                    {item.short_description}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </MyNewLayout>
    );
}
