import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

const FormMessage = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        phone: '',
        email: '',
        message: '',
    });
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post('/submit-message', {
            preserveScroll: true,
            onSuccess: (page) => {
                if (page.props.flash?.success) {
                    toast.success('Success', {
                        description: page.props.flash.success,
                    });
                    setSuccessMessage(page.props.flash?.success);
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
                    description: 'Failed to send message.',
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
                        placeholder="Your full name"
                        id="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="mt-1.5 h-11"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
                </div>

                <div className="col-span-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                        type="tel"
                        placeholder="Phone number"
                        id="phone"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        className="mt-1.5 h-11"
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
                </div>

                <div className="col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        placeholder="Email"
                        id="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="mt-1.5 h-11"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
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
            </div>
            {successMessage && <p className="mt-2 text-center text-sm text-primary">{successMessage}</p>}
            {successMessage && <p className="mt-1 text-center text-sm text-primary">We will get back to you as soon as possible.</p>}

            <button
            type="submit"
            disabled={processing}
            className="group mt-6 cursor-pointer relative bottom-0 z-10 flex items-center justify-center gap-2 overflow-hidden rounded-lg border border-[#000] bg-[#000] px-4 py-2 font-black text-[#FFF] uppercase duration-700 ease-in-out hover:bg-[#FFF] hover:text-[#000] focus:bg-[#FFF] focus:text-[#000] active:scale-95 active:duration-0"
        >
            <span className="absolute top-0 left-0 -z-10 h-full w-0 rounded-xl bg-[#FFF] transition-all duration-700 group-hover:w-full"></span>
            <span className="z-10 truncate duration-300 ease-in-out group-focus:translate-x-96 group-active:-translate-x-96">Send Message</span>

            <div className="absolute z-10 flex -translate-x-96 flex-row items-center justify-center gap-2 duration-300 ease-in-out group-focus:translate-x-0 group-active:translate-x-0">
                {/* Spinner animation */}
                <div className="size-4 animate-spin rounded-full border-2 border-[#000] border-t-transparent"></div>
                Processing...
            </div>

            <svg
                className="z-10 fill-[#FFF] duration-700 ease-in-out group-hover:-translate-x-0 group-hover:fill-[#000] group-focus:translate-x-96 group-focus:fill-[#000] group-active:translate-x-96 group-active:duration-0"
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="16"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="m476.59 227.05-.16-.07L49.35 49.84A23.56 23.56 0 0 0 27.14 52 24.65 24.65 0 0 0 16 72.59v113.29a24 24 0 0 0 19.52 23.57l232.93 43.07a4 4 0 0 1 0 7.86L35.53 303.45A24 24 0 0 0 16 327v113.31A23.57 23.57 0 0 0 26.59 460a23.94 23.94 0 0 0 13.22 4 24.55 24.55 0 0 0 9.52-1.93L476.4 285.94l.19-.09a32 32 0 0 0 0-58.8z"></path>
            </svg>
        </button>
        </form>
    );
};

export default FormMessage;
