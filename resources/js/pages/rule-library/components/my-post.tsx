import { usePage } from '@inertiajs/react';

// const books = [
//     {
//         id: 1,
//         title: 'Deep Work: Rules for Focused Success in a Distracted World',
//         image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&h=600&q=80',
//     },
//     {
//         id: 2,
//         title: 'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones',
//         image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&h=600&q=80',
//     },
//     {
//         id: 3,
//         title: 'The Lean Startup: How Today’s Entrepreneurs Use Continuous Innovation',
//         image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=400&h=600&q=80',
//     },
//     {
//         id: 4,
//         title: 'The Psychology of Money: Timeless Lessons on Wealth',
//         image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=400&h=600&q=80',
//     },
//     {
//         id: 5,
//         title: 'Start with Why: How Great Leaders Inspire Everyone to Take Action',
//         image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&h=600&q=80',
//     },
//     {
//         id: 6,
//         title: 'The 7 Habits of Highly Effective People',
//         image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&h=600&q=80',
//     },
// ];

const MyPost = () => {
    const { newBooks } = usePage().props;
    // console.log(newBooks);
    return (
        <div className="container mx-auto my-10 max-w-screen-2xl px-3 lg:px-20">
            <div className="flex">
                <h2 className="my-5 text-center text-xl tracking-wide text-black after:mx-auto after:mt-2 after:block after:h-1 after:w-12 after:bg-red-500 after:transition-all after:duration-300 after:content-[''] hover:after:w-16 md:text-2xl md:after:w-24 md:hover:after:w-28 lg:text-2xl">
                    New Books
                </h2>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
                {newBooks?.map((item) => (
                    <a
                        href={`${item.link}`}
                        key={item.id}
                        className="overflow-hidden rounded-lg bg-white transition-all duration-300 hover:scale-95 hover:cursor-pointer"
                    >
                            <img
                                src={`/assets/images/items/${item?.images[0].image}`}
                                alt="image"
                                width={200}
                                height={300}
                                className="aspect-[6/9] w-full rounded-lg object-cover"
                            />

                        <div className="line-clamp-2 pt-2 text-base">
                            <h3 className="text-sm font-medium text-gray-800">{item.name}</h3>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default MyPost;
