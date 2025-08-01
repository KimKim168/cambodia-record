import { usePage } from '@inertiajs/react';
import { HeartHandshake } from 'lucide-react';
// const teamMembers = [
//     {
//         name: 'Collaboration',
//         title: 'Integer venenatis quam viverra lorem sed lobortis euismod lobortis',
//         Icon: HeartHandshake,
//     },
//     {
//         name: 'Customer Focus',
//         title: 'Integer venenatis quam viverra lorem sed lobortis euismod lobortis',
//         Icon: HeartHandshake,
//     },
//     {
//         name: 'Diversity',
//         title: 'Integer venenatis quam viverra lorem sed lobortis euismod lobortis',
//         Icon: HeartHandshake,
//     },
//     {
//         name: 'Expertise',
//         title: 'Integer venenatis quam viverra lorem sed lobortis euismod lobortis',
//         Icon: HeartHandshake,
//     },
//     {
//         name: 'Innovation',
//         title: 'Integer venenatis quam viverra lorem sed lobortis euismod lobortis',
//         Icon: HeartHandshake,
//     },
// ];
const MyOurValues = () => {
    const { ourValues } = usePage().props;
    return (
        <div className="bg-[#f2f0ee]">
            {ourValues?.map((item) => (
                <div key={item.id} className="mx-auto flex max-w-screen-2xl flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-20">
                    <div className="mx-auto max-w-xl text-center">
                        <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{item?.title}</h2>
                    </div>
                    <div className="relative mt-6 h-[2px] w-full bg-gray-200">
                        <div className="absolute top-0 left-1/2 h-[2px] w-20 -translate-x-1/2 transform bg-yellow-400"></div>
                    </div>
                    <div className="mx-auto mt-20 grid w-full max-w-screen-2xl grid-cols-2 gap-12 sm:grid-cols-3 md:grid-cols-5">
                        {item?.children?.map((values) => (
                        <a href={values.type ? values.link : values.content} key={values.id} className="text-center">
                                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 text-white">
                                    <img
                                        src={`/assets/images/pages/${values.images[0].image}`}
                                        alt="image"
                                        className="bg-secondary mx-auto h-16 w-16 rounded-full object-cover"
                                    />
                                </div>
                                <h3 className="mt-4 text-lg font-semibold">{values.title}</h3>
                                <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: values.short_description || '---' }}></p>
                            </a>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyOurValues;
