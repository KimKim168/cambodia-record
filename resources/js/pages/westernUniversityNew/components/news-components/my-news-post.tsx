import MyNoData from '@/components/my-no-data';
import { MySearchTableData } from '@/components/my-search-table-data';
import { Link, usePage } from '@inertiajs/react';
import FilterCategory from '../../SchoolLife/FilterCategory';

// Reusable card component
const PostCard = ({ item }) => (
    <Link href={`/news/${item.id}`}>
        <div className="h-full overflow-hidden border border-gray-200 bg-white shadow-lg transition hover:scale-[1.01] hover:cursor-pointer dark:border-gray-700 dark:bg-gray-900 dark:shadow-md">
            <img
                src={`/assets/images/posts/${item?.images?.[0]?.image}`}
                width={400}
                height={250}
                className="aspect-video w-full object-cover"
                alt={item.title}
            />
            <div className="p-4 text-start">
                <h2 className="font-noto-san-extra-light line-clamp-2 text-xl font-bold text-red-700 dark:text-red-400">{item?.title}</h2>
                <p
                    className="my-4 line-clamp-2 text-sm text-gray-500 dark:text-gray-300"
                    dangerouslySetInnerHTML={{ __html: item?.short_description }}
                />
            </div>
        </div>
    </Link>
);

const MyNewPost = () => {
    const { tableData } = usePage().props;
    return (
        // <div className="mx-auto max-w-screen-2xl px-4 pt-10 lg:px-20">
        //     <div className='flex h-full gap-2'>
        //         <MySearchTableData className="mb-10" />
        //         <FilterCategory />
        //     </div>
        //     {/* NEWS Section */}
        //     <div className="mb-4 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        //         <h1 className="font-noto-san-extra-light border-l-4 border-red-700 pl-4 text-3xl font-bold tracking-tight text-red-700 sm:text-4xl dark:text-white">
        //             News & Blogs
        //         </h1>
        //     </div>

        //     {tableData?.data?.length > 0 ? (
        //         <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        //             {tableData?.data.map((item) => <PostCard key={item.id} item={item} />)}
        //         </div>
        //     ) : (
        //         <MyNoData />
        //     )}
        // </div>
        <div className="mx-auto max-w-screen-2xl px-4 pt-10 lg:px-20">
            <div className="flex h-full justify-end gap-2">
                <MySearchTableData className="mb-10" />
                <FilterCategory />
            </div>

            {tableData?.data?.length > 0 ? (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {tableData?.data.map((item) => <PostCard key={item.id} item={item} />)}
                </div>
            ) : (
                <MyNoData />
            )}
        </div>
    );
};

export default MyNewPost;
