import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Slash } from 'lucide-react';
import { MyCampuseGridLayout } from '../components/about-components/my-campuse-grid-layout';
import MyNewLayout from '../layout/MyLayout';
import MyGoogleMap from '../components/my-google-map';
import { usePage } from '@inertiajs/react';
import useTranslation from '@/hooks/use-translation';

const Campuses = () => {
    const { campuses, locale } = usePage().props;
    const { t } = useTranslation();
    const fontClass = locale === 'kh' ? 'font-kantumruy' : 'font-noto-san-extra-light';
    return (
        <MyNewLayout>
             <div className={`relative flex h-full w-full flex-col items-center justify-center bg-red-900 p-10 text-white md:p-10 dark:bg-red-950 ${fontClass}`}>
                <p className="text-3xl text-white md:text-4xl">{locale === 'kh' ? (campuses?.title_kh ?? campuses?.title) : campuses?.title}</p>
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
                                    {locale === 'kh' ? (campuses?.title_kh ?? campuses?.title) : campuses?.title}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>
            <MyCampuseGridLayout />
            <MyGoogleMap/>
        </MyNewLayout>
    );
};

export default Campuses;
