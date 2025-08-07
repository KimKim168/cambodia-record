import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import AdvancedSearchButton from './advanced-search-button';
import { usePage } from '@inertiajs/react';

export default function AdvancedSearch() {
   
    const [open, setOpen] = useState(false);

    return (
        <div className="mt-4 ">
            <div className="flex gap-4">
                <AdvancedSearchButton />
            </div>
        </div>
    );
}
