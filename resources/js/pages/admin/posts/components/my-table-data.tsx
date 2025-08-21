import DeleteButton from '@/components/delete-button';
import MyImageGallery from '@/components/my-image-gallery';
import MyNoData from '@/components/my-no-data';
import { MyTooltipButton } from '@/components/my-tooltip-button';
import MyUpdateFileStatusButton from '@/components/my-update-file-status-button';
import MyUpdateStatusButton from '@/components/my-update-status-button';
import MyUpdateVerifyButton from '@/components/my-update-verify-button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import usePermission from '@/hooks/use-permission';
import useTranslation from '@/hooks/use-translation';
import { Link, router, usePage } from '@inertiajs/react';
import { ArrowUpDown, EditIcon, LucideVerified, ScanEyeIcon } from 'lucide-react';
import { useState } from 'react';

const MyTableData = () => {
    const { t } = useTranslation();

    const hasPermission = usePermission();

    const { tableData } = usePage().props;
    // console.log(tableData?.data);
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
                            <TableHead onClick={() => handleSort('file_status')}>
                                <span className="flex cursor-pointer items-center">
                                    <ArrowUpDown size={16} /> {t('File Status')}
                                </span>
                            </TableHead>
                            <TableHead onClick={() => handleSort('verify_status')}>
                                <span className="flex cursor-pointer items-center">
                                    <ArrowUpDown size={16} /> {t('Verify Status')}
                                </span>
                            </TableHead>
                            <TableHead onClick={() => handleSort('category_code')}>
                                <span className="flex cursor-pointer items-center">
                                    <ArrowUpDown size={16} /> {t('Source')}
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
                                    <ArrowUpDown size={16} /> {t('Publishing Countrys')}
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
                            <TableHead onClick={() => handleSort('publishing_date')}>
                                <span className="flex cursor-pointer items-center">
                                    <ArrowUpDown size={16} /> {t('Publishing Date')}
                                </span>
                            </TableHead>
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
                                <TableCell>
                                    {hasPermission('post update') ? (
                                        <MyUpdateFileStatusButton
                                            id={item.id}
                                            pathName="/admin/posts/upload_file"
                                            currentStatus={item.file_status}
                                            statuses={['public', 'private']}
                                        />
                                    ) : (
                                        <span className="capitalize">{item.file_status}</span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {hasPermission('post update') ? (
                                        <MyUpdateVerifyButton
                                            id={item.id}
                                            pathName="/admin/posts"
                                            currentStatus={item.verify_status}
                                            statuses={['verify', 'unverify']}
                                        />
                                    ) : (
                                        <span className="capitalize">{item.verify_status}</span>
                                    )}
                                </TableCell>
                                <TableCell>{item.category_code || '---'}</TableCell>
                                <TableCell>{item.creator?.name || '---'}</TableCell>
                                <TableCell>{item.publisher?.name || '---'}</TableCell>
                                <TableCell>{item.publishing_countries_code || '---'}</TableCell>
                                <TableCell>{item.type || '---'}</TableCell>
                                {/* <TableCell>
                                    {item.total_view_counts ? <span className="flex items-center gap-1">{item.total_view_counts}</span> : '---'}
                                </TableCell> */}
                                <TableCell className="whitespace-nowrap">
                                    {item.publishing_date
                                        ? new Date(item.publishing_date).toLocaleDateString('en-UK', {
                                              year: 'numeric',
                                              month: 'long',
                                              day: 'numeric',
                                          })
                                        : '---'}
                                </TableCell>
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
