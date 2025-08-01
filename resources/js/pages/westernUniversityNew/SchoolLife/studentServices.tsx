import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Slash } from 'lucide-react';
import MyContent from '../components/academic-components/my-content';
import MyNewLayout from '../layout/MyLayout';
import { usePage } from '@inertiajs/react';
import MyNoData from '@/components/my-no-data';

const StudentServices = () => {
//    const fakeContentData = [
//   {
//     id: 1,
//     title: 'Student Exchange Program',
//     long_description: `
//       <p>The <strong>Student Exchange Program</strong> opens doors to immersive academic and cultural experiences abroad.</p>
//       <p>Students spend one or two semesters at our partner institutions around the world, expanding their global perspective and building valuable international relationships. Participants often cite the experience as life-changing, contributing significantly to both their personal and professional growth.</p>
//       <p>Through the program, you will:</p>
//       <ul>
//         <li>Attend classes in a foreign country and earn credits toward your degree</li>
//         <li>Live with local families or in international student housing</li>
//         <li>Participate in cultural excursions, language classes, and social events</li>
//         <li>Learn to adapt to different educational systems and lifestyles</li>
//         <li>Gain independence, confidence, and intercultural communication skills</li>
//       </ul>
//       <p>Our staff will guide you through the entire process, from selecting a destination and applying for a visa, to securing accommodations and settling in abroad. Scholarships and financial aid may be available for eligible students.</p>
//     `,
//     images: [{ image: '/assets/demo-images/studentExchange.jpg' }],
//   },
//   {
//     id: 2,
//     title: 'Counseling Services',
//     long_description: `
//       <p>College life can be stressful, and our <strong>Counseling Services</strong> are here to support your mental health and emotional well-being.</p>
//       <p>Whether you're dealing with anxiety, depression, academic pressures, or personal challenges, our licensed professionals offer a safe, confidential space to talk and heal. We provide:</p>
//       <ul>
//         <li>Individual therapy sessions tailored to your needs</li>
//         <li>Group therapy on topics such as stress management and grief</li>
//         <li>Emergency crisis counseling and intervention</li>
//         <li>Workshops on mindfulness, resilience, and self-care</li>
//       </ul>
//       <p>All sessions are completely confidential, and we follow the highest standards of professional care. You can book appointments online or walk in during drop-in hours. Don’t hesitate to reach out – your mental health matters, and we're here to help you thrive both academically and personally.</p>
//     `,
//     images: [{ image: '/assets/demo-images/counseling.jpg' }],
//   },
//   {
//     id: 3,
//     title: 'Career Guidance',
//     long_description: `
//       <p>Our <strong>Career Guidance Services</strong> are designed to help you bridge the gap between university and your professional future.</p>
//       <p>From your first year to graduation, we offer personalized career support to prepare you for success in a competitive job market. Services include:</p>
//       <ul>
//         <li>Career assessments to help identify your strengths and interests</li>
//         <li>Resume and cover letter writing workshops</li>
//         <li>Mock interviews and networking events with employers</li>
//         <li>Access to internships, job boards, and alumni mentors</li>
//         <li>Graduate school preparation, including application reviews and essay support</li>
//       </ul>
//       <p>Whether you're still exploring your career path or ready to apply for your first job, our advisors will work with you one-on-one to develop a clear action plan. We are committed to helping every student build a career that is meaningful, rewarding, and aligned with their goals.</p>
//     `,
//     images: [{ image: '/assets/demo-images/career.jpg' }],
//   },
// ];

    const { studentServices } = usePage().props;
    
    return (
        <MyNewLayout>
            <div className="relative flex h-full w-full flex-col items-center justify-center bg-red-900 dark:bg-red-950 p-10 text-white md:p-20">
                <p className="font-noto-san-extra-light text-3xl md:text-6xl">
                    {studentServices?.title} 
                    </p>
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
                                    {studentServices?.title} 
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>
            {studentServices?.children?.length === 0 ? (
                <div className='my-12'><MyNoData/></div>
            ) :
            (
             <MyContent children={studentServices?.children} />
            )
            }
        </MyNewLayout>
    );
};

export default StudentServices;
