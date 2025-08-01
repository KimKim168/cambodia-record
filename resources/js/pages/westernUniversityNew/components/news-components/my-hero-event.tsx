const ActivityItem = ({ id, title, description, short_description, imageUrl, reverse = false }) => {
    return (
        <div id={id} className="relative overflow-hidden border-b border-gray-200 py-12">
            <div className={`flex flex-col-reverse lg:flex-row ${reverse ? 'lg:flex-row-reverse' : ''} mx-auto max-w-screen-2xl items-center`}>
                {/* Text Content */}
                <div className="w-full px-6 sm:px-10 lg:px-20 lg:w-1/2">
                    <div className="prose dark:prose-invert ck-content lg:text-left">
                        <h2 className="my-6 pt-5 text-2xl font-bold text-red-700 font-noto-san-extra-light sm:text-3xl lg:my-0 lg:mb-4">{title}</h2>
                        <div
                            className="prose text-base leading-relaxed whitespace-pre-line text-gray-700 sm:text-lg"
                            dangerouslySetInnerHTML={{ __html: description ?? '' }}
                        ></div>
                    </div>
                </div>

                {/* Image Content */}
                <div className="w-full lg:w-1/2">
                    <div className="group h-64 w-full overflow-hidden sm:h-80 md:h-96 lg:h-[28rem]">
                        <img
                            src={imageUrl}
                            alt={title || 'Activity image'}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const MyHeroEvent = ({ children }: { children?: any }) => {
    // console.log(children);

    // const activities = [
    //     {
    //         id: 1,
    //         title: "Extracurricular Activities",
    //         description: "Our students also participate in other activities that help them build teamwork, communication, and relationship. It helps students explore their interests and create a broader perspective of the worldview.",
    //         imageUrl: "https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg?auto=compress&cs=tinysrgb&w=600",
    //     },
    //     {
    //         id: 2,
    //         title: "Cultural Exchange Programs",
    //         description: "Our cultural exchange programs allow students to immerse themselves in diverse cultures, fostering global understanding and personal growth. These experiences broaden horizons and build lifelong connections.",
    //         imageUrl: "https://images.pexels.com/photos/3184307/pexels-photo-3184307.jpeg?auto=compress&cs=tinysrgb&w=600",
    //     },
    //     {
    //         id: 3,
    //         title: "Community Service Projects",
    //         description: "Students regularly engage in community service, applying their skills to real-world problems and making a positive impact. This fosters empathy, responsibility, and a sense of civic duty.",
    //         imageUrl: "https://images.pexels.com/photos/3205777/pexels-photo-3205777.jpeg?auto=compress&cs=tinysrgb&w=600",
    //     },
    //     {
    //         id: 4,
    //         title: "Innovation & Robotics Club",
    //         description: "The Innovation & Robotics Club inspires students to explore STEM fields through hands-on projects. They design, build, and program robots, developing critical thinking and problem-solving skills.",
    //         imageUrl: "https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=600",
    //     },
    //     {
    //         id: 5,
    //         title: "Debate and Public Speaking",
    //         description: "Our debate club hones critical thinking and public speaking skills. Students learn to construct compelling arguments and articulate their ideas effectively, boosting confidence and intellectual prowess.",
    //         imageUrl: "https://images.pexels.com/photos/1181408/pexels-photo-1181408.jpeg?auto=compress&cs=tinysrgb&w=600",
    //     },
    // ];

    return (
        <section>
            {children?.map((activity, index) => (
                <ActivityItem
                    id={`event_id${activity?.id}`} 
                    key={activity?.id}
                    title={activity?.title}
                    short_description={activity?.short_description}
                    description={activity?.long_description}
                    imageUrl={`/assets/images/pages/${activity?.images[0]?.image}`}
                    reverse={index % 2 === 1} // Alternates layout
                />
            ))}
        </section>
    );
};

export default MyHeroEvent;
