import MyDialogCloseButton from '@/components/my-dialog-close-button';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';
import Create from '../Create';
import useTranslation from '@/hooks/use-translation';
import MyAddNewButtonPeople from '@/components/my-add-new-button-people';
const AddNewButtonPeople = () => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Dialog modal={false} open={isOpen}>
            <DialogTrigger asChild>
               <MyAddNewButtonPeople
                onClick={() => setIsOpen(true)}/>
            </DialogTrigger>
            {isOpen && <div className="fixed inset-0 z-40 bg-black/80" />}
            {/* Custom dark background */}
            <DialogContent className="z-50">
                <MyDialogCloseButton onClick={() => setIsOpen(false)} />
                <DialogHeader>
                    <DialogTitle>{t('Create')}</DialogTitle>
                    <DialogDescription className="hidden"></DialogDescription>
                    <Create setIsOpen={setIsOpen} />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default AddNewButtonPeople;
