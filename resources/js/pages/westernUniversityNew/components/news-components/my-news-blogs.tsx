import React from 'react';
import { CalendarClock } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';

// const posts = [
//   {
//     image: 'assets/demo-images/banner5.jpg',
//     title: 'Liberal Arts Colleges Rankings',
//     description:
//       'Liberal Arts Colleges emphasize undergraduate education and award at least half of their degrees in the liberal arts fields of study.',
//     date: '2 days ago',
//   },
//   {
//     image: 'assets/demo-images/banner3.jpg',
//     title: 'Ways Parents and Counselors Can Help Students Earn Scholarships',
//     description:
//       'Liberal Arts Colleges emphasize undergraduate education and award at least half of their degrees in the liberal arts fields of study.',
//     date: '2 days ago',
//   },
//   {
//     image: 'assets/demo-images/banner3.jpg',
//     title: 'Ways Parents and Counselors Can Help Students Earn Scholarships',
//     description:
//       'Liberal Arts Colleges emphasize undergraduate education and award at least half of their degrees in the liberal arts fields of study.',
//     date: '2 days ago',
//   },
//   {
//     image: 'assets/demo-images/banner4.jpg',
//     title: 'Ways Parents and Counselors Can Help Students Earn Scholarships',
//     description:
//       'Liberal Arts Colleges emphasize undergraduate education and award at least half of their degrees in the liberal arts fields of study.',
//     date: '2 days ago',
//   },
//   {
//     image: 'assets/demo-images/banner3.jpg',
//     title: 'Liberal Arts Colleges Rankings',
//     description:
//       'Liberal Arts Colleges emphasize undergraduate education and award at least half of their degrees in the liberal arts fields of study.',
//     date: '2 days ago',
//   },
//   {
//     image: 'assets/demo-images/banner3.jpg',
//     title: 'Liberal Arts Colleges Rankings',
//     description:
//       'Liberal Arts Colleges emphasize undergraduate education and award at least half of their degrees in the liberal arts fields of study.',
//     date: '2 days ago',
//   },
//   {
//     image: 'assets/demo-images/banner5.jpg',
//     title: 'Liberal Arts Colleges Rankings',
//     description:
//       'Liberal Arts Colleges emphasize undergraduate education and award at least half of their degrees in the liberal arts fields of study.',
//     date: '2 days ago',
//   },
//   {
//     image: 'assets/demo-images/banner3.jpg',
//     title: 'Ways Parents and Counselors Can Help Students Earn Scholarships',
//     description:
//       'Liberal Arts Colleges emphasize undergraduate education and award at least half of their degrees in the liberal arts fields of study.',
//     date: '2 days ago',
//   },
//   {
//     image: 'assets/demo-images/banner3.jpg',
//     title: 'Ways Parents and Counselors Can Help Students Earn Scholarships',
//     description:
//       'Liberal Arts Colleges emphasize undergraduate education and award at least half of their degrees in the liberal arts fields of study.',
//     date: '2 days ago',
//   },
// ];

const MyNewBlogs = () => {
  const { blogs } = usePage().props;
  // console.log(blogs);
  return (
    <div className="mx-auto mt-10 mb-16 max-w-screen-2xl px-4  lg:px-20"> 
     <h1 className="mb-6 border-l-4 pl-4 border-red-700  text-3xl tracking-tight font-bold text-red-700 font-noto-san-extra-light sm:text-4xl dark:text-white">{blogs[0].category_code}</h1>   
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogs?.map((item) => (        
         <Link href={`/news/${item.id}`}>
          <div
            key={item.id}
            className="overflow-hidden h-full border border-gray-200 bg-white shadow-lg transition hover:scale-[1.01] hover:cursor-pointer"
          >
            <img
              src={`/assets/images/posts/${item?.images?.[0]?.image}`}
              width={400}
              height={250}
              className="aspect-video w-full object-cover"
            />
            <div className="p-4 text-start">
              <h2 className="text-xl font-bold font-noto-san-extra-light line-clamp-2 text-red-700">{item?.title}</h2>
              <p className="my-4 text-sm text-gray-500 line-clamp-2">{item?.short_description}</p>
            </div>
          </div>
         </Link>
        ))}
      </div>
    </div>
  );
};

export default MyNewBlogs;
