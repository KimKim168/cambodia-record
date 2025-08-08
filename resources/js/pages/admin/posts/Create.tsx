import DeleteButton from '@/components/delete-button';
import { AutosizeTextarea } from '@/components/ui/autosize-textarea';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { FileInput, FileUploader, FileUploaderContent, FileUploaderItem } from '@/components/ui/file-upload';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ProgressWithValue } from '@/components/ui/progress-with-value';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import usePermission from '@/hooks/use-permission';
import useTranslation from '@/hooks/use-translation';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import MyCkeditor5 from '@/pages/plugins/ckeditor5/my-ckeditor5';
import { BreadcrumbItem } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as inertiaUseForm, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { CalendarIcon, Check, ChevronsUpDown, CloudUpload, Loader, Paperclip } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import AddNewButtonNewStyleCategory from '../post_categories/components/add-new-button-new-style-category';
import AddNewButtonNewStyleCreator from '../post_creators/components/add-new-button-new-style-creator';
import AddNewButtonNewStylePublisher from '../post_publishers/components/add-new-button-new-style-publisher';
import AddNewButtonNewStyleLocation from '../post_publishing_countries/components/add-new-button-new-style-location';
import AddNewButtonNewStyle from '../types/components/add-new-button-new-style';

const formSchema = z.object({
    title: z.string().min(1).max(255),
    title_kh: z.string().max(255).optional(),
    short_description: z.string().max(500).optional(),
    short_description_kh: z.string().max(500).optional(),
    link: z.string().max(255).optional(),
    type: z.string().optional(),
    subject: z.string().optional(),
    year: z.string().optional(),
    status: z.string().optional(),
    parent_id: z.string().optional(),
    source: z.string().optional(),
    category_code: z.string().optional(),
    creator_id: z.string().optional(),
    publisher_id: z.string().optional(),
    publishing_countries_code: z.string().optional(),
    post_date: z.coerce.date(),
});

export default function Create() {
    // ===== Start Our Code =====
    const { t } = useTranslation();
    const dropZoneConfig = {
        maxFiles: 100,
        maxSize: 1024 * 1024 * 2, // 2MB
        multiple: true,
        accept: {
            'image/jpeg': ['.jpeg', '.jpg'],
            'image/png': ['.png'],
            'image/gif': ['.gif'],
            'image/webp': ['.webp'],
        },
    };

    const dropZoneConfigUploadFile = {
        maxFiles: 100,
        maxSize: 1024 * 1024 * 300, // 300MB (307200 KB = 300MB)
        multiple: true,
        accept: {
            'application/pdf': ['.pdf'],
            'application/msword': ['.doc'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
            'application/vnd.ms-excel': ['.xls'],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
            'application/vnd.ms-powerpoint': ['.ppt'],
            'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
            'image/jpeg': ['.jpg', '.jpeg'],
            'audio/mpeg': ['.mp3'],
            'video/mp4': ['.mp4'],
            'video/quicktime': ['.mov'],
        },
    };

    const { post, progress, processing, transform, errors } = inertiaUseForm();
    const { postCategories, postCreators, publishingCountry, postPublishers, types, editData, links, readOnly } = usePage().props;

    const [files, setFiles] = useState<File[] | null>(null);
    const [long_description, setLong_description] = useState(editData?.long_description || '');
    const [long_description_kh, setLong_description_kh] = useState(editData?.long_description_kh || '');
    const [editorKey, setEditorKey] = useState(0);
    const [attachmentFiles, setAttachmentFiles] = useState<File[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: editData?.title || '',
            title_kh: editData?.title_kh || '',
            short_description: editData?.short_description || '',
            short_description_kh: editData?.short_description_kh || '',
            link: editData?.link || '',
            type: editData?.type || 'content',
            subject: editData?.subject || '',
            year: editData?.year || '',
            source: editData?.source?.toString() || '',
            status: editData?.status || 'active',
            category_code: editData?.category_code?.toString() || '',
            creator_id: editData?.creator_id?.toString() || '',
            publisher_id: editData?.publisher_id?.toString() || '',
            publishing_countries_code: editData?.publishing_countries_code?.toString() || '',
            post_date: editData?.id ? new Date(editData?.post_date) : new Date(),
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            transform((data) => ({
                ...values,
                long_description: long_description,
                long_description_kh: long_description_kh,
                images: files || null,
                files: attachmentFiles || null,
            }));

            if (editData?.id) {
                post(`/admin/posts/${editData?.id}`, {
                    forceFormData: true,
                    onSuccess: (page) => {
                        setFiles(null);
                        setAttachmentFiles([]); // Clear attachment files on success
                        if (page.props.flash?.success) {
                            toast.success('Success', {
                                description: page.props.flash.success,
                            });
                        }
                        if (page.props.flash?.error) {
                            toast.error('Error', {
                                description: page.props.flash.error,
                            });
                        }
                    },
                    onError: (e) => {
                        toast.error('Error', {
                            description: 'Failed to update.' + JSON.stringify(e, null, 2),
                        });
                    },
                });
            } else {
                // This is for creating a new post
                post('/admin/posts', {
                    preserveScroll: true,
                    onSuccess: (page) => {
                        form.reset();
                        setLong_description('');
                        setLong_description_kh('');
                        setEditorKey((prev) => prev + 1);
                        setFiles(null);
                        setAttachmentFiles([]); // Clear attachment files on success
                        if (page.props.flash?.success) {
                            toast.success('Success', {
                                description: page.props.flash.success,
                            });
                        }
                        if (page.props.flash?.error) {
                            toast.error('Error', {
                                description: page.props.flash.error,
                            });
                        }
                    },
                    onError: (e) => {
                        toast.error('Error', {
                            description: 'Failed to create.' + JSON.stringify(e, null, 2),
                        });
                    },
                });
            }
        } catch (error) {
            console.error('Form submission error', error);
            toast.error('Failed to submit the form. Please try again.' + error);
        }
    }

    const currentBreadcrumb = readOnly ? t('Show') : editData ? t('Edit') : t('Create');
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('Posts'),
            href: '/admin/posts',
        },
        {
            title: currentBreadcrumb,
            href: '#',
        },
    ];
    const hasPermission = usePermission();
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-5">
                    {/* ... The rest of your form JSX is unchanged ... */}
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-6">
                            <FormField
                                control={form.control}
                                name="post_date"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>{t('Post Date')}</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={'outline'}
                                                        className={cn(
                                                            'w-[280px] pl-3 text-left font-normal',
                                                            !field.value && 'text-muted-foreground',
                                                        )}
                                                    >
                                                        {field.value ? format(field.value, 'PPP') : <span>{t('Pick a date')}</span>}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    fromYear={1960}
                                                    toYear={2030}
                                                    captionLayout="dropdown-buttons"
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage>{errors.post_date && <div>{errors.post_date}</div>}</FormMessage>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('Title')}</FormLabel>
                                        <FormControl>
                                            <Input placeholder={t('Title')} type="text" {...field} />
                                        </FormControl>
                                        <FormMessage>{errors.title && <div>{errors.title}</div>}</FormMessage>
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* <div className="col-span-6">
                            <FormField
                                control={form.control}
                                name="title_kh"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('Title Khmer')}</FormLabel>
                                        <FormControl>
                                            <Input placeholder={t('Title Khmer')} type="text" {...field} />
                                        </FormControl>
                                        <FormMessage>{errors.title_kh && <div>{errors.title_kh}</div>}</FormMessage>
                                    </FormItem>
                                )}
                            />
                        </div> */}
                    </div>

                    <FormField
                        control={form.control}
                        name="short_description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('Short Description')}</FormLabel>
                                <FormControl>
                                    <AutosizeTextarea placeholder={t('Short Description')} className="resize-none" {...field} />
                                </FormControl>
                                <FormMessage>{errors.short_description && <div>{errors.short_description}</div>}</FormMessage>
                            </FormItem>
                        )}
                    />

                    {/* <FormField
                        control={form.control}
                        name="short_description_kh"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('Short Description Khmer')}</FormLabel>
                                <FormControl>
                                    <AutosizeTextarea placeholder={t('Short Description Khmer')} className="resize-none" {...field} />
                                </FormControl>
                                <FormMessage>{errors.short_description_kh && <div>{errors.short_description_kh}</div>}</FormMessage>
                            </FormItem>
                        )}
                    /> */}

                    <div className="grid grid-cols-6 gap-4 lg:grid-cols-12">
                        <div className="col-span-6">
                            <FormField
                                control={form.control}
                                name="subject"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('Subject')}</FormLabel>
                                        <FormControl>
                                            <Input placeholder={t('Subject')} type="text" className="h-10" {...field} />
                                        </FormControl>
                                        <FormDescription>{t('Enter a short and clear subject.')}</FormDescription>
                                        <FormMessage>{errors.subject && <div>{errors.subject}</div>}</FormMessage>
                                    </FormItem>
                                )}
                            />
                        </div>
                        {types ? (
                            <div className="col-span-6">
                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem key={field.value}>
                                            <FormLabel>{t('Type')}</FormLabel>
                                            <div className="flex items-center justify-between gap-2">
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder={t('Select Type')} />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {types.map((typeObject) => (
                                                            <SelectItem key={typeObject.id + typeObject.type} value={typeObject.type}>
                                                                {typeObject.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                {hasPermission('type create') && <AddNewButtonNewStyle />}
                                            </div>
                                            <FormDescription>{t('Choose type for external content and fill Link input.')}</FormDescription>
                                            <FormMessage>{errors.type && <div>{errors.type}</div>}</FormMessage>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        ) : null}
                    </div>

                    <div className="grid grid-cols-6 gap-4 lg:grid-cols-12">
                        {/* Category */}
                        <div className="col-span-6">
                            <FormField
                                control={form.control}
                                name="category_code"
                                render={({ field }) => (
                                    <FormItem key={field.value}>
                                        <FormLabel>{t('Category')}</FormLabel>
                                        <div className="flex items-center gap-2">
                                            <Popover className="flex-grow">
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            className={cn('flex-grow justify-between', !field.value && 'text-muted-foreground')}
                                                        >
                                                            {field.value
                                                                ? (() => {
                                                                      const category = postCategories?.find((c) => c.code === field.value);
                                                                      return category ? `${category.name}` : '';
                                                                  })()
                                                                : t('Select category')}
                                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="p-0">
                                                    <Command>
                                                        <CommandInput placeholder="Search category..." />
                                                        <CommandList>
                                                            <CommandEmpty>{t('No data')}</CommandEmpty>
                                                            <CommandGroup>
                                                                <CommandItem value="" onSelect={() => form.setValue('category_code', '')}>
                                                                    <Check
                                                                        className={cn(
                                                                            'mr-2 h-4 w-4',
                                                                            '' == field.value ? 'opacity-100' : 'opacity-0',
                                                                        )}
                                                                    />
                                                                    {t('Select category')}
                                                                </CommandItem>
                                                                {postCategories?.map((category) => (
                                                                    <CommandItem
                                                                        value={category.name}
                                                                        key={category.code}
                                                                        onSelect={() => form.setValue('category_code', category.code)}
                                                                    >
                                                                        <Check
                                                                            className={cn(
                                                                                'mr-2 h-4 w-4',
                                                                                category.code === field.value ? 'opacity-100' : 'opacity-0',
                                                                            )}
                                                                        />
                                                                        {category.name}
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                            {hasPermission('post create') && <AddNewButtonNewStyleCategory />}
                                        </div>
                                        <FormDescription>{t('Select the category where this post will show.')}</FormDescription>
                                        <FormMessage>{errors.category_code && <div>{errors.category_code}</div>}</FormMessage>
                                    </FormItem>
                                )}
                            />
                        </div>
                        {/* Creator */}
                        <div className="col-span-6">
                            <FormField
                                control={form.control}
                                name="creator_id"
                                render={({ field }) => (
                                    <FormItem key={field.value}>
                                        <FormLabel>{t('Creator')}</FormLabel>
                                        <div className="flex items-center gap-2">
                                            <Popover className="flex-grow">
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            className={cn('flex-grow justify-between', !field.value && 'text-muted-foreground')}
                                                        >
                                                            {field.value
                                                                ? (() => {
                                                                      const creator = postCreators?.find((c) => c.id == field.value);
                                                                      return creator ? `${creator.name}` : '';
                                                                  })()
                                                                : t('Select creator')}
                                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="p-0">
                                                    <Command>
                                                        <CommandInput placeholder="Search creator..." />
                                                        <CommandList>
                                                            <CommandEmpty>{t('No data')}</CommandEmpty>
                                                            <CommandGroup>
                                                                <CommandItem value="" onSelect={() => form.setValue('creator_id', '')}>
                                                                    <Check
                                                                        className={cn(
                                                                            'mr-2 h-4 w-4',
                                                                            '' == field.value ? 'opacity-100' : 'opacity-0',
                                                                        )}
                                                                    />
                                                                    {t('Select creator')}
                                                                </CommandItem>
                                                                {postCreators?.map((creator) => (
                                                                    <CommandItem
                                                                        value={creator.name}
                                                                        key={creator.id}
                                                                        onSelect={() => form.setValue('creator_id', creator.id.toString())}
                                                                    >
                                                                        <Check
                                                                            className={cn(
                                                                                'mr-2 h-4 w-4',
                                                                                creator.id.toString() === field.value ? 'opacity-100' : 'opacity-0',
                                                                            )}
                                                                        />
                                                                        {creator.name} {creator.name_kh && `(${creator.name_kh})`}
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                            {hasPermission('post create') && <AddNewButtonNewStyleCreator />}
                                        </div>
                                        <FormDescription>{t('Select the creator where this post will show.')}</FormDescription>
                                        <FormMessage>{errors.creator_id && <div>{errors.creator_id}</div>}</FormMessage>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-6 gap-4 lg:grid-cols-12">
                        <div className="col-span-6">
                            <FormField
                                control={form.control}
                                name="publisher_id"
                                render={({ field }) => (
                                    <FormItem key={field.value}>
                                        <FormLabel>{t('Publisher')}</FormLabel>
                                        <div className="flex items-center gap-2">
                                            <Popover className="flex-grow">
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            className={cn('flex-grow justify-between', !field.value && 'text-muted-foreground')}
                                                        >
                                                            {field.value
                                                                ? (() => {
                                                                      const publisher = postPublishers?.find((p) => p.id == field.value);
                                                                      return publisher ? `${publisher.name}` : '';
                                                                  })()
                                                                : t('Select publisher')}
                                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="p-0">
                                                    <Command>
                                                        <CommandInput placeholder="Search publisher..." />
                                                        <CommandList>
                                                            <CommandEmpty>{t('No data')}</CommandEmpty>
                                                            <CommandGroup>
                                                                <CommandItem value="" onSelect={() => form.setValue('publisher_id', '')}>
                                                                    <Check
                                                                        className={cn(
                                                                            'mr-2 h-4 w-4',
                                                                            '' == field.value ? 'opacity-100' : 'opacity-0',
                                                                        )}
                                                                    />
                                                                    {t('Select publisher')}
                                                                </CommandItem>
                                                                {postPublishers?.map((publisher) => (
                                                                    <CommandItem
                                                                        value={publisher.name}
                                                                        key={publisher.id}
                                                                        onSelect={() => form.setValue('publisher_id', publisher.id.toString())}
                                                                    >
                                                                        <Check
                                                                            className={cn(
                                                                                'mr-2 h-4 w-4',
                                                                                publisher.id.toString() === field.value ? 'opacity-100' : 'opacity-0',
                                                                            )}
                                                                        />
                                                                        {publisher.name} {publisher.name_kh && `(${publisher.name_kh})`}
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                            {hasPermission('post create') && <AddNewButtonNewStylePublisher />}
                                        </div>
                                        <FormDescription>{t('Select the publisher where this post will show.')}</FormDescription>
                                        <FormMessage>{errors.publisher_id && <div>{errors.publisher_id}</div>}</FormMessage>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-6">
                            <FormField
                                control={form.control}
                                name="publishing_countries_code"
                                render={({ field }) => (
                                    <FormItem key={field.value}>
                                        <FormLabel>{t('Location')}</FormLabel>
                                        <div className="flex items-center gap-2">
                                            <Popover className="flex-grow">
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            className={cn('flex-grow justify-between', !field.value && 'text-muted-foreground')}
                                                        >
                                                            {field.value
                                                                ? (() => {
                                                                      const p_country = publishingCountry?.find((c) => c.code === field.value);
                                                                      return p_country ? `${p_country.name}` : '';
                                                                  })()
                                                                : t('Select location')}
                                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="p-0">
                                                    <Command>
                                                        <CommandInput placeholder="Search location..." />
                                                        <CommandList>
                                                            <CommandEmpty>{t('No data')}</CommandEmpty>
                                                            <CommandGroup>
                                                                <CommandItem value="" onSelect={() => form.setValue('publishing_countries_code', '')}>
                                                                    <Check
                                                                        className={cn(
                                                                            'mr-2 h-4 w-4',
                                                                            '' == field.value ? 'opacity-100' : 'opacity-0',
                                                                        )}
                                                                    />
                                                                    {t('Select location')}
                                                                </CommandItem>
                                                                {publishingCountry?.map((p_country) => (
                                                                    <CommandItem
                                                                        value={p_country.name}
                                                                        key={p_country.code}
                                                                        onSelect={() => form.setValue('publishing_countries_code', p_country.code)}
                                                                    >
                                                                        <Check
                                                                            className={cn(
                                                                                'mr-2 h-4 w-4',
                                                                                p_country.code === field.value ? 'opacity-100' : 'opacity-0',
                                                                            )}
                                                                        />
                                                                        {p_country.name}
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                            {hasPermission('post create') && <AddNewButtonNewStyleLocation />}
                                        </div>
                                        <FormDescription>{t('Select the location where this post will show.')}</FormDescription>
                                        <FormMessage>{errors.publishing_countries_code && <div>{errors.publishing_countries_code}</div>}</FormMessage>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <FormField
                        control={form.control}
                        name="images"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('Select Images')}</FormLabel>
                                <FormControl>
                                    <FileUploader value={files} onValueChange={setFiles} dropzoneOptions={dropZoneConfig} className="relative p-1">
                                        <FileInput id="fileInput" className="outline-1 outline-slate-500 outline-dashed">
                                            <div className="flex w-full flex-col items-center justify-center p-8">
                                                <CloudUpload className="h-10 w-10 text-gray-500" />
                                                <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                                                    <span className="font-semibold">{t('Click to upload')}</span>
                                                    &nbsp; or drag and drop
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
                                            </div>
                                        </FileInput>
                                        <FileUploaderContent className="grid w-full grid-cols-3 gap-2 rounded-md lg:grid-cols-6">
                                            {files?.map((file, i) => (
                                                <FileUploaderItem
                                                    key={i}
                                                    index={i}
                                                    className="bg-background aspect-square h-auto w-full overflow-hidden rounded-md border p-0"
                                                    aria-roledescription={`file ${i + 1} containing ${file.name}`}
                                                >
                                                    <img src={URL.createObjectURL(file)} alt={file.name} className="h-full w-full object-contain" />
                                                </FileUploaderItem>
                                            ))}
                                        </FileUploaderContent>
                                    </FileUploader>
                                </FormControl>
                                <FormMessage>{errors.images && <div>{errors.images}</div>}</FormMessage>
                            </FormItem>
                        )}
                    />
                    {/* Initial Image */}
                    {editData?.images?.length > 0 && (
                        <div className="mt-4 p-1">
                            <FormDescription className="mb-2">{t('Uploaded Images')}</FormDescription>
                            <div className="grid w-full grid-cols-3 gap-2 rounded-md lg:grid-cols-6">
                                {editData.images.map((imageObject) => (
                                    <>
                                        <span
                                            key={imageObject.id}
                                            className="group bg-background relative aspect-square h-auto w-full overflow-hidden rounded-md border p-0"
                                        >
                                            <img
                                                src={'/assets/images/posts/thumb/' + imageObject.image}
                                                alt={imageObject.name}
                                                className="h-full w-full object-contain"
                                            />
                                            <span className="absolute top-1 right-1 group-hover:opacity-100 lg:opacity-0">
                                                <DeleteButton deletePath="/admin/posts/images/" id={imageObject.id} />
                                            </span>
                                        </span>
                                    </>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Upload File */}

                    <FormField
                        control={form.control}
                        name="files"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('Upload File')}</FormLabel>
                                <FormControl>
                                    <FileUploader
                                        value={attachmentFiles}
                                        onValueChange={setAttachmentFiles}
                                        dropzoneOptions={dropZoneConfigUploadFile}
                                        className="relative p-1"
                                    >
                                        <FileInput id="attachmentInput" className="outline-1 outline-slate-500 outline-dashed">
                                            <div className="flex w-full flex-col items-center justify-center p-8">
                                                <CloudUpload className="h-10 w-10 text-gray-500" />
                                                <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                                                    <span className="font-semibold">{t('Click to upload')}</span>
                                                    &nbsp; {t('or drag and drop')}
                                                </p>
                                            </div>
                                        </FileInput>

                                        <FileUploaderContent className="grid w-full grid-cols-3 gap-2 rounded-md lg:grid-cols-4">
                                            {attachmentFiles?.map((file, i) => (
                                                <FileUploaderItem
                                                    key={i}
                                                    index={i}
                                                    className="bg-background h-40 w-full overflow-hidden rounded-md border p-0"
                                                >
                                                    <div className="relative flex h-full w-full items-center justify-center">
                                                        {file.type.startsWith('image') ? (
                                                            <img
                                                                src={URL.createObjectURL(file)}
                                                                alt={file.name}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        ) : file.type.startsWith('video') ? (
                                                            <video className="h-full w-full object-cover" preload="metadata">
                                                                <source src={URL.createObjectURL(file)} type={file.type} />
                                                            </video>
                                                        ) : file.type.startsWith('audio') ? (
                                                            <audio controls className="w-full">
                                                                <source src={URL.createObjectURL(file)} type={file.type} />
                                                            </audio>
                                                        ) : (
                                                            <div className="flex flex-col items-center p-2 text-center text-xs">
                                                                <Paperclip className="mb-1 h-6 w-6 text-gray-500" />
                                                                {file.name}
                                                            </div>
                                                        )}
                                                        <div className="bg-opacity-50 absolute right-0 bottom-0 left-0 truncate bg-black p-1 text-xs text-white">
                                                            {file.name}
                                                        </div>
                                                    </div>
                                                </FileUploaderItem>
                                            ))}
                                        </FileUploaderContent>
                                    </FileUploader>
                                </FormControl>
                                <FormMessage />
                                {editData?.upload_file && editData.upload_file.length > 0 && (
                                    <div className="mt-4 p-1">
                                        <FormDescription className="mb-2">{t('Uploaded file')}:</FormDescription>
                                        <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                                            {editData.upload_file.map((file: any) => (
                                                <div
                                                    key={file.id}
                                                    className="bg-background relative flex items-center justify-between rounded-md border p-2"
                                                >
                                                    <a
                                                        href={`/assets/files/videos/${file.file_name}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex flex-1 items-center gap-2 overflow-hidden text-sm text-blue-600 underline"
                                                    >
                                                        <Paperclip className="size-4 flex-shrink-0" />
                                                        <span className="truncate">{file.file_name}</span>
                                                    </a>
                                                    <DeleteButton deletePath="/admin/posts/upload_file/" id={file.id} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </FormItem>
                        )}
                    />
                    {/* Start Long Description */}
                    <div key={editorKey} className="space-y-8">
                        <div>
                            <p className="mb-1 text-sm font-medium">{t('Long Description')}</p>
                            <MyCkeditor5 data={long_description} setData={setLong_description} />
                        </div>
                        <div>
                            <p className="mb-1 text-sm font-medium">{t('Long Description Khmer')}</p>
                            <MyCkeditor5 data={long_description_kh} setData={setLong_description_kh} />
                        </div>
                    </div>

                    {/* End Long Description */}
                    {progress && <ProgressWithValue value={progress.percentage} position="start" />}
                    {!readOnly && (
                        <Button disabled={processing} type="submit">
                            {processing && (
                                <span className="size-6 animate-spin">
                                    <Loader />
                                </span>
                            )}
                            {processing ? t('Submitting') : t('Submit')}
                        </Button>
                    )}
                </form>
            </Form>
        </AppLayout>
    );
}
