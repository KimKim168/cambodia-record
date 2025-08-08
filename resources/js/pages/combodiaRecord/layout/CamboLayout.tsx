import { usePage } from '@inertiajs/react';
import { ReactNode } from 'react';
import NavBar from '../components/nav-bar';
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
                    <a href="/login" className="flex items-center gap-2 text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h12m0 0l-4-4m4 4l-4 4" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7" />
                        </svg>
                        Login
                    </a>
                </div>
            </div>
            <NavBar />
            <main className="font-kantumruy mx-auto min-h-[100vh]">{children}</main>
            <footer className="mt-8 bg-blue-900 py-2 text-center text-sm text-gray-100 select-none">
                <p>{application_info?.copyright}</p>
            </footer>
        </>
    );
};

export default CamboLayout;
