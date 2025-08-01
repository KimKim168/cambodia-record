import { usePage } from '@inertiajs/react';
import MyDatabase from './components/my-databese';
import MyHeroSection from './components/my-hero-section';
import MyNews from './components/my-news';
import MyPost from './components/my-post';
import MyResearchPaper from './components/my-research-parper';
import MySearch from './components/my-search';
import MySlide from './components/my-slide';
import MyVideos from './components/my-videos';
import Layout from './Layout';

const Index = () => {
  const { slide } = usePage().props;
//   console.log(slide);
    return (
        <Layout>
            <MySlide images={slide}/>
            <MySearch />
            <MyHeroSection />
            <MyDatabase />
            <MyVideos />
            <MyPost />
            <MyResearchPaper/>
            <MyNews />
        </Layout>
    );
};

export default Index;
