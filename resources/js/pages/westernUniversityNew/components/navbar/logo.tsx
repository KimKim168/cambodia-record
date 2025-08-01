import { Link } from '@inertiajs/react';

export const Logo = ({application_info}:{application_info:any}) => (
    <Link href='/' className="flex items-center  gap-2">
        <img src={`/assets/images/application_info/${application_info?.image}`} alt="Logo" className="h-15 w-auto object-cover xl:h-25" />
    </Link>
);
