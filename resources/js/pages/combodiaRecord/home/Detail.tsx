// components/NewsDetail.tsx
import { usePage } from '@inertiajs/react';
import CamboLayout from '../layout/CamboLayout';
import CambodiaRecord from '../components/cambodia-record';

const Detail = () => {
    const { post} = usePage().props;
    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        }).format(date);
    };
    return (
        <CamboLayout>
            <div className="mx-auto p-4 md:p-8">
                <div className="bg-white px-4 py-12 sm:px-6 lg:px-8">
                    <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-10 md:grid-cols-3">
                        {/* Left content */}
                        <div className="space-y-4 md:col-span-2">
                            <div>
                                <h2 className="mb-2 text-2xl font-bold text-gray-900">{post?.title}</h2>
                                <p className="text-base text-gray-600">{post?.short_description}</p>
                            </div>

                            <ul className="space-y-1 text-sm text-gray-700">
                                <li>
                                    <span className="text-base leading-relaxed">Creator :</span> {post?.creator?.name}
                                </li>
                                <li>
                                    <span className="text-base leading-relaxed">Types of media :</span> {post?.type}
                                </li>
                                <li>
                                    <span className="text-base leading-relaxed">Subject :</span> {post?.subject}
                                </li>
                                <li>
                                    <span className="text-base leading-relaxed">Publisher :</span> {post?.publisher?.name ?? 'Unknown'}
                                </li>
                                <li>
                                    <span className="text-base leading-relaxed">Date of publishing :</span> {formatDate(post?.post_date)}
                                </li>
                                <li>
                                    <span className="text-base leading-relaxed">Publishing country :</span> {post?.publishing_country?.name || 'N/A'}
                                </li>
                                <li className="font-kantumruy text-base leading-relaxed text-gray-800">
                                    <span dangerouslySetInnerHTML={{ __html: post?.long_description }} />
                                </li>
                            </ul>
                        </div>

                        {/* Right content - image */}
                        <div className="w-full">
                            <div className="overflow-hidden rounded-2xl shadow-md transition-transform duration-300 hover:scale-105">
                                <img
                                    src={`/assets/images/posts/${post?.images?.[0]?.image}`}
                                    alt="Main"
                                    className="aspect-video h-full w-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="my-4 border-t border-gray-300" />
            </div>
            <div className="mx-auto mb-16 max-w-screen-xl px-4 md:px-8 xl:px-0">
                <p className="mb-4">Cambodia's Record</p>
                <CambodiaRecord/>
            </div>
        </CamboLayout>
    );
};

export default Detail;
