import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Slash } from 'lucide-react';
import MyNewLayout from '../layout/MyLayout';
import MyHeroExtracurricularActivities from '../components/news-components/my-hero-extracurricular-activities';
import MyImageExtracurricularActivities from '../components/news-components/my-image-extracurricular-activities';
import { usePage } from '@inertiajs/react';

const ActivitiesAndEvents = () => {
    const { extracurricularActivities } = usePage().props;
    return (
        <MyNewLayout>
            <div className="relative flex h-full w-full flex-col items-center justify-center bg-red-900 dark:bg-red-950 p-10 text-white md:p-20">
                <p className="font-noto-san-extra-light text-3xl md:text-6xl">{extracurricularActivities?.title}</p>
                <div>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/" className="text-white">
                                    Home
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <Slash className="text-gray-400" />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#/history_and_values" className="text-gray-400">
                                    {extracurricularActivities?.title}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>
            <MyHeroExtracurricularActivities children={extracurricularActivities?.children}/>
            {/* <MyImageExtracurricularActivities/> */}
        </MyNewLayout>
    );
};

export default ActivitiesAndEvents;
