import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { usePage } from '@inertiajs/react';
import { Slash } from 'lucide-react';
import MyHeroBottomHistory from '../components/about-components/my-hero-bottom-history';
import MyHeroHistory from '../components/about-components/my-hero-history';
import MyMission from '../components/about-components/my-mission';
import MyNewLayout from '../layout/MyLayout';
import MyValuesWiscare from './my_values_wiscare';
import useTranslation from '@/hooks/use-translation';

const HistoryAndValues = () => {
    const { hestoryTitle, locale } = usePage().props;
    const { t } = useTranslation();
    const fontClass = locale === 'kh' ? 'font-kantumruy' : 'font-noto-san-extra-light';
    return (
        <MyNewLayout>
            <div className={`relative flex h-full w-full flex-col items-center justify-center bg-red-900 p-10 text-white md:p-10 dark:bg-red-950 ${fontClass}`}>
                <p className="text-3xl text-white md:text-4xl">{locale === 'kh' ? (hestoryTitle?.title_kh ?? hestoryTitle?.title) : hestoryTitle?.title}</p>
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
                                    {locale === 'kh' ? (hestoryTitle?.title_kh ?? hestoryTitle?.title) : hestoryTitle?.title}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>

            <MyHeroHistory />
            {/*Start Vision */}
            {/* <MyBlogImage /> */}
            <MyHeroBottomHistory />
            {/*Start Vision */}
            {/* Start mission */}
            <MyMission />
            {/* End mission */}
            {/* Start values wiscare */}
            <MyValuesWiscare />
            {/* End values wiscare */}
        </MyNewLayout>
    );
};

export default HistoryAndValues;
