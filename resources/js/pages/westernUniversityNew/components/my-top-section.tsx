import { useInitials } from '@/hooks/use-initials';
import useTranslation from '@/hooks/use-translation';
import { usePage } from '@inertiajs/react';
import { MyLanguage } from './my-language';
import Switch from './news-component/my-switch';

const MyTopSection = () => {
    const { application_info, locale } = usePage().props;
    const fontClass = locale === 'kh' ? 'font-kantumruy-italic' : '';
    const getInitials = useInitials();
    const { auth } = usePage().props;
    return (
        <div className="font-kantumruy-italic font-medium hidden w-full overflow-hidden bg-[#0B2A5B] py-4 text-sm text-white/80 xl:block">
            <div className="mx-auto flex max-w-screen-2xl flex-col flex-wrap items-start justify-between gap-4 px-6 lg:flex-row lg:items-center xl:px-16">
                {/* Left Section */}
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center lg:gap-6">
                    <div className="flex items-center space-x-2">
                        <img src="/assets/demo-images/icons8-call-80.png" className="w-5" />
                        <span>{application_info?.phone}</span>
                    </div>
                    <div className={`flex max-w-xs items-center space-x-2 sm:max-w-md lg:max-w-full ${fontClass}`}>
                        <img src="/assets/demo-images/icons8-location-80.png" className="w-5" />
                        <span>{locale === 'kh' ? (application_info?.address_kh ?? application_info?.address) : application_info?.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <img src="/assets/demo-images/icons8-mail-80.png" className="w-5" />
                        <span>{application_info?.email}</span>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center lg:gap-6">
                    <div className="flex items-center space-x-2">
                        {/* <img src="/assets/demo-images/icons8-login-80.png" className="w-5" /> */}
                        {/* <div className="flex min-w-0 flex-wrap items-center justify-end gap-3">
                            <div className="flex items-center gap-1">
                                {auth?.user ? (
                                    <Link prefetch href="/dashboard">
                                        <Avatar className="size-7 overflow-hidden rounded-full">
                                            <AvatarImage src={`/assets/images/users/thumb/${auth?.user?.image}`} alt={auth?.user?.name} />

                                            <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                                {getInitials(auth?.user?.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Link>
                                ) : (
                                    <Link prefetch href="/login">
                                        <Button size="icon" variant="outline" className="text-primary">
                                            <UserIconAnimated stroke="#0471c1" />
                                        </Button>
                                    </Link>
                                )}
                            </div>
                            <a href="/login" className="hover:text-white">
                                Login
                            </a>
                        </div> */}
                        <MyLanguage />
                        <div className="ml-2">
                            <Switch />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyTopSection;
