import { SlashIcon } from 'lucide-react';
import Layout from './Layout';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from './components/ui/breadcrumb';
import MyResources from './components/my-resources';

const Resources = () => {
    return (
        <Layout>
            <div className="relative flex h-[60vh] w-full flex-col items-center justify-center overflow-hidden text-white">
                {/* Background Image with Dark Overlay */}
                <img
                    src="/assets/demo-images/rule-images/slide1.jpg"
                    alt="Contact Background"
                    className="absolute inset-0 z-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 z-10 bg-black/50" />

                {/* Title and Breadcrumb */}
                <div className="relative z-20 px-4 text-center">
                    <h1 className="font-noto-san-extra-light text-4xl md:text-6xl">Resources</h1>
                    <div className="mt-6">
                        <Breadcrumb>
                            <BreadcrumbList className="flex justify-center gap-2">
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/" className="text-white hover:text-gray-400 hover:underline">
                                        Home
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator>
                                    <SlashIcon className="h-4 w-4 text-gray-400" />
                                </BreadcrumbSeparator>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="#/resource" className="text-gray-400">
                                        Resources
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </div>
            </div>
            <MyResources/>
        </Layout>
    );
};

export default Resources;
