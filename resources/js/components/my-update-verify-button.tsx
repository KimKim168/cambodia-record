import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import useTranslation from '@/hooks/use-translation';
import { useForm } from '@inertiajs/react';
import { BadgeCheck, BadgeX, LoaderIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface UpdateStatusButtonProps {
    id: number;
    pathName: string;
    currentStatus: string;
    statuses: string[];
}

const statusVariants: Record<string, string> = {
    verify: 'text-white hover:bg-blue-600/85 bg-blue-600',
    unverify: 'text-white hover:bg-yellow-500/85 bg-yellow-500',
    pending: 'text-white hover:bg-yellow-600/85 bg-yellow-600',
    public: 'text-white hover:bg-blue-500/85 bg-blue-500',
    private: 'text-white hover:bg-gray-500/85 bg-gray-500',
    free: 'text-white hover:bg-green-500/85 bg-green-500',
    subscribe: 'text-white hover:bg-red-500/85 bg-red-500',
};
const statusVariantsText: Record<string, string> = {
    verify: 'text-blue-600',
    unverify: 'text-yellow-500',
    pending: 'text-yellow-600',
    public: 'text-blue-500',
    private: 'text-gray-500',
    free: 'text-green-500',
    subscribe: 'text-red-500',
};

const MyUpdateVerifyButton = ({ id, pathName, currentStatus, statuses }: UpdateStatusButtonProps) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const { post, data, processing, errors } = useForm();

    const handleChangeStatus = (status: string) => {
        // console.log(status);
        data.verify_status = status;
        post(`${pathName}/${id}/update_verify_status`, {
            preserveScroll: true,
            onSuccess: (page) => {
                if (page.props.flash?.success) {
                    toast.success('Success', {
                        description: page.props.flash.success,
                    });
                }
            },
            onError: (e) => {
                toast.error('Error', {
                    description: 'Failed to update.' + JSON.stringify(e, null, 2),
                });
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <TooltipProvider delayDuration={300}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DialogTrigger className="cursor-pointer" asChild>
                            {currentStatus == 'unverify' ? (<Button variant="outline" className={`${statusVariantsText[currentStatus]} capitalize`} size="sm">
                               <BadgeX /> {currentStatus}
                            </Button>):(
                                <Button variant="outline" className={`${statusVariantsText[currentStatus]} capitalize`} size="sm">
                                <BadgeCheck/>{currentStatus}
                            </Button>
                            )}
                            {/* <Button variant="outline" className={`${statusVariantsText[currentStatus]} capitalize`} size="sm">
                                {currentStatus}
                            </Button> */}
                        </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                        <p>{t('Update Verify Status')}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t('Are you sure?')}</DialogTitle>
                    <DialogDescription>{t('This action will update the record status.')}</DialogDescription>
                    {errors.status && <span className="text-destructive">{errors.status}</span>}
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
                            autoFocus={currentStatus === status}
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

export default MyUpdateVerifyButton;
