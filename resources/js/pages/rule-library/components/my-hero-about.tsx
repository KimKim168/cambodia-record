import { usePage } from '@inertiajs/react';

const MyHeroAbout = () => {
    const { aboutPage } = usePage().props;
    // console.log(aboutPage);
    return (
        <section className="bg-white px-6 py-16 md:px-20">
            {aboutPage?.map((item) => (
                <div key={item.id} className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 md:grid-cols-2">
                    {/* Left: Images */}
                    <div className="relative h-[32rem] w-full">
                        {' '}
                        {/* Increased height */}
                        <img
                            src={`/assets/images/pages/${item?.images[0].image}`}
                            alt="Library Interior"
                            className="absolute top-0 -left-1 h-[85%] w-2/4 object-cover"
                        />
                        <img
                            src={`/assets/images/pages/${item?.images[1].image}`}
                            alt="Bookshelves"
                            className="absolute -right-1 bottom-0 h-[85%] w-2/4 object-cover"
                        />
                    </div>
                    {/* Right: Text */}
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 md:text-4xl whitespace-pre-line" dangerouslySetInnerHTML={{ __html: item.short_description || '---' }}></h2>
                        <hr className="mt-4 mb-6 h-1 w-12 border-0 bg-yellow-400" />

                        <p className="mb-4 text-gray-600 whitespace-pre-line" dangerouslySetInnerHTML={{ __html: item.long_description || '---' }}>
                        </p>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default MyHeroAbout;
