import React from 'react'
import MyNewLayout from '../layout/MyLayout'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Slash } from 'lucide-react';
import MyClassSchedule from '../components/academic-components/my-class-schedule';
import { usePage } from '@inertiajs/react';
const ClassScheduleAndSubject = () => {
    const { schedulesAndSubjects } = usePage().props;
  return (
    <MyNewLayout>
    <div className="relative flex h-full w-full flex-col items-center justify-center bg-red-900 dark:bg-red-950 p-10 text-white md:p-20">
           <p className="font-noto-san-extra-light text-3xl md:text-6xl">{schedulesAndSubjects?.title}</p>
           <div>
               <Breadcrumb>
                   <BreadcrumbList>
                       <BreadcrumbItem>
                           <BreadcrumbLink href="/" className="text-white">
                               Home
                           </BreadcrumbLink>
                       </BreadcrumbItem>
                       <BreadcrumbSeparator>
                           <Slash className="text-gray-400" />
                       </BreadcrumbSeparator>
                       <BreadcrumbItem>
                           <BreadcrumbLink href="#" className="text-gray-400">
                          {schedulesAndSubjects?.title}
                           </BreadcrumbLink>
                       </BreadcrumbItem>
                   </BreadcrumbList>
               </Breadcrumb>
           </div>
   </div>
   <MyClassSchedule  schedulesAndSubjects = {schedulesAndSubjects}/>
</MyNewLayout>
  )
}

export default ClassScheduleAndSubject
