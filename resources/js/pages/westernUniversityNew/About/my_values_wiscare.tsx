import { usePage } from "@inertiajs/react";

// const faq = [
//   {
//     image: "/images/return.png",
//     question: "What is your return policy?",
//     answer:
//       "You can return unused items in their original packaging within 30 days for a refund or exchange. Contact support for assistance.",
//   },
//   {
//     image: "/images/track.png",
//     question: "How do I track my order?",
//     answer:
//       "Track your order using the link provided in your confirmation email, or log into your account to view tracking details.",
//   },
//   {
//     image: "/images/shipping.png",
//     question: "Do you ship internationally?",
//     answer:
//       "Yes, we ship worldwide. Shipping fees and delivery times vary by location, and customs duties may apply for some countries.",
//   },
//   {
//     image: "/images/payment.png",
//     question: "What payment methods do you accept?",
//     answer:
//       "We accept Visa, MasterCard, American Express, PayPal, Apple Pay, and Google Pay, ensuring secure payment options for all customers.",
//   },
//   {
//     image: "/images/damaged.png",
//     question: "What if I receive a damaged item?",
//     answer:
//       "Please contact our support team within 48 hours of delivery with photos of the damaged item. We’ll arrange a replacement or refund.",
//   },
//   {
//     image: "/images/support.png",
//     question: "How can I contact customer support?",
//     answer:
//       "Reach out via email at support@example.com or call us at 1-800-123-4567 for assistance with any inquiries.",
//   },
// ];

const MyValuesWiscare = () => {
    const { valuesWiscare, locale } = usePage().props;
    // console.log(valuesWiscare);
  return (
    <div className="flex items-center justify-center px-6 pb-12">
      <div className="max-w-screen-xl mx-auto  xl:px-0">
        <h2 className="text-4xl md:text-4xl !leading-[1.15] font-bold tracking-tighter text-center">
          {locale === 'kh' ? (valuesWiscare?.title_kh ?? valuesWiscare?.title) : valuesWiscare?.title}
        </h2>
        {/* <p className="mt-3 text-lg text-center text-muted-foreground">
          Quick answers to common questions about our products and services.
        </p> */}
        <div className="mt-12 grid md:grid-cols-2 xl:grid-cols-3 rounded-xl overflow-hidden">
          {valuesWiscare?.children?.map((item) => (
            <div key={item.id} className="border dark:border-primary border-dashed p-6 -mt-px -ml-px">
              <div className="h-16 w-16 flex items-center justify-center rounded-full bg-accent dark:bg-primary overflow-hidden">
                <img src={`/assets/images/pages/${item?.images[0]?.image}`} alt={`image`} className="h-10 w-10 object-contain" />
              </div>
              <div className="mt-3 flex items-start gap-2 text-[1.35rem] font-semibold tracking-tight">
                <span>{locale === 'kh' ? (item?.title_kh ?? item?.title) : item?.title}</span>
              </div>
              <p className="prose prose-p:dark:text-white whitespace-pre-line" dangerouslySetInnerHTML={{__html: locale === 'kh' ? (item?.short_description_kh ?? item?.short_description) : item?.short_description}}></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyValuesWiscare;

