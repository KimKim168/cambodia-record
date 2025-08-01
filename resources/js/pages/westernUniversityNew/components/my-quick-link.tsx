import useTranslation from '@/hooks/use-translation';
import { Link, usePage } from '@inertiajs/react';

const MyQuickLink = () => {
    const { t } = useTranslation();
    const { locale } = usePage().props;
    const fontClass = locale === 'kh' ? 'font-kantumruy' : '';
    return (
        <div className="flex flex-col gap-1">
            <Link
                href={'/'}
                className={`text-muted-foreground hover:text-foreground underline-offset-4 transition-all dark:text-white dark:hover:underline ${fontClass}`}
            >
                {t('Home')}
            </Link>
            <Link
                href={'/history_and_values'}
                className={`text-muted-foreground hover:text-foreground underline-offset-4 transition-all dark:text-white dark:hover:underline ${fontClass}`}
            >
                {t('History and Values')}
            </Link>
            <Link
                href={'/admissions'}
                className={`text-muted-foreground hover:text-foreground underline-offset-4 transition-all dark:text-white dark:hover:underline ${fontClass}`}
            >
                {t('Admissions')}
            </Link>
            <Link
                href={'/contact'}
                className={`text-muted-foreground hover:text-foreground underline-offset-4 transition-all dark:text-white dark:hover:underline ${fontClass}`}
            >
                {t('Contact')}
            </Link>
            <Link
                href="/job_opportunities"
                className={`text-muted-foreground hover:text-foreground underline-offset-4 transition-all dark:text-white dark:hover:underline ${fontClass}`}
            >
                {t('Job Opportunities')}
            </Link>
        </div>
    );
};

export default MyQuickLink;
