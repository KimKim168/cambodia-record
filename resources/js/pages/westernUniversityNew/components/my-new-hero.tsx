import { usePage } from "@inertiajs/react";

const MyNewHero = () => {
  const { WelcomeToWestern, locale } = usePage().props;
   if(!WelcomeToWestern || WelcomeToWestern?.lengt == 0){
    return <div className="my-10"></div>
  }
  return (
    <div className="flex items-center justify-center">
      <div className="max-w-screen-xl w-full mx-auto grid lg:grid-cols-2 gap-12 px-4 py-12 items-stretch">
        <div>

          <h1 className="max-w-[17ch] text-primary text-3xl md:text-5xl lg:text-[2.75rem] xl:text-4xl font-bold !leading-[1.2]">
            {locale === 'kh' ? (WelcomeToWestern?.title_kh ?? WelcomeToWestern?.title) : WelcomeToWestern?.title}
          </h1>
          <div className="my-8 border-[1.5px] border-primary w-15" />
          {/* {WelcomeToWestern?.short_description && <div
            className="mt-6 max-w-[60ch] text-base text-primary whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: WelcomeToWestern?.short_description }}
          />} */}
          {WelcomeToWestern?.long_description && <div
            className={`mt-6 max-w-[60ch] text-base text-primary whitespace-pre-line prose dark:prose-invert`}
            dangerouslySetInnerHTML={{ __html: locale === 'kh' ? (WelcomeToWestern?.long_description_kh ?? WelcomeToWestern?.long_description) : WelcomeToWestern?.long_description }}
          />}
          
        </div>

        <div className="w-full h-full rounded-xl overflow-hidden">
          <img
            src={`/assets/images/pages/${WelcomeToWestern?.images[0].image}`}
            className="h-full w-full object-cover rounded-xl"
            alt="Welcome"
          />
        </div>
      </div>
    </div>
  );
};

export default MyNewHero;
