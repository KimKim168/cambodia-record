import { AlignRight } from 'lucide-react';

const TestComponent = () => {
    return (
        <div>
            {/* Top Bar */}
            <div className="mx-auto max-w-screen-xl bg-white px-4 py-1 text-right text-sm">
                <span>📞 010 775589 - Student Login</span>
            </div>

            {/* Header */}
            <header className="bg-[#50504f]">
                <div className="container mx-auto flex max-w-screen-xl flex-wrap items-center justify-between px-4 py-4">
                    {/* Logo + Name */}
                    <div className="flex items-center gap-4">
                        <img src="/assets/demo-images/image.png" alt="Logo" className="h-20 w-20 object-contain" />
                        <div>
                            <h1 className="text-center text-xl leading-snug font-bold text-white">វិទ្យាស្ថានជាតិអប់រំ</h1>
                            <p className="text-sm text-white">National Institute of Education</p>
                        </div>
                    </div>

                    {/* Hamburger toggle */}
                    {/* <input type="checkbox" id="menu-toggle" className="peer hidden" /> */}
                    <label htmlFor="menu-toggle" className="cursor-pointer text-2xl text-white xl:hidden">
                        <AlignRight className='w-8 h-8' />
                    </label>

                    {/* Navigation */}
                    <nav className="mt-4 hidden w-full flex-col items-start gap-2 text-base text-white peer-checked:flex xl:mt-0 xl:flex xl:w-auto xl:flex-row xl:items-center xl:gap-4">
                        <a href="#" className="border-r border-white pr-4 hover:underline">
                            Home
                        </a>
                        <a href="#" className="border-r border-white pr-4 hover:underline">
                            About
                        </a>
                        <a href="#" className="border-r border-white pr-4 hover:underline">
                            Collections
                        </a>
                        <a href="#" className="border-r border-white pr-4 hover:underline">
                            Resources
                        </a>
                        <a href="#" className="border-r border-white pr-4 hover:underline">
                            Database
                        </a>
                    </nav>
                </div>
            </header>
        </div>
    );
};

export default TestComponent;
