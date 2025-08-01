import CambodiaRecord from '../components/cambodia-record';
import Search from '../components/search';
import CamboLayout from '../layout/CamboLayout';

const Index = () => {
    const categories = ['Conflict', 'History', 'Culture', 'Tradition'];
    return (
        <CamboLayout>
            <div className="min-h-screen bg-white font-sans">
                {/* Header & Search */}
                <div className="mx-auto max-w-screen-xl px-4 py-8 text-center">
                    <h1 className="mb-8 text-2xl font-bold text-gray-800">Cambodia&apos;s Record</h1>
                    {/* Search Bar */}
                    <Search />
                    {/* Divider */}
                    {/* Category Cards */}
                    <CambodiaRecord />
                </div>
            </div>
        </CamboLayout>
    );
};

export default Index;
