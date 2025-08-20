import { usePage } from '@inertiajs/react';
import CambodiaRecord from '../components/cambodia-record';
import MyLastStyleBottom from '../components/my-last-style-bottom';
import MyViewAll from '../components/my-view-all';
import Search from '../components/search';
import CamboLayout from '../layout/CamboLayout';

const Index = () => {
    const { auth } = usePage().props;
    return (
        <CamboLayout>
            <div className="min-h-screen bg-white font-sans">
                {/* Header & Search */}
                <div className="mx-auto max-w-screen-xl py-8 text-center">
                    {/* {auth?.user ? <h1 className="mb-8 text-2xl font-bold text-gray-800">Cambodia&apos;s Record</h1> : <p>You not user </p>} */}
                    <h1 className="mb-8 text-2xl font-bold text-gray-800">Cambodia&apos;s Record</h1>
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
