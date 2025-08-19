import CambodiaRecord from '../components/cambodia-record';
import MyLastStyleBottom from '../components/my-last-style-bottom';
import MyViewAll from '../components/my-view-all';
import Search from '../components/search';
import CamboLayout from '../layout/CamboLayout';

const Index = () => {
    const categories = ['Conflict', 'History', 'Culture', 'Tradition'];
    return (
        <CamboLayout>
            <div className="min-h-screen bg-white font-sans">
                {/* Header & Search */}
                <div className="mx-auto max-w-screen-xl py-8 text-center">
                    <h1 className="mb-8 text-2xl font-bold text-gray-800">Cambodia&apos;s Record</h1>
                    {/* Search Bar */}
                    <Search />
                    {/* Divider */}
                    {/* Category Cards */}
                    <CambodiaRecord />
                    <MyViewAll/>
                </div>
                <MyLastStyleBottom/>
            </div>
        </CamboLayout>
    );
};

export default Index;
