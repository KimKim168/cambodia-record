import useTranslation from '@/hooks/use-translation';
import { usePage } from '@inertiajs/react';
import { ContactSection } from './components/contact-section';
import Headline from './components/headline';
import OurCommitmentCard from './components/our-commitment-card';
import { OurJourney } from './components/our-journey';
import WhyChooseUsCard from './components/why-choose-us-card';
import WestecLayout from './layout/layout';

const About = () => {
    const { abouts_detail, why_choose_westec_detail, vision_detail, our_commitment_detail, our_journey_detail } = usePage().props;
    const { t, currentLocale } = useTranslation();

    return (
        <WestecLayout>
            {abouts_detail?.title && (
                <section className="relative" id={`${abouts_detail?.code}`}>
                    <img
                        src={`/assets/images/pages/${abouts_detail.images[0].image}`}
                        className="max-h-[800px] min-h-[300px] w-full object-cover"
                        alt=""
                    />
                    <div className="bg-true-primary/50 absolute top-1/2 left-4 max-w-[80%] -translate-y-1/2 p-4 text-white lg:left-16 lg:max-w-[750px] 2xl:max-w-[950px]">
                        {/* <h1 className="mt-2 mb-4 text-xl font-bold text-yellow-500 lg:text-4xl">Suor Sdey Cambodia!</h1>
                        <div className="mb-2 flex flex-col gap-4 text-xs font-medium lg:text-2xl">
                            <p>At Westec Corporation, we don’t just follow the latest trends in technology—we lead them.</p>
                            <p>
                                Born from a vision of passionate engineers from the USA and Canada, we’ve grown into Cambodia’s leading provider of
                                smart, secure, and innovative solutions.
                            </p>
                            <p>
                                Whether you’re a business owner needing cutting-edge security or a homeowner looking for smart automation, Westec is
                                your go-to partner for transforming the way you live and work.
                            </p>
                        </div> */}
                        <div
                            className="prose mb-2 text-xs font-medium text-white lg:text-xl xl:text-2xl"
                            dangerouslySetInnerHTML={{
                                __html: currentLocale == 'kh' ? abouts_detail?.short_description_kh : abouts_detail?.short_description,
                            }}
                        ></div>
                    </div>
                </section>
            )}
            {why_choose_westec_detail.title && (
                <section id={`${why_choose_westec_detail?.code}`}>
                    <Headline title={currentLocale == 'kh' ? why_choose_westec_detail?.title_kh : why_choose_westec_detail?.title} />
                    {why_choose_westec_detail?.children?.length > 0 && (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3">
                            {why_choose_westec_detail?.children?.map((item, i) => (
                                <div className={i % 2 == 0 ? 'bg-true-primary-three' : 'bg-true-primary'}>
                                    {<WhyChooseUsCard item={item} i={i + 1} />}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* <div className="bg-true-primary">{<WhyChooseUsCard />}</div>
                        <div className="bg-true-primary-three">{<WhyChooseUsCard />}</div>
                        <div className="bg-true-primary">{<WhyChooseUsCard />}</div>
                        <div className="bg-true-primary-three">{<WhyChooseUsCard />}</div>
                        <div className="bg-true-primary">{<WhyChooseUsCard />}</div> */}
                </section>
            )}

            <ContactSection bg="bg-true-primary-two" />

            {vision_detail?.title && (
                <section id={`${vision_detail?.code}`}>
                    <Headline title={currentLocale == 'kh' ? vision_detail?.title_kh : vision_detail?.title} />
                    <div className="bg-true-primary flex">
                        <div className="bg-muted aspect-square max-w-[250px] overflow-hidden object-cover lg:max-w-[500px]">
                            <img className="h-full w-full object-cover" src={`/assets/images/pages/${vision_detail?.images[0]?.image}`} alt="" />
                        </div>
                        <div className="flex max-w-4xl items-center justify-center px-4 lg:px-20">
                            <div
                                className="prose prose-h2:text-white mb-2 text-xs font-medium text-white lg:text-2xl"
                                dangerouslySetInnerHTML={{
                                    __html: currentLocale == 'kh' ? vision_detail?.short_description_kh : vision_detail?.short_description,
                                }}
                            />
                        </div>
                    </div>
                </section>
            )}
            {our_commitment_detail?.title && (
                <section id={`${our_commitment_detail?.code}`}>
                    <Headline title={currentLocale == 'kh' ? our_commitment_detail?.title_kh : our_commitment_detail?.title} />
                    <div className="bg-true-primary xl:flex">
                        <div className="bg-muted hidden aspect-square max-w-full overflow-hidden object-cover xl:inline xl:max-w-[500px]">
                            <img
                                className="h-full w-full object-cover"
                                src={`/assets/images/pages/${our_commitment_detail?.images[0]?.image}`}
                                alt=""
                            />
                        </div>
                        {our_commitment_detail?.children?.length > 0 && (
                            <div className="grid w-full flex-1 md:grid-cols-2 lg:grid-cols-2">
                                {our_commitment_detail?.children?.map((item, i) => (
                                    <div className={i % 3 == 0 ? 'bg-true-primary-three' : 'bg-true-primary'}>
                                        {<OurCommitmentCard item={item} i={i + 1} />}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            )}
            {our_journey_detail?.title && (
                <section id={`${our_journey_detail?.code}`}>
                    <Headline title={currentLocale == 'kh' ? our_journey_detail?.title_kh : our_journey_detail?.title} />
                    <div>{our_journey_detail?.children?.length > 0 && <OurJourney items={our_journey_detail?.children} />}</div>
                </section>
            )}
        </WestecLayout>
    );
};

export default About;
