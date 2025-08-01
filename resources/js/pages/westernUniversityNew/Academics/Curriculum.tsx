import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import useTranslation from '@/hooks/use-translation';
import { usePage } from '@inertiajs/react';
import { Slash } from 'lucide-react';
import MySchoolCurriculum from '../components/academic-components/my-school-curriculum';
import MyNewLayout from '../layout/MyLayout';
const Curriculum = () => {
    const { curriculum, locale } = usePage().props;
    const { t } = useTranslation();
    const fontClass = locale === 'kh' ? 'font-kantumruy' : 'font-noto-san-extra-light';
    return (
        <MyNewLayout>
             <div className={`relative flex h-full w-full flex-col items-center justify-center bg-red-900 p-10 text-white md:p-10 dark:bg-red-950 ${fontClass}`}>
                <p className="text-3xl text-white md:text-4xl">{locale === 'kh' ? (curriculum?.title_kh ?? curriculum?.title) : curriculum?.title}</p>
                <div>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/" className="text-white hover:text-gray-200 dark:hover:text-gray-300">
                                    {t('Home')}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <Slash className="text-gray-200 dark:text-gray-400" />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    href="#"
                                    className="text-gray-400"
                                >
                                    {locale === 'kh' ? (curriculum?.title_kh ?? curriculum?.title) : curriculum?.title}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>
            <MySchoolCurriculum long_description={locale === 'kh' ? (curriculum?.long_description_kh ?? curriculum?.long_description) : curriculum?.long_description} />
        </MyNewLayout>
    );
};

export default Curriculum;
