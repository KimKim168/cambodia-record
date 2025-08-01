import { Link } from "@inertiajs/react";
import { useState } from "react";

const books = [
  {
    id: 1,
    title: "Becoming good at readingBecoming good at reading ",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
    tag: "New",
    rating: 4.5,
    category: "Education",
  },
  {
    id: 2,
    title: "Cambodia Book Fair",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
    tag: "Event",
    rating: 4.0,
    category: "Event",
  },
  {
    id: 3,
    title: "E-Invoicing Mandatory Next Year",
    image: "/assets/demo-images/rule-images/image4.png",
    tag: "Featured",
    rating: 5,
    category: "Business",
  },
  {
    id: 4,
    title: "Creative Reading Skills",
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=800&q=80",
    tag: "Popular",
    rating: 3.5,
    category: "Education",
  },
  {
    id: 5,
    title: "Marketing for Beginners",
    image: "/assets/demo-images/rule-images/image5.jpeg",
    tag: "New",
    rating: 4.2,
    category: "Business",
  },
  {
    id: 6,
    title: "Digital Skills in 2025",
    image: "/assets/demo-images/rule-images/image4.png",
    tag: "Trending",
    rating: 4.8,
    category: "Technology",
  },
  {
    id: 8,
    title: "Leadership That Lasts",
    image: "https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=800&q=80",
    tag: "Featured",
    rating: 4.7,
    category: "Business",
  },
  {
    id: 9,
    title: "AI and the Future of Work",
    image: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&w=800&q=80",
    tag: "Tech",
    rating: 5,
    category: "Technology",
  },
];


const MyDatabases = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredBooks =
    selectedCategory === "All"
      ? books
      : books.filter((b) => b.category === selectedCategory);

  return (
    <section className="max-w-screen-2xl mx-auto px-4 lg:px-20 py-14">
      {/* Title */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
          Top Book Picks
        </h2>
        {/* <p className="text-gray-500 dark:text-gray-300 mt-2">
          Browse the latest and best reads
        </p> */}
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="group relative bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-xl overflow-hidden transition cursor-pointer"
          >
            {/* Image with overlay */}
            <div className="relative overflow-hidden">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Gradient Overlay + Button */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition flex items-end justify-center p-4">
                <Link
                  href={`/detail/${book.id}`}
                  className="bg-white text-blue-600 text-xs px-4 py-1.5 rounded-full font-medium hover:bg-yellow-400 hover:text-white transition"
                >
                  Read Now
                </Link>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-1">
              <h3 className="text-base font-semibold text-gray-800 dark:text-white line-clamp-2">
                {book.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyDatabases;
