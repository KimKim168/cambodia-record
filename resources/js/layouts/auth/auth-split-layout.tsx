import AppLogoIcon from '@/components/app-logo-icon';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import AuthTabs from './auth-tabls';

interface AuthLayoutProps {
    title?: string;
    description?: string;
}

export default function AuthSplitLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    const { name, quote, application_info } = usePage<SharedData>().props;

    return (
        <>
        {/* <div className="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-zinc-900">
                    <div className="flex h-full items-center justify-center">
                        <AppLogoIcon className="mr-2 size-40 fill-current text-white" />
                    </div>
                </div>
                <Link href={'/'} className="relative z-20 flex items-center text-lg font-medium">
                    <AppLogoIcon className="mr-2 size-8 fill-current text-white" />
                    {application_info?.name || name}
                </Link>
                {quote && (
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">&ldquo;{quote.message}&rdquo;</p>
                            <footer className="text-sm text-neutral-300">{quote.author}</footer>
                        </blockquote>
                    </div>
                )}
            </div>
            <div className="w-full lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <Link href={'/'} className="relative z-20 flex items-center justify-center">
                        <AppLogoIcon className="fill-current text-black" />
                    </Link>
                    <AuthTabs />
                    <div className="flex flex-col items-start gap-2 text-left sm:items-center sm:text-center">
                        <h1 className="text-xl font-medium">{title}</h1>
                        <p className="text-muted-foreground text-sm text-balance">{description}</p>
                    </div>
                    {children}
                </div>
            </div>
        </div> */}
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#0B2A5B]/50 via-[#0B2A5B] to-[#0B2A5B]/70 relative overflow-hidden">
                <div className="p-8 w-full max-w-md backdrop-blur-xl bg-white/10 rounded-2xl overflow-hidden shadow-2xl border border-white/20 relative z-20">
                    <Link href={'/'} className="relative z-20 flex items-center justify-center">
                        <AppLogoIcon className="fill-current text-black" />
                    </Link>
                    {/* <AuthTabs /> */}
                    <div className="flex flex-col items-start my-8 gap-2 text-left sm:items-center sm:text-center">
                        <h1 className="text-xl text-white mb-2 font-medium">{title}</h1>
                        <p className="text-white text-sm text-balance">{description}</p>
                    </div>
                    {children}
                </div>
            </div>
        </>
    );
}
