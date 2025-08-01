import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import MySearch from '../my-search';
import { HoveredLink, Menu, MenuItem } from '../ui/navbar-menu';
import useTranslation from '@/hooks/use-translation';

export function MyNavMenu({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    const { t } = useTranslation();
    const { locale } = usePage().props;
    const fontClass = locale === 'kh' ? 'font-kantumruy' : '';

    return (
        <div className={cn('mx-auto w-full', className)}>
            <div className="flex h-full items-center justify-end">
                <div className="hidden xl:block">
                    <div className="flex items-center gap-2">
                        <Menu setActive={setActive}>
                            <Link href={`/`}>
                                <MenuItem
                                    setActive={setActive}
                                    active={active}
                                    item={t('Home')}
                                    subRoutes={['/']}
                                    className={`${fontClass}`}
                                />
                            </Link>
                            <Link href={`#`}>
                                <MenuItem
                                    setActive={setActive}
                                    active={active}
                                    item={t('About')}
                                    subRoutes={['/history_and_values', '/school_facilities', '/campuses']}
                                    className={fontClass}
                                >
                                    <div className={`flex flex-col space-y-4 text-sm ${fontClass}`}>
                                        <HoveredLink href="/history_and_values" >{t('History and Values')}</HoveredLink>
                                        <HoveredLink href="/school_facilities">{t('School Facilities')}</HoveredLink>
                                        <HoveredLink href="/campuses">{t('Campuses')}</HoveredLink>
                                    </div>
                                </MenuItem>
                            </Link>
                            <Link href={`#`}>
                                <MenuItem
                                    setActive={setActive}
                                    active={active}
                                    item={t('Academics')}
                                    subRoutes={['/curriculum', '/programs', '/class_schedules_and_subjects', '/school_calendar']}
                                    className={fontClass}
                                >
                                    <div className={`flex flex-col space-y-4 text-sm ${fontClass}`}>
                                        <HoveredLink href="/curriculum">{t('Curriculum')}</HoveredLink>
                                        <HoveredLink href="/programs">{t('Programs')}</HoveredLink>
                                        <HoveredLink href="/class_schedules_and_subjects">{t('Class Schedules And Subjects')}</HoveredLink>
                                        <HoveredLink href="/school_calendar">{t('School Calendar')}</HoveredLink>
                                    </div>
                                </MenuItem>
                            </Link>
                            <Link href={`/admissions`}>
                                <MenuItem
                                    setActive={setActive}
                                    active={active}
                                    item={t('Admissions')}
                                    subRoutes={['/admissions']}
                                    className={fontClass}
                                />
                            </Link>
                            <Link href={`#`}>
                                <MenuItem
                                    setActive={setActive}
                                    active={active}
                                    item={t('School Life')}
                                    subRoutes={[
                                        '/student_services',
                                        '/activities_and_events',
                                        '/extracurricular_activities',
                                        '/outreach_programs',
                                        '/student_council',
                                        '/news',
                                    ]}
                                    className={fontClass}
                                >
                                    <div className={`flex flex-col space-y-4 text-sm ${fontClass}`}>
                                        <HoveredLink href="/student_services">{t('Student Services')}</HoveredLink>
                                        <HoveredLink href="/activities_and_events">{t('Activities And Events')}</HoveredLink>
                                        <HoveredLink href="/extracurricular_activities">{t('Extracurricular Activities')}</HoveredLink>
                                        <HoveredLink href="/outreach_programs">{t('Outreach Programs')}</HoveredLink>
                                        <HoveredLink href="/student_council">{t('Student Council')}</HoveredLink>
                                        <HoveredLink href="/news">{t('News And Blogs')}</HoveredLink>
                                    </div>
                                </MenuItem>
                            </Link>
                            <Link href={`/contact`}>
                                <MenuItem
                                    setActive={setActive}
                                    active={active}
                                    item={t('Contact')}
                                    subRoutes={['/contact']}
                                    className={fontClass}
                                />
                            </Link>
                        </Menu>
                        <div>
                            <MySearch />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
