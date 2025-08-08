import useTranslation from '@/hooks/use-translation';
import { Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import React from 'react';
import { Button } from './ui/button';

const MyAddNewButtonNewStyle = ({
    url,
    onClick,
    type = 'button',
}: {
    url?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    type?: 'button' | 'link';
}) => {
    const { t } = useTranslation();
    return (
        <>
            {type === 'button' ? (
                <span className="rounded-xl transition-all duration-300 hover:rounded-lg hover:p-0">
                    <Button type='button' onClick={onClick}>
                        <Plus />
                        {t('Add')}
                    </Button>
                </span>
            ) : (
                <Link
                    href={url || ''}
                    className=" rounded-xl transition-all duration-300 hover:rounded-lg hover:border-white hover:p-0"
                >
                    <Button type='button'>
                        <Plus />
                        {t('Add')}
                    </Button>
                </Link>
            )}
        </>
    );
};

export default MyAddNewButtonNewStyle;
