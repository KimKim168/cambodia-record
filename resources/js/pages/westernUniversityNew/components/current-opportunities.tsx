import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PaperclipIcon } from 'lucide-react';
import HowToApply from './how-to-apply';
import { usePage } from '@inertiajs/react';
import JobForm from './my-job-form';
import MyNoData from '@/components/my-no-data';

// const data = [
//     {
//         id: 1,
//         title: 'HR Recruitment Manager and Trainer',
//         short_description: 'Lead recruitment efforts and deliver training programs to develop team capabilities.',
//     },
//     {
//         id: 2,
//         title: 'GEP Manager',
//         short_description: 'Oversee education programs and coordinate resource distribution for effective learning.',
//     },
//     {
//         id: 3,
//         title: 'Customer Service Supervisor',
//         short_description: 'Supervise support teams to ensure excellent service and strong stakeholder engagement.',
//     },
//     {
//         id: 4,
//         title: 'Teacher Assistants',
//         short_description: 'Support classroom activities and assist lead teachers in delivering quality education.',
//     },
//     {
//         id: 5,
//         title: 'Nurse',
//         short_description: 'Provide healthcare services and promote wellness among students and staff.',
//     },
// ];


const CurrentOpportunities = () => {
    const { jobOpportunities } = usePage().props;
    const data  = jobOpportunities;
    // console.log(data);
     if (!data || data.length === 0) {
    return (
      <div className="my-12">
        <MyNoData />
      </div>
    );
  }

    return (
        <div className="mx-auto mt-12 mb-20 flex max-w-screen-2xl flex-col items-start gap-12 px-6 lg:flex-row xl:px-16">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Job Opportunities</h2>

                <div className="mt-4 space-y-4">
                    {data?.map((item) => (
                        <Dialog>
                            <DialogTrigger asChild>
                                <Card
                                    key={item.id}
                                    className="bg-primary/10 flex cursor-pointer flex-row justify-between gap-0 overflow-hidden rounded-xl border border-none border-gray-200 px-4 shadow-none transition-all duration-300 hover:scale-105 sm:flex-row"
                                >
                                    {/* <CardHeader>
                                <div className="bg-primary/20 aspect-square w-20 shrink-0 rounded-lg lg:w-20" />
                            </CardHeader> */}

                                    <CardContent className="flex flex-col justify-center p-0">
                                        <h3 className="text-foreground line-clamp-2 text-lg leading-snug font-semibold tracking-tight lg:text-xl">
                                            {item.name}
                                        </h3>
                                        <p className="text-foreground mt-2 line-clamp-3 text-xs lg:text-sm">{item.short_description}</p>
                                    </CardContent>
                                    <Button size="sm">Apply Now</Button>
                                </Card>
                            </DialogTrigger>
                            <DialogContent
                                showCloseButton={true}
                                className="bg-background text-foreground min-w-[95%] gap-0 rounded-none p-0 sm:min-w-[95%]"
                            >
                                <DialogHeader>
                                    <DialogTitle className="hidden"></DialogTitle>
                                    <DialogDescription className="hidden"></DialogDescription>
                                </DialogHeader>
                                <div>
                                    <div>
                                        <h1 className="p-4 pb-0 text-xl font-bold">
                                            <span className="text-primary">{item?.name}</span>
                                        </h1>
                                    </div>
                                    <div className="text-foreground flex flex-col gap-4 p-2 lg:flex-row lg:p-4">
                                        <div className="w-full lg:flex-1">
                                            <div className="p-2 text-sm">
                                                {/* loong_description = qualification */}
                                                <div  dangerouslySetInnerHTML={{__html:item?.qualification}}/>
                                            </div>
                                        </div>
                                        <div className="w-full space-y-4 lg:w-md">
                                            <JobForm item={item}/>
                                        </div>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    ))}
                </div>
            </div>
            <aside className="w-full shrink-0 lg:max-w-lg">
                <h3 className="mt-10 text-3xl font-bold tracking-tight">How to Apply</h3>
                <HowToApply/>
            </aside>
        </div>
    );
};

export default CurrentOpportunities;
