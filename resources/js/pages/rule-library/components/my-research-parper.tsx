import { Link, usePage } from "@inertiajs/react";

// const books = [
//   {
//     id: 1,
//     title: "Deep Work: Rules for Focused Success in a Distracted World",
//     image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&h=600&q=80",
//   },
//   {
//     id: 2,
//     title: "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones",
//     image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&h=600&q=80",
//   },
//   {
//     id: 3,
//     title: "The Lean Startup: How Today’s Entrepreneurs Use Continuous Innovation",
//     image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&h=600&q=80",
//   },
//   {
//     id: 4,
//     title: "The Psychology of Money: Timeless Lessons on Wealth",
//     image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&h=600&q=80",
//   },
//   {
//     id: 5,
//     title: "Start with Why: How Great Leaders Inspire Everyone to Take Action",
//     image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&h=600&q=80",
//   },
//   {
//     id: 6,
//     title: "The 7 Habits of Highly Effective People",
//     image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&h=600&q=80",
//   },
// ];


const MyResearchPaper = () => {
  const { researchPaper } = usePage().props;
  return (
    <div className="max-w-screen-2xl lg:px-20 container mx-auto px-3 my-10">
      <div className="flex">
        <h2 className="text-xl md:text-2xl text-center lg:text-2xl text-black my-5 tracking-wide 
          after:content-[''] after:block after:w-12 md:after:w-24 after:h-1 after:bg-red-500 
          after:mx-auto after:mt-2 after:transition-all after:duration-300 
          hover:after:w-16 md:hover:after:w-28">
          Research Papers
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2">
        {researchPaper?.map((item) => (
          <a href={`${item.link}`} key={item.id} className="bg-white hover:cursor-pointer rounded-lg overflow-hidden hover:scale-95 transition-all duration-300">
            <img 
              src={`/assets/images/items/${item?.images[0].image}`}
              alt="image" 
              width={200}   
              height={300} 
              className="w-full aspect-[6/9] rounded-lg object-cover"
            />
            <div className="pt-2 line-clamp-2 text-base">
              <h3 className="text-sm font-medium text-gray-800">{item.name}</h3>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default MyResearchPaper;
