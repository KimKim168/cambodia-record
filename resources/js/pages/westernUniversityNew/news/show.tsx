import { Link, usePage } from '@inertiajs/react';
import MyNewLayout from '../layout/MyLayout';

export default function show() {
    const { showData, relatedPosts } = usePage().props;

    return (
        <MyNewLayout>
            <section className="mx-auto max-w-screen-2xl px-4 py-10 sm:px-6 lg:px-20">
                {/* Main Layout */}
                <div className="flex flex-col gap-12 lg:flex-row">
                    {/* Content Area */}
                    <div className="w-full lg:w-3/4">
                        <h1 className="mb-6 text-3xl tracking-tight font-bold text-red-700 font-noto-san-extra-light sm:text-4xl dark:text-white">{showData?.title}</h1>

                        {showData?.images?.[0]?.image && (
                            <img
                                src={`/assets/images/posts/${showData.images[0].image}`}
                                alt={showData.name}
                                className="mb-8 h-auto w-full rounded-xl object-cover"
                                loading="lazy"
                                decoding="async"
                            />
                        )}
                        <section className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert ck-content max-w-none">
                            <div dangerouslySetInnerHTML={{ __html: showData?.long_description }} />
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="sticky top-8 w-full lg:w-1/4">
                        <h2 className="mb-6 text-2xl font-semibold text-gray-800 sm:text-3xl dark:text-gray-200 border-l-4 border-red-700 pl-2">Related {showData?.category_code}</h2>
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1">
                            {relatedPosts?.map((item, index) => (
                                <Link
                                    href={`/news/${item.id}`}
                                    key={index}
                                    className="group block h-full transition-shadow hover:rounded-xl hover:shadow-md"
                                >
                                    <div className="flex h-full flex-col gap-3 overflow-hidden lg:rounded-xl bg-white shadow-sm transition hover:bg-gray-50 lg:flex-row dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                        {/* Thumbnail */}
                                        <div className="relative aspect-video xl:aspect-square w-full flex-shrink-0 overflow-hidden bg-gray-100 lg:w-28 dark:bg-gray-700">
                                            <img
                                                src={`/assets/images/posts/${item.images?.[0]?.image ?? 'placeholder.jpg'}`}
                                                alt={item.name}
                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                loading="lazy"
                                                decoding="async"
                                            />
                                            {/* <div className="absolute inset-0 flex flex-col items-center justify-center bg-blue-950/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                                <a
                                                    href={`/detail/${item?.id}`}
                                                    className="rounded-lg border text-[10px] border-white px-4 py-2 font-semibold text-white"
                                                >
                                                    Learn More
                                                </a>
                                            </div> */}
                                        </div>
                                        {/* Description */}
                                        <div className="flex flex-col gap-2 p-4 lg:px-0 lg:py-4">
                                            <h3 className="line-clamp-2 text-base font-bold font-noto-san-extra-light text-red-700 dark:text-white">{item?.title}</h3>
                                            <div className="line-clamp-2 prose max-w-none dark:prose-invert text-gray-700 dark:text-gray-300">{item?.short_description}</div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </MyNewLayout>
    );
}
