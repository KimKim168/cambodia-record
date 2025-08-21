import { usePage } from '@inertiajs/react';
import CambodiaRecord from '../components/cambodia-record';
import MyLastStyleBottom from '../components/my-last-style-bottom';
import MyViewAll from '../components/my-view-all';
import Search from '../components/search';
import CamboLayout from '../layout/CamboLayout';
import TextHeader from '../components/text-header';

const Index = () => {
    const { auth } = usePage().props;
    return (
        <CamboLayout>
            <div className="min-h-screen bg-white">
                {/* Header & Search */}
                <div className="mx-auto max-w-screen-xl py-8 text-center">
                    <TextHeader/>
                    {/* Search Bar */}
                    <Search />
                    {/* Divider */}
                    {/* Category Cards */}
                    <CambodiaRecord />
                    <MyViewAll />
                </div>
                <MyLastStyleBottom />
            </div>
        </CamboLayout>
    );
};

export default Index;
