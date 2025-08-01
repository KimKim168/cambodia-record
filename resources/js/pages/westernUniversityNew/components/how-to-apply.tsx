import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { PaperclipIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/moving-border';

const HowToApply = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        phone: '',
        email: '',
        message: '',
        cv_file: null,
    });

    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post('/submit_career', {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: (page) => {
                if (page.props.flash?.success) {
                    toast.success('Success', {
                        description: page.props.flash.success,
                    });
                    setSuccessMessage(page.props.flash.success);
                    reset();
                }
                if (page.props.flash?.error) {
                    toast.error('Error', {
                        description: page.props.flash.error,
                    });
                }
            },
            onError: () => {
                toast.error('Error', {
                    description: 'Failed to submit application.',
                });
            },
        });
    };

    return (
        <form className="mt-10" onSubmit={handleSubmit}>
            <div className="grid gap-x-8 gap-y-5 md:grid-cols-2">
                <div className="col-span-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        type="name"
                        id="name"
                        placeholder="Name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="mt-1.5 h-11"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
                </div>
                <div className="col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="mt-1.5 h-11"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                </div>
                <div className="col-span-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                        type="phone"
                        id="phone"
                        placeholder="Phone"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        className="mt-1.5 h-11"
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
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

                <div className="col-span-2 flex items-center gap-4">
                    <label
                        htmlFor="cv_file"
                        className="border-input bg-background hover:bg-muted inline-flex cursor-pointer items-center gap-2 rounded-none border px-4 py-2 text-sm"
                    >
                        <PaperclipIcon className="h-4 w-4" />
                        Attach CV (pdf)
                    </label>
                    <input
                        id="cv_file"
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={(e) => setData('cv_file', e.target.files?.[0])}
                    />
                    {data.cv_file && <span className="text-muted-foreground text-sm">{data.cv_file.name}</span>}
                    {errors.cv_file && <p className="text-sm text-red-400">{errors.cv_file}</p>}
                    {successMessage && <p className="text-sm text-green-400">{successMessage}</p>}
                </div>
            </div>
            <button type="submit" disabled={processing} className="submit-button bg-primary text-primary-foreground  w-full h-11 mt-6">
                {processing ? 'Submitting...' : 'Submit'}
            </button>
            
        </form>
    );
};

export default HowToApply;
