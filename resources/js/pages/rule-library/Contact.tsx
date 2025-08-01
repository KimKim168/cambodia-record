import { Mail, MapPinCheck, PhoneCall } from 'lucide-react';
import Layout from './Layout';
import { usePage } from '@inertiajs/react';

// const socialMedia = [
//     {
//         id: 1,
//         image: 'https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/facebook.svg',
//         name: 'Facebook',
//         alt: 'Facebook',
//         link: 'https://facebook.com',
//         hoverColor: 'hover:bg-[#1877F2]', // Facebook Blue
//     },
//     {
//         id: 2,
//         image: 'https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/telegram.svg',
//         name: 'Telegram',
//         alt: 'Telegram',
//         link: 'https://telegram.org',
//         hoverColor: 'hover:bg-[#0088cc]', // Telegram Blue
//     },
//     {
//         id: 3,
//         image: 'https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/youtube.svg',
//         name: 'YouTube',
//         alt: 'YouTube',
//         link: 'https://youtube.com',
//         hoverColor: 'hover:bg-[#FF0000]', // YouTube Red
//     },
//     {
//         id: 4,
//         image: 'https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/tiktok.svg',
//         name: 'TikTok',
//         alt: 'TikTok',
//         link: 'https://www.tiktok.com',
//         hoverColor: 'hover:bg-[#010101]', // TikTok Black
//     },
// ];

const Contact = () => {
    const { application_info } = usePage().props;
    const { socialMedia } = usePage().props;
    // console.log(application_info)
    return (
        <Layout>
            <section className="mb-32">
                {/* Map Section */}
                <a href={application_info?.google_map} id="map" className="relative h-[480px] overflow-hidden bg-cover bg-[50%] bg-no-repeat">
                    <iframe
                        src={application_info?.google_map}
                        width="100%"
                        height="480"
                        loading="lazy"
                        title="Map to RULE Library"
                        aria-label="Map to RULE Library"
                    ></iframe>
                </a>

                {/* Info Section */}
                <div className="container mx-auto px-6 md:px-12">
                    <div className="-mt-[100px] block rounded-lg border border-gray-300 bg-white/80 px-6 py-12 shadow-xl backdrop-blur-[30px] md:px-12 md:py-16">
                        <div className="grid justify-center">
                            <div className="grid w-full gap-12 md:grid-cols-2 xl:grid-cols-2">
                                {/* Contact Details Section */}
                                <div className="space-y-8">
                                    {/* Contact Item - Phone */}
                                    <div className="group flex items-start rounded-lg p-3 transition hover:scale-[1.02] hover:bg-sky-50">
                                        <div className="shrink-0">
                                            <div className="inline-block rounded-md bg-sky-200 p-4 text-sky-700 transition group-hover:bg-sky-300">
                                                <PhoneCall />
                                            </div>
                                        </div>
                                        <div className="ml-6 grow">
                                            <p className="mb-2 font-semibold text-gray-800">Phone Number</p>
                                            <p className="text-sm text-neutral-600 transition group-hover:text-neutral-800">{application_info?.phone}</p>
                                        </div>
                                    </div>

                                    {/* Contact Item - Address */}
                                    <div className="group flex items-start rounded-lg p-3 transition hover:scale-[1.02] hover:bg-sky-50">
                                        <div className="shrink-0">
                                            <div className="inline-block rounded-md bg-sky-200 p-4 text-sky-700 transition group-hover:bg-sky-300">
                                                <MapPinCheck />
                                            </div>
                                        </div>
                                        <div className="ml-6 grow">
                                            <p className="mb-2 font-semibold text-gray-800">Address</p>
                                            <p className="text-sm text-neutral-600 transition group-hover:text-neutral-800">
                                               {application_info?.address}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Contact Item - Email */}
                                    <div className="group flex items-start rounded-lg p-3 transition hover:scale-[1.02] hover:bg-sky-50">
                                        <div className="shrink-0">
                                            <div className="inline-block rounded-md bg-sky-200 p-4 text-sky-700 transition group-hover:bg-sky-300">
                                                <Mail />
                                            </div>
                                        </div>
                                        <div className="ml-6 grow">
                                            <p className="mb-2 font-semibold text-gray-800">Email</p>
                                            <p className="text-sm text-neutral-600 transition group-hover:text-neutral-800">{application_info?.email}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Social Media Section */}
                                <div className="mt-4 md:mt-0">
                                    <p className="mb-6 text-lg font-bold text-gray-800">Social Media</p>
                                    <div className="flex flex-wrap gap-4">
                                        {socialMedia?.map((item) => (
                                            <a
                                                key={item.id}
                                                href={item.link}
                                                className={`group flex h-28 w-24 flex-col items-center justify-center rounded-md bg-gray-500 transition-transform duration-300 hover:scale-110 hover:shadow-md ${item.hoverColor}`}
                                            >
                                                <img
                                                    src={`/assets/images/links/${item.image}`}
                                                    alt={`${item.title} icon`}
                                                    className="h-14 w-14 transition-transform duration-300 group-hover:scale-110"
                                                />
                                                <span className="mt-2 text-sm text-gray-300 transition group-hover:text-white">{item.title}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Contact;
