import DeleteButton from '@/components/delete-button';
import MyImageGallery from '@/components/my-image-gallery';
import MyNoData from '@/components/my-no-data';
import { MyTooltipButton } from '@/components/my-tooltip-button';
import MyUpdateStatusButton from '@/components/my-update-status-button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import usePermission from '@/hooks/use-permission';
import useTranslation from '@/hooks/use-translation';
import { Link, router, usePage } from '@inertiajs/react';
import { ArrowUpDown, EditIcon, Paperclip, ScanEyeIcon } from 'lucide-react';
import { useState } from 'react';

const MyTableData = () => {
    const { t } = useTranslation();

    const hasPermission = usePermission();

    const { tableData } = usePage().props;
    console.log(tableData?.data);
    const queryParams = new URLSearchParams(window.location.search);
    const currentPath = window.location.pathname; // Get dynamic path

    const handleSort = (fieldName: string) => {
        if (fieldName === queryParams.get('sortBy')) {
            if (queryParams.get('sortDirection') === 'asc') {
                queryParams.set('sortDirection', 'desc');
            } else {
                queryParams.set('sortDirection', 'asc');
            }
        } else {
            queryParams.set('sortBy', fieldName);
            queryParams.set('sortDirection', 'asc');
        }
        router.get(currentPath + '?' + queryParams?.toString());
    };

    const [selectedImages, setSelectedImages] = useState([]);
    const [isOpenViewImages, setIsOpenViewImages] = useState(false);

    return (
        <>
            <ScrollArea className="w-full rounded-md border">
                <MyImageGallery
                    imagePath="/assets/images/posts/"
                    selectedImages={selectedImages}
                    isOpenViewImages={isOpenViewImages}
                    setIsOpenViewImages={setIsOpenViewImages}
                />
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">{t('No')}</TableHead>
                            <TableHead className="text-left">{t('Action')}</TableHead>
                            <TableHead>{t('Image')}</TableHead>
                            {/* <TableHead>{t('Attachment')}</TableHead> */}
                            {/* <TableHead>{t('Link')}</TableHead> */}
                            <TableHead onClick={() => handleSort('title')}>
                                <span className="flex cursor-pointer items-center">
                                    <ArrowUpDown size={16} /> {t('Title')}
                                </span>
                            </TableHead>
                            <TableHead onClick={() => handleSort('short_description')}>
                                <span className="flex cursor-pointer items-center">
                                    <ArrowUpDown size={16} /> {t('Short Description')}
                                </span>
                            </TableHead>
                            <TableHead onClick={() => handleSort('status')}>
                                <span className="flex cursor-pointer items-center">
                                    <ArrowUpDown size={16} /> {t('Status')}
                                </span>
                            </TableHead>
                            <TableHead onClick={() => handleSort('subject')}>
                                <span className="flex cursor-pointer items-center">
                                    <ArrowUpDown size={16} /> {t('Subject')}
                                </span>
                            </TableHead>
                            <TableHead onClick={() => handleSort('category_code')}>
                                <span className="flex cursor-pointer items-center">
                                    <ArrowUpDown size={16} /> {t('Category Code')}
                                </span>
                            </TableHead>
                            <TableHead onClick={() => handleSort('creator_id')}>
                                <span className="flex cursor-pointer items-center">
                                    <ArrowUpDown size={16} /> {t('Creator Name')}
                                </span>
                            </TableHead>
                            <TableHead onClick={() => handleSort('publisher_id')}>
                                <span className="flex cursor-pointer items-center">
                                    <ArrowUpDown size={16} /> {t('Publisher Name')}
                                </span>
                            </TableHead>
                            <TableHead onClick={() => handleSort('publishing_countries_code')}>
                                <span className="flex cursor-pointer items-center">
                                    <ArrowUpDown size={16} /> {t('Location Code')}
                                </span>
                            </TableHead>
                            <TableHead onClick={() => handleSort('type')}>
                                <span className="flex cursor-pointer items-center">
                                    <ArrowUpDown size={16} /> {t('Type')}
                                </span>
                            </TableHead>
                            {/* <TableHead onClick={() => handleSort('total_view_counts')}>
                                <span className="flex cursor-pointer items-center">
                                    <ArrowUpDown size={16} /> {t('Total View')}
                                </span>
                            </TableHead> */}
                            <TableHead onClick={() => handleSort('post_date')}>
                                <span className="flex cursor-pointer items-center">
                                    <ArrowUpDown size={16} /> {t('Post Date')}
                                </span>
                            </TableHead>
                            <TableHead onClick={() => handleSort('created_at')}>
                                <span className="flex cursor-pointer items-center">
                                    <ArrowUpDown size={16} /> {t('Created at')}
                                </span>
                            </TableHead>
                            <TableHead onClick={() => handleSort('created_by')}>
                                <span className="flex cursor-pointer items-center">
                                    <ArrowUpDown size={16} /> {t('Created by')}
                                </span>
                            </TableHead>
                            <TableHead onClick={() => handleSort('updated_at')}>
                                <span className="flex cursor-pointer items-center">
                                    <ArrowUpDown size={16} /> {t('Updated at')}
                                </span>
                            </TableHead>
                            <TableHead onClick={() => handleSort('updated_by')}>
                                <span className="flex cursor-pointer items-center">
                                    <ArrowUpDown size={16} /> {t('Updated by')}
                                </span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tableData?.data?.map((item: any, index: number) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">
                                    {tableData?.current_page > 1 ? tableData?.per_page * (tableData?.current_page - 1) + index + 1 : index + 1}
                                </TableCell>
                                <TableCell>
                                    <span className="flex h-full items-center justify-start">
                                        <Link href={`/admin/posts/${item.id}`}>
                                            <MyTooltipButton title={t('Show')} side="bottom" variant="ghost">
                                                <ScanEyeIcon />
                                            </MyTooltipButton>
                                        </Link>
                                        {hasPermission('post delete') && <DeleteButton deletePath="/admin/posts/" id={item.id} />}
                                        {hasPermission('post update') && (
                                            <Link href={`/admin/posts/${item.id}/edit`}>
                                                <MyTooltipButton title={t('Edit')} side="bottom" variant="ghost">
                                                    <EditIcon />
                                                </MyTooltipButton>
                                            </Link>
                                        )}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    {item.images[0] ? (
                                        <button
                                            onClick={() => {
                                                setSelectedImages(item.images);
                                                setIsOpenViewImages(true);
                                            }}
                                            className="cursor-pointer"
                                        >
                                            <img
                                                src={`/assets/images/posts/thumb/` + item.images[0]?.image}
                                                width={100}
                                                height={100}
                                                alt=""
                                                className="size-10 object-contain transition-all duration-300 hover:scale-150"
                                            />
                                        </button>
                                    ) : (
                                        <img
                                            src={`/assets/icons/image-icon.png`}
                                            width={100}
                                            height={100}
                                            alt=""
                                            className="size-10 object-contain"
                                        />
                                    )}
                                </TableCell>
                                {/* <TableCell>
                                    {item.upload_file && item.upload_file.length > 0 ? (
                                        <div className="flex flex-col items-start gap-2">
                                            {item.upload_file.map((file) => {
                                                // Get the part of the string after the first underscore
                                                const displayName = file.file_name.substring(file.file_name.indexOf('_') + 1);

                                                return (
                                                    <a
                                                        key={file.id}
                                                        href={`/assets/files/videos/${file.file_name}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-2 text-sm text-blue-600 underline"
                                                        title={displayName}
                                                    >
                                                        <Paperclip className="size-4 flex-shrink-0" />
                                                       
                                                        <span className="truncate max-w-md">{displayName}</span>
                                                    </a>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        '---'
                                    )}
                                </TableCell> */}
                                {/* <TableCell className="text-center">
                                    {item.link ? (
                                        <a href={`${item.link}`} target="_blank">
                                            <MyTooltipButton variant="ghost" title={item.link} className="p-0 hover:bg-transparent">
                                                {item.source_detail ? (
                                                    <span>
                                                        <img
                                                            src={`/assets/images/links/thumb/${item?.source_detail?.image}`}
                                                            className="aspect-square h-10 object-contain"
                                                            alt=""
                                                        />
                                                    </span>
                                                ) : (
                                                    <SquareArrowOutUpRightIcon className="hover:stroke-3" />
                                                )}
                                            </MyTooltipButton>
                                        </a>
                                    ) : (
                                        '---'
                                    )}
                                </TableCell> */}
                                <TableCell>{item.title || '---'}</TableCell>
                                <TableCell>{item.short_description || '---'}</TableCell>
                                <TableCell>
                                    {hasPermission('post update') ? (
                                        <MyUpdateStatusButton
                                            id={item.id}
                                            pathName="/admin/posts"
                                            currentStatus={item.status}
                                            statuses={['active', 'inactive']}
                                        />
                                    ) : (
                                        <span className="capitalize">{item.status}</span>
                                    )}
                                </TableCell>
                                <TableCell>{item.subject || '---'}</TableCell>
                                <TableCell>{item.category_code || '---'}</TableCell>
                                <TableCell>{item.creator?.name || '---'}</TableCell>
                                <TableCell>{item.publisher?.name || '---'}</TableCell>
                                <TableCell>{item.publishing_countries_code || '---'}</TableCell>
                                <TableCell>{item.type || '---'}</TableCell>
                                {/* <TableCell>
                                    {item.total_view_counts ? <span className="flex items-center gap-1">{item.total_view_counts}</span> : '---'}
                                </TableCell> */}
                                <TableCell className="whitespace-nowrap">
                                    {item.post_date
                                        ? new Date(item.post_date).toLocaleDateString('en-UK', {
                                              year: 'numeric',
                                              month: 'long',
                                              day: 'numeric',
                                          })
                                        : '---'}
                                </TableCell>
                                <TableCell className="whitespace-nowrap">
                                    {item.created_at
                                        ? new Date(item.created_at).toLocaleDateString('en-UK', {
                                              year: 'numeric',
                                              month: 'long',
                                              day: 'numeric',
                                          })
                                        : '---'}
                                </TableCell>
                                <TableCell>{item.created_by?.name || '---'}</TableCell>
                                <TableCell className="whitespace-nowrap">
                                    {item.updated_at
                                        ? new Date(item.updated_at).toLocaleDateString('en-UK', {
                                              year: 'numeric',
                                              month: 'long',
                                              day: 'numeric',
                                          })
                                        : '---'}
                                </TableCell>
                                <TableCell>{item.updated_by?.name || '---'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <ScrollBar orientation="horizontal" />
            </ScrollArea>

            {tableData?.data?.length < 1 && <MyNoData />}
        </>
    );
};

export default MyTableData;
