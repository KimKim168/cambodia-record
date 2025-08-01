import { Link } from '@inertiajs/react';
import { useState } from 'react';

const books = [
    {
        id: 1,
        title: 'Becoming good at readingBecoming good at reading ',
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
        tag: 'New',
        rating: 4.5,
        category: 'Education',
    },
    {
        id: 2,
        title: 'Cambodia Book Fair',
        image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80',
        tag: 'Event',
        rating: 4.0,
        category: 'Event',
    },
    {
        id: 3,
        title: 'E-Invoicing Mandatory Next Year',
        image: '/assets/demo-images/rule-images/image4.png',
        tag: 'Featured',
        rating: 5,
        category: 'Business',
    },
    {
        id: 4,
        title: 'Creative Reading Skills',
        image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=800&q=80',
        tag: 'Popular',
        rating: 3.5,
        category: 'Education',
    },
    {
        id: 5,
        title: 'Marketing for Beginners',
        image: '/assets/demo-images/rule-images/image5.jpeg',
        tag: 'New',
        rating: 4.2,
        category: 'Business',
    },
    {
        id: 6,
        title: 'Digital Skills in 2025',
        image: '/assets/demo-images/rule-images/image4.png',
        tag: 'Trending',
        rating: 4.8,
        category: 'Technology',
    },
    {
        id: 8,
        title: 'Leadership That Lasts',
        image: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=800&q=80',
        tag: 'Featured',
        rating: 4.7,
        category: 'Business',
    },
    {
        id: 9,
        title: 'AI and the Future of Work',
        image: 'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&w=800&q=80',
        tag: 'Tech',
        rating: 5,
        category: 'Technology',
    },
];

const MyResources = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredBooks = selectedCategory === 'All' ? books : books.filter((b) => b.category === selectedCategory);

    return (
        <section className="mx-auto max-w-screen-2xl px-4 py-14 lg:px-20">
            {/* Title */}
            <div className="mx-auto mb-10 max-w-4xl text-center">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Top Book Picks</h2>
                <p className="mt-2 text-gray-500 dark:text-gray-300">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias necessitatibus ipsam itaque deleniti distinctio dolore. Quam,
                    doloribus aperiam nam iusto, omnis corporis ipsam, vero deserunt quae vel officia neque culpa.
                </p>
            </div>

            {/* Grid */}
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredBooks.map((book) => (
                    <div
                        key={book.id}
                        className="group relative cursor-pointer overflow-hidden rounded-xl bg-white shadow transition hover:shadow-xl dark:bg-gray-800"
                    >
                        {/* Image with overlay */}
                        <div className="relative overflow-hidden">
                            <img
                                src={book.image}
                                alt={book.title}
                                className="h-60 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />

                            {/* Gradient Overlay + Button */}
                            <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/60 to-transparent p-4 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
                                <Link
                                    href={`/detail/${book.id}`}
                                    className="rounded-full bg-white px-4 py-1.5 text-xs font-medium text-blue-600 transition hover:bg-yellow-400 hover:text-white"
                                >
                                    Read Now
                                </Link>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-1 p-4">
                            <h3 className="line-clamp-2 text-base font-semibold text-gray-800 dark:text-white">{book.title}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MyResources;
