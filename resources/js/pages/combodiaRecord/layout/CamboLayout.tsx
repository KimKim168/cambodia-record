import { usePage } from '@inertiajs/react';
import { User } from 'lucide-react';
import { ReactNode } from 'react';
interface LayoutProps {
    children: ReactNode;
}
const CamboLayout = ({ children }: LayoutProps) => {
    const { application_info } = usePage().props;
    return (
        <>
            {/* Top Border */}
            <div className="w-full bg-blue-900">
                <div className="mx-auto flex max-w-screen-xl items-center justify-end px-4 py-2">
                    <a href="/login" className="text-white flex items-center gap-2">
                        <User/>Login/Register
                    </a>
                </div>
            </div>
            <main className="font-kantumruy mx-auto min-h-[100vh]">{children}</main>
            <footer className="bg-blue-900 py-2 text-center text-sm text-gray-100 select-none mt-8">
                <p>{application_info?.copyright}</p>
            </footer>
        </>
    );
};

export default CamboLayout;
