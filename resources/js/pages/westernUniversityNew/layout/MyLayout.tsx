import { ArrowUpCircle } from 'lucide-react';
import { ReactNode } from 'react';
import MyNewFooter from '../components/my-new-footer';
import MyTopSection from '../components/my-top-section';
import NavbarPage from '../components/navbar/navbar';
interface LayoutProps {
    children: ReactNode;
}

const MyNewLayout = ({ children }: LayoutProps) => {
    return (
        <>
            {/* Header */}
            <MyTopSection />
            <NavbarPage />
            {/* End Header */}
            <main className="font-kantumruy mx-auto min-h-screen">{children}</main>
            {/* Footer */}
            <MyNewFooter />
            {/* Scroll to Top Button */}
            <a
                href="#top"
                className="fixed right-2 bottom-2 rounded-full bg-gray-800 px-4 py-4 text-white shadow-lg hover:bg-blue-900 md:right-6 md:bottom-6"
            >
                <ArrowUpCircle className="h-7 w-7" />
            </a>
            {/* End Footer */}
        </>
    );
};

export default MyNewLayout;
