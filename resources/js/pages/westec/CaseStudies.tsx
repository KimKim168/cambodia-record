import MySlide from '@/components/my-slide';
import { usePage } from '@inertiajs/react';
import { CaseStudySection } from './components/case-study-section';
import { ContactSection } from './components/contact-section';
import WestecLayout from './layout/layout';

const Solutions = () => {
    const { banking_detail, embassy_detail, microfinance_detail, manufacturing_detail, construction_detail, entertainment_detail } = usePage().props;
    return (
        <WestecLayout>
            <MySlide />

            {banking_detail?.title && <CaseStudySection item={banking_detail} defaultDropDown={true} />}
            {embassy_detail?.title && <CaseStudySection item={embassy_detail} defaultDropDown={false} />}

            <ContactSection />

            {microfinance_detail?.title && <CaseStudySection item={microfinance_detail} defaultDropDown={false} />}
            {manufacturing_detail?.title && <CaseStudySection item={manufacturing_detail} defaultDropDown={false} />}

            <ContactSection />

            {construction_detail?.title && <CaseStudySection item={construction_detail} defaultDropDown={false} />}
            {entertainment_detail?.title && <CaseStudySection item={entertainment_detail} defaultDropDown={false} />}
        </WestecLayout>
    );
};

export default Solutions;
