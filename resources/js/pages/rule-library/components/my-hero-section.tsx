const MyHeroSection = () => {
    return (
        <section className="mx-auto max-w-screen-2xl bg-white px-4 pt-10 sm:px-8 md:px-16 lg:px-20">
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
                {/* Left: Image */}
                <div className="aspect-[16/9] overflow-hidden rounded-xl shadow-md">
                    <img
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        src="/assets/demo-images/rule-images/image1.webp"
                        alt="Hero Image"
                    />
                </div>
                {/* Right: Content */}
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Digital Library</h2>
                    <hr className="my-4 h-1 w-16 border-0 bg-yellow-400" />
                    <p className="mb-6 leading-relaxed text-gray-600">
                        At <strong>[Your Company Name]</strong>, we are dedicated to empowering businesses with cutting-edge digital solutions. Our
                        expertise spans web development, mobile app solutions, SEO, digital marketing, and custom software development.
                    </p>
                    <p className="mb-6 leading-relaxed text-gray-600">
                        With over 15 years of experience, we deliver high-quality, user-friendly, and scalable digital products that drive growth and
                        success. Partner with us to transform your online presence and achieve your business goals.
                    </p>
                    <button className="inline-flex items-center gap-2 rounded-full border border-gray-600 bg-gray-800 px-6 py-3 text-sm font-medium text-white transition duration-200 hover:cursor-pointer hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:outline-none">
                        Read More
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default MyHeroSection;
