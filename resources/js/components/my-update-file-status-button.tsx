import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import useTranslation from '@/hooks/use-translation';
import { router, useForm } from '@inertiajs/react';
import { LoaderIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface UpdateFileStatusButtonProps {
    id: number;
    pathName: string;
    currentStatus: string;
    statuses: string[];
}

const statusVariants: Record<string, string> = {
    public: 'text-white hover:bg-blue-500/85 bg-blue-500',
    private: 'text-white hover:bg-gray-500/85 bg-gray-500',
};

const statusVariantsText: Record<string, string> = {
    public: 'text-blue-500',
    private: 'text-gray-500',
};

const MyUpdateFileStatusButton = ({ id, pathName, currentStatus, statuses }: UpdateFileStatusButtonProps) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const { data, processing, errors } = useForm({ file_status: currentStatus });

    const handleChangeStatus = (status: string) => {
        data.file_status = status;

        router.post(`${pathName}/${id}/update_file_status`, data, {
            preserveScroll: true,
            onSuccess: (page) => {
                if (page.props.flash?.success) {
                    toast.success('Success', { description: page.props.flash.success });
                    setIsOpen(false); // close dialog
                }
            },
            onError: (e) => {
                toast.error('Error', { description: 'Failed to update.' + JSON.stringify(e, null, 2) });
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <TooltipProvider delayDuration={300}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DialogTrigger className="cursor-pointer" asChild>
                            <Button variant="outline" className={`${statusVariantsText[currentStatus]} capitalize`} size="sm">
                                {currentStatus}
                            </Button>
                        </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                        <p>{t('Update File Status')}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t('Are you sure?')}</DialogTitle>
                    <DialogDescription>{t('This action will update the file status.')}</DialogDescription>
                    {errors.file_status && <span className="text-destructive">{errors.file_status}</span>}
                </DialogHeader>

                <DialogFooter className="space-y-2 sm:space-y-0" key={currentStatus}>
                    {processing && (
                        <Button variant="ghost" className="cursor-auto hover:bg-transparent">
                            <span className="size-6 animate-spin">
                                <LoaderIcon />
                            </span>
                            Updating...
                        </Button>
                    )}

                    {statuses.map((status) => (
                        <Button
                            key={status}
                            onClick={() => handleChangeStatus(status)}
                            disabled={processing}
                            autoFocus={currentStatus == status}
                            className={`${statusVariants[status] || 'text-gray-600'} ring-primary m-0 focus:ring-2 focus:ring-offset-2`}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </Button>
                    ))}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default MyUpdateFileStatusButton;
