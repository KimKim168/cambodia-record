import useTranslation from '@/hooks/use-translation';
import { cn } from '@/lib/utils';
import { MyLanguageSelector } from '@/pages/westec/components/my-select-language';
import { Link, usePage } from '@inertiajs/react';
import { AlignLeftIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { HoveredLink, Menu, MenuItem } from './ui/navbar-menu';

export function MyNavbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);

    const { t, currentLocale } = useTranslation();
    const { pages_menus } = usePage().props;
    // console.log(pages_menus);
    return (
        <>
            <div className={cn('mx-auto max-w-[2000px]', className)}>
                <div className="bg-background flex h-full items-center justify-between border-b px-4 py-4 lg:px-16 lg:py-8">
                    <a href="/" className="w-50">
                        <img src="/assets/westec/images/logo.png" />
                    </a>
                    <Button size="icon" variant="outline" className="xl:hidden">
                        <AlignLeftIcon className="stroke-primary stroke-3" />
                    </Button>
                    <div className="hidden xl:block">
                        <Menu setActive={setActive}>
                            {pages_menus?.abouts && (
                                <Link prefetch href={`/about`}>
                                    <MenuItem
                                        setActive={setActive}
                                        active={active}
                                        item={currentLocale == 'kh' ? pages_menus?.abouts.title_kh : pages_menus?.abouts.title}
                                    >
                                        {pages_menus?.abouts.children?.length > 0 && (
                                            <div className="flex flex-col space-y-4 text-sm">
                                                {pages_menus?.abouts.children?.map((about) => (
                                                    <HoveredLink href={`/about#${about?.code}`}>
                                                        {currentLocale == 'kh' ? about?.title_kh : about?.title}
                                                    </HoveredLink>
                                                ))}
                                            </div>
                                        )}
                                    </MenuItem>
                                </Link>
                            )}

                            {pages_menus?.solutions && (
                                <Link prefetch href={`/solutions`}>
                                    <MenuItem
                                        setActive={setActive}
                                        active={active}
                                        item={currentLocale == 'kh' ? pages_menus?.solutions.title_kh : pages_menus?.solutions.title}
                                    >
                                        {pages_menus?.solutions.children?.length > 0 && (
                                            <div className="flex flex-col space-y-4 text-sm">
                                                {pages_menus?.solutions.children?.map((solution) => (
                                                    <HoveredLink href={`/solutions#${solution?.code}`}>
                                                        {currentLocale == 'kh' ? solution?.title_kh : solution?.title}
                                                    </HoveredLink>
                                                ))}
                                            </div>
                                        )}
                                    </MenuItem>
                                </Link>
                            )}
                            {pages_menus?.case_studies && (
                                <Link prefetch href={`/case_studies`}>
                                    <MenuItem
                                        setActive={setActive}
                                        active={active}
                                        item={currentLocale == 'kh' ? pages_menus?.case_studies.title_kh : pages_menus?.case_studies.title}
                                    >
                                        {pages_menus?.case_studies.children?.length > 0 && (
                                            <div className="flex flex-col space-y-4 text-sm">
                                                {pages_menus?.case_studies.children?.map((case_study) => (
                                                    <HoveredLink href={`/case_studies#${case_study?.code}`}>
                                                        {currentLocale == 'kh' ? case_study?.title_kh : case_study?.title}
                                                    </HoveredLink>
                                                ))}
                                            </div>
                                        )}
                                    </MenuItem>
                                </Link>
                            )}

                            <Link prefetch href={`/#partners`}>
                                <MenuItem setActive={setActive} active={active} item="Partners">
                                    {/* <div className="flex flex-col space-y-4 text-sm">
                                        <HoveredLink href="/#partners">Our Partners</HoveredLink>
                                    </div> */}
                                </MenuItem>
                            </Link>

                            <Link prefetch href={`/career`}>
                                <MenuItem setActive={setActive} active={active} item="Career">
                                    <div className="flex flex-col space-y-4 text-sm">
                                        <HoveredLink href="/career">Employee Highlight</HoveredLink>
                                        <HoveredLink href="/career">Career</HoveredLink>
                                    </div>
                                </MenuItem>
                            </Link>

                            <Link prefetch href={`/#newsId`}>
                                <MenuItem setActive={setActive} active={active} item="News">
                                    <div className="flex flex-col space-y-4 text-sm">
                                        <HoveredLink href="/#newsId">News & Updates</HoveredLink>
                                        <HoveredLink href="/#eventsId">Events & Promotions</HoveredLink>
                                    </div>
                                </MenuItem>
                            </Link>

                            <Link prefetch href={`/contact`}>
                                <MenuItem setActive={setActive} active={active} item="Contact Us">
                                    <div className="flex flex-col space-y-4 text-sm">
                                        <HoveredLink href="/contact">Project Inquiry?</HoveredLink>
                                        <HoveredLink href="/contact">Get Support?</HoveredLink>
                                        <HoveredLink href="/contact">Location (Map)</HoveredLink>
                                    </div>
                                </MenuItem>
                            </Link>

                            <div>
                                <MyLanguageSelector />
                            </div>
                        </Menu>
                    </div>
                </div>
            </div>
        </>
    );
}
