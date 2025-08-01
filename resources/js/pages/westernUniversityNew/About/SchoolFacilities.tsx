import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import useTranslation from '@/hooks/use-translation';
import { usePage } from '@inertiajs/react';
import { Slash } from 'lucide-react';
import MySchoolFacility from '../components/about-components/my-school-facility';
import MyNewLayout from '../layout/MyLayout';

const SchoolFacilities = () => {
    const { schoolFacilities, locale } = usePage().props;
    const { t } = useTranslation();
    const fontClass = locale === 'kh' ? 'font-kantumruy' : 'font-noto-san-extra-light';
    return (
        <MyNewLayout>
            <div className={`relative flex h-full w-full flex-col items-center justify-center bg-red-900 p-10 text-white md:p-10 dark:bg-red-950 ${fontClass}`}>
                <p className="text-3xl text-white md:text-4xl">{locale === 'kh' ? (schoolFacilities?.title_kh ?? schoolFacilities?.title) : schoolFacilities?.title}</p>
                <div>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/" className="text-white">
                                    {t('Home')}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <Slash className="text-gray-400" />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#" className="text-gray-400">
                                    {locale === 'kh' ? (schoolFacilities?.title_kh ?? schoolFacilities?.title) : schoolFacilities?.title}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>
            <MySchoolFacility schoolFacilitiesChildren={schoolFacilities?.children} />
        </MyNewLayout>
    );
};

export default SchoolFacilities;
