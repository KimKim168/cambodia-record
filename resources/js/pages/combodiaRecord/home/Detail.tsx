// components/NewsDetail.tsx
import { usePage } from '@inertiajs/react';
import { Paperclip } from 'lucide-react';
import PostRelated from '../components/post-related';
import CamboLayout from '../layout/CamboLayout';

const Detail = () => {
    const { post, relatedPosts } = usePage().props;
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
                                    <span className="text-base leading-relaxed">Publisher :</span> {post?.publisher?.name || 'Unknown'}
                                </li>
                                <li>
                                    <span className="text-base leading-relaxed">Date of publishing :</span> {formatDate(post?.post_date)}
                                </li>
                                <li>
                                    <span className="text-base leading-relaxed">Publishing country :</span> {post?.publishing_country?.name || 'N/A'}
                                </li>
                                <li>
                                    <div className="flex flex-col gap-3">
                                        {post?.upload_file?.map((file) => {
                                            const displayName = file.file_name.substring(file.file_name.indexOf('_') + 1);

                                            return (
                                                <a
                                                    key={file.id}
                                                    href={`/assets/files/videos/${file.file_name}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group flex items-center gap-3 rounded-lg border bg-slate-50 p-3 transition-all hover:border-blue-500 hover:bg-blue-50"
                                                >
                                                    <div className="flex-shrink-0 rounded-md bg-slate-200 p-2 group-hover:bg-blue-100">
                                                        <Paperclip className="h-5 w-5 text-slate-600 group-hover:text-blue-600" />
                                                    </div>
                                                    <div className="flex-grow overflow-hidden">
                                                        <p className="truncate font-medium text-slate-800 group-hover:text-blue-800">{displayName}</p>
                                                    </div>
                                                </a>
                                            );
                                        })}
                                    </div>
                                </li>
                                {/* <li className="font-kantumruy text-base leading-relaxed text-gray-800">
                                    <span dangerouslySetInnerHTML={{ __html: post?.long_description }} />
                                </li> */}
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
                <p className="mb-4">Related</p>
                <PostRelated relatedPosts={relatedPosts} />
            </div>
        </CamboLayout>
    );
};

export default Detail;
