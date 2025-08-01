import MyEvent from './components/my-event';
import MyGoogleMap from './components/my-google-map';
import MyLastestNew from './components/my-lastest-new';
import MyMultipleSlides from './components/my-multiple-slide';
import MyNewHero from './components/my-new-hero';
import MyNewMiddleSection from './components/my-new-middle-section';
import { MyNewSlideBottom } from './components/my-new-slide-bottom';
import { MyNewSlide } from './components/my-slide';
import MyStatistics from './components/my-statistics';
import MyNewLayout from './layout/MyLayout';

const Home = () => {
    return (
        <MyNewLayout>
            <MyNewSlide />
            <MyNewHero />
            <MyNewMiddleSection />
            <MyStatistics />
            {/* <div className="relative h-[50vh] w-full"><img alt="Background" className="absolute inset-0 z-0 h-full w-full object-cover" src="/assets/demo-images/Homepage/07_leadership2.jpg"/><div className="bg-opacity-50 absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/50 px-4 text-center sm:px-8 lg:px-16"><h2 className="text-3xl font-bold text-white sm:text-5xl">Trusted by Over 8,300+ Students</h2><p className="mt-4 max-w-2xl text-gray-300">Join our community of students around the world helping you succeed.</p><button className="mt-6 rounded-lg bg-red-600 px-6 py-3 text-lg font-semibold text-white transition hover:bg-red-700">Get Started</button></div></div> */}
            <MyEvent/>
            <MyNewSlideBottom />
            <MyLastestNew />
            <MyMultipleSlides />
           <MyGoogleMap/>
        </MyNewLayout>
    );
};

export default Home;
