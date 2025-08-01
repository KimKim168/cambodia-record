import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AlignLeftIcon } from "lucide-react";
import { Logo } from "./logo";
import { foods, academic, schoolLife, admissions } from "./config";
import { Link, usePage } from "@inertiajs/react";

export const NavigationSheet = () => {
  const { application_info } = usePage().props;
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <AlignLeftIcon className="text-primary stroke-3" />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto h-screen p-4 pb-30 bg-white">
        <Logo application_info={application_info}/>
        <div className="text-base space-y-4">
          <Link prefetch href="/" className="font-bold text-black font-noto-san-extra-light">Home</Link>
          <div>
            <div className="font-bold text-black font-noto-san-extra-light">About</div>
            <ul className="mt-2 space-y-3 ml-1 pl-4 border-l">
              {foods.map((foodItem) => (
                <li key={foodItem.title}>
                  <Link href={foodItem.href} className="flex items-center gap-2 hover:underline hover:text-red-800 text-black">
                    {foodItem.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-bold text-black font-noto-san-extra-light">Academics</div>
            <ul className="mt-2 space-y-3 ml-1 pl-4 border-l">
              {academic.map((item) => (
                <li key={item.title}>
                  <Link href={item.href} className="flex items-center gap-2 hover:underline hover:text-red-800 text-black">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-bold text-black font-noto-san-extra-light">Admissions</div>
            <ul className="mt-2 space-y-3 ml-1 pl-4 border-l">
              {admissions.map((item) => (
                <li key={item.title}>
                  <Link href={item.href} className="flex items-center gap-2 hover:underline hover:text-red-800 text-black">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-bold text-black font-noto-san-extra-light">School Life</div>
            <ul className="mt-2 space-y-3 ml-1 pl-4 border-l">
              {schoolLife.map((item) => (
                <li key={item.title}>
                  <Link href={item.href} className="flex items-center gap-2 hover:underline hover:text-red-800 text-black">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
            <Link prefetch href="/contact" className="font-bold text-black font-noto-san-extra-light">Contact</Link>
        </div>
      </SheetContent>
      
    </Sheet>
  );
};
