// components/NewsDetail.tsx
import { usePage } from '@inertiajs/react';
import { BadgeCheck, BadgeXIcon, Paperclip } from 'lucide-react';
import MyMiltiImages from '../components/my-milti-images';
import PostRelated from '../components/post-related';
import CamboLayout from '../layout/CamboLayout';
import MyReadMore from '../components/my-read-more';

const Detail = () => {
    const { post, relatedPosts, auth } = usePage<any>().props;
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
                                <li className="flex items-center gap-2">
                                    <strong className="block text-gray-700 dark:text-gray-200">Topics:</strong>
                                    <div className="mt-1 flex flex-wrap gap-2">
                                        {post?.topics?.length > 0 ? (
                                            post.topics.map((t, i) => (
                                                <span
                                                    key={i}
                                                    className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                                >
                                                    {t.topic_name}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-gray-500">N/A</span>
                                        )}
                                    </div>
                                </li>

                                <li className="flex items-center gap-2">
                                    <strong className="block text-gray-700 dark:text-gray-200">Creators:</strong>
                                    <div className="mt-1 flex flex-wrap gap-2">
                                        {post?.creators?.length > 0 ? (
                                            post.creators.map((c, i) => (
                                                <span key={i} className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                                                    {c.name}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-gray-500">N/A</span>
                                        )}
                                    </div>
                                </li>

                                <li className="flex items-center gap-2">
                                    <strong className="block text-gray-700 dark:text-gray-200">People:</strong>
                                    <div className="mt-1 flex flex-wrap gap-2">
                                        {post?.peoples?.length > 0 ? (
                                            post.peoples.map((p, i) => (
                                                <span key={i} className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                                                    {p.name}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-gray-500">N/A</span>
                                        )}
                                    </div>
                                </li>

                                <li className="flex items-center gap-2">
                                    <strong className="block text-gray-700 dark:text-gray-200">Types:</strong>
                                    <div className="mt-1 flex flex-wrap gap-2">
                                        {post?.types?.length > 0 ? (
                                            post.types.map((t, i) => (
                                                <span key={i} className="rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-800">
                                                    {t.label}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-gray-500">N/A</span>
                                        )}
                                    </div>
                                </li>

                                <li className="flex items-center gap-2">
                                    <strong className="block text-gray-700 dark:text-gray-200">Locations:</strong>
                                    <div className="mt-1 flex flex-wrap gap-2">
                                        {post?.locations?.length > 0 ? (
                                            post.locations.map((l, i) => (
                                                <span key={i} className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
                                                    {l.location_name}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-gray-500">N/A</span>
                                        )}
                                    </div>
                                </li>

                                <li className="flex items-center gap-2">
                                    <strong className="block text-gray-700 dark:text-gray-200">Publisher:</strong>
                                    <p className="mt-1 text-gray-800 dark:text-gray-300">{post?.publisher?.name || 'N/A'}</p>
                                </li>

                                <li className="flex items-center gap-2">
                                    <strong className="block text-gray-700 dark:text-gray-200">Publishing Country:</strong>
                                    <p className="mt-1 text-gray-800 dark:text-gray-300">{post?.publishing_countries_code || 'N/A'}</p>
                                </li>

                                <li className="flex items-center gap-2">
                                    <strong className="block text-gray-700 dark:text-gray-200">Publishing Date:</strong>
                                    <p className="mt-1 text-gray-800 dark:text-gray-300">{formatDate(post?.publishing_date)}</p>
                                </li>

                                <li className="flex items-center gap-2">
                                    <strong className="block text-gray-700 dark:text-gray-200">Social Media Link:</strong>
                                    <a target="_blank" href={post?.link} className="mt-1 inline-block break-words text-blue-600 hover:underline">
                                        {post?.link || 'N/A'}
                                    </a>
                                </li>

                                <li className="flex items-center gap-2">
                                    <strong className="block text-gray-700 dark:text-gray-200">Website Link:</strong>
                                    <a target="_blank" href={post?.web_link} className="mt-1 inline-block break-words text-blue-600 hover:underline">
                                        {post?.web_link || 'N/A'}
                                    </a>
                                </li>
                                <li>
                                    {post?.verify_status == 'verify' ? (
                                        <span className="inline-flex items-center gap-1 text-base font-bold text-blue-600">
                                            <BadgeCheck className="h-5 w-5" />
                                            Verified
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 text-base font-bold text-yellow-600">
                                            <BadgeXIcon className="h-5 w-5" />
                                            Unverified
                                        </span>
                                    )}
                                </li>
                                <li>
                                    <div className="flex flex-col gap-3">
                                        {post?.file_status === 'public' || (post?.file_status === 'private' && auth?.user) ? (
                                            post?.upload_file?.length > 0 ? (
                                                post?.upload_file.map((file) => {
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
                                                                <p className="truncate font-medium text-slate-800 group-hover:text-blue-800">
                                                                    {displayName}
                                                                </p>
                                                            </div>
                                                        </a>
                                                    );
                                                })
                                            ) : (
                                                <p>No files available</p>
                                            )
                                        ) : (
                                            <p></p>
                                        )}
                                    </div>
                                </li>
                                <li>
                                    <MyReadMore longDescription={post?.long_description}/>
                                </li>
                            </ul>
                        </div>

                        {/* Right content - image */}
                        <div className="w-full">
                            <MyMiltiImages images={post} />
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
