import { Search } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { MySearchProducts } from './my-search-products';
import { Button } from './ui/button';

const MySearch = () => {
    return (
        <div>
            <Sheet>
                <div className="flex items-center gap-2">
                    <SheetTrigger asChild>
                        <Button size="icon" variant="outline" className="border-primary">
                            <Search className="size-6" />
                        </Button>
                    </SheetTrigger>
                </div>
                <SheetContent side="top" className="w-full bg-background/30 p-6 shadow-md backdrop-blur-xl">
                    <SheetHeader>
                        <SheetTitle className="text-white">Search</SheetTitle>
                    </SheetHeader>
                    <MySearchProducts className="mx-auto max-w-full border-white" />
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default MySearch;
