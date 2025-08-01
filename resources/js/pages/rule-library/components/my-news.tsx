import { Link } from '@inertiajs/react';
import { CardBody, CardContainer, CardItem } from './ui/3d-card';

const newsItems = [
    {
        id: 1,
        name: 'Becoming good at reading',
        short_decription: 'Tips and strategies to improve your reading skills effectively.',
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=350&q=80',
    },
    {
        id: 2,
        name: 'Cambodia Book Fair',
        short_decription: "Discover the latest books and events at Cambodia's annual book fair.",
        image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=350&q=80',
    },
    {
        id: 3,
        name: 'Cambodia to Make E-Invoicing Mandatory Next Year',
        short_decription: 'Important updates on new e-invoicing regulations coming soon.',
        image: 'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=350&q=80',
    },
];

const MyNews = () => {
    return (
        <div className="container mx-auto my-16 max-w-screen-2xl px-3 lg:px-20">
            <h2 className="my-5 animate-bounce text-center text-xl font-semibold tracking-wide text-black after:mx-auto after:mt-2 after:block after:h-1 after:w-12 after:bg-red-500 after:transition-all after:duration-300 after:content-[''] hover:after:w-16 md:text-2xl lg:text-3xl">
                News
            </h2>

            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                {newsItems.map((item) => (
                    <Link href={`/news/${item.id}`} key={item.id} className="flex justify-center">
                        <CardContainer className="inter-var h-full w-full">
                            <CardBody className="group/card relative flex h-full w-full flex-col justify-between rounded-xl border border-black/[0.1] bg-gray-50 p-6 dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]">
                                <div>
                                    <CardItem
                                        translateZ="50"
                                        className="text-[16px] font-bold text-black sm:text-[18px] md:text-[20px] dark:text-white"
                                    >
                                        {item.name}
                                    </CardItem>
                                    <CardItem as="p" translateZ="60" className=" line-clamp-2 text-[14px] text-neutral-600 dark:text-neutral-300">
                                        {item.short_decription}
                                    </CardItem>
                                </div>
                                <CardItem translateZ="100" className="aspect-[16/9] w-full">
                                    <img
                                        src={item.image}
                                        height={350}
                                        width={350}
                                        className="aspect-[16/9] w-full rounded-xl object-cover group-hover/card:shadow-xl"
                                        alt={item.name}
                                    />
                                </CardItem>
                                <div className=" flex items-center justify-end">
                                    <CardItem
                                        translateZ={20}
                                        as="button"
                                        className="rounded-xl px-4 py-2 text-[14px] font-bold text-blue-500 hover:underline hover:underline-offset-4"
                                    >
                                        Read More
                                    </CardItem>
                                </div>
                            </CardBody>
                        </CardContainer>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default MyNews;
