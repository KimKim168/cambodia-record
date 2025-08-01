import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ProgressWithValue } from '@/components/ui/progress-with-value';
import { Textarea } from '@/components/ui/textarea';
import useTranslation from '@/hooks/use-translation';
import { useForm } from '@inertiajs/react';
import { PaperclipIcon } from 'lucide-react';
import { ChangeEvent, useState } from 'react';
import { toast } from 'sonner';

const CareerForm = ({ item }: { item: any }) => {
    const { t, currentLocale } = useTranslation();
    const [fileKey, setFileKey] = useState(Date.now());
    const [successMessage, setSuccessMessage] = useState('');

    const { data, setData, post, processing, progress, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        message: '',
        cv_file: null as File | null,
        career_id: item?.id,
    });

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData('cv_file', e.target.files ? e.target.files[0] : null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/submit_career', {
            onSuccess: (page) => {
                if (page.props.flash?.success) {
                    setSuccessMessage(page.props.flash.success);
                    toast.success('Success', { description: page.props.flash.success });
                    reset();
                    setFileKey(Date.now());
                }
                if (page.props.flash?.error) {
                    toast.error('Error', { description: page.props.flash.error });
                }
            },
            onError: (e) => {
                toast.error('Error', { description: 'Failed to submit. ' + JSON.stringify(e, null, 2) });
            },
            preserveScroll: true,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="w-full space-y-4 lg:w-md">
            <div>
                <Label htmlFor="name">{t('Name')}</Label>
                <Input
                    id="name"
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder={t('Name')}
                    className="w-full max-w-full rounded-none"
                />
                {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>
            <div>
                <Label htmlFor="email">{t('Email')}</Label>
                <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    placeholder={t('Email')}
                    className="w-full max-w-full rounded-none"
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>

            <div>
                <Label htmlFor="phone">{t('Phone number')}</Label>
                <Input
                    id="phone"
                    type="tel"
                    value={data.phone}
                    onChange={(e) => setData('phone', e.target.value)}
                    placeholder={t('Phone')}
                    className="w-full max-w-full rounded-none"
                />
                {errors.phone && <p className="text-red-500">{errors.phone}</p>}
            </div>

            <div className="col-span-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                    id="message"
                    placeholder="Write your message here"
                    value={data.message}
                    onChange={(e) => setData('message', e.target.value)}
                    className="mt-1.5"
                    rows={6}
                />
                {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
                <Button asChild variant="secondary" className="rounded-none">
                    <label htmlFor="cv-upload" className="flex cursor-pointer items-center gap-2">
                        <PaperclipIcon /> {t('Attach CV')}
                    </label>
                </Button>
                <div className="flex justify-end gap-4">
                    <Button type="submit" variant="secondary" className="rounded-none" disabled={processing}>
                        {processing ? t('Submitting...') : t('Submit')}
                    </Button>
                </div>
            </div>
            <input key={fileKey} id="cv-upload" type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" />
            {data.cv_file && <span className="text-sm">{data.cv_file.name}</span>}
            {errors.cv_file && <p className="text-red-500">{errors.cv_file}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}

            {progress && <ProgressWithValue value={progress.percentage} position="start" />}
        </form>
    );
};

export default CareerForm;
