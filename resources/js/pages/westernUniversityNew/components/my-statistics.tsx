import useTranslation from '@/hooks/use-translation';
import { usePage } from '@inertiajs/react';

const MyStatistics = () => {
  const { Statistics, locale } = usePage().props;
  return (
    <div className="pt-12 bg-white dark:bg-black transition-colors duration-300">
      {Statistics?.map((item) => (
        <div key={item.id} className="mx-auto max-w-screen-xl px-6 pb-16 text-center sm:px-16">
          <h2 className="text-3xl font-bold text-primary sm:text-4xl">{locale === 'kh' ? (item?.title_kh ?? item?.title) : item?.title}</h2>
          <div className="mx-auto my-4 h-1 w-16 bg-primary dark:bg-white"></div>
          {/* <p className="mx-auto max-w-2xl text-sm text-gray-600 dark:text-gray-300 sm:text-base">
            {item?.short_description}
          </p> */}

          <div className="mx-auto mt-12 grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-4">
            {item?.children?.map((values) => (
              <a
                href={values.type ? values.link : values.content}
                key={values.id}
                className="flex flex-col items-center"
              >
                <div className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-gray-300  dark:border-gray-600">
                  <img
                    src={`/assets/images/pages/${values?.images[0].image}`}
                    alt="Icon"
                    className="w-20 transition-all duration-500 hover:scale-110"
                  />
                </div>
                <p className="mt-4 text-3xl font-bold text-red-800 dark:text-red-400">
                  {locale === 'kh' ? (values.title_kh ?? values.title) : values.title}
                </p>
                <div className="mx-auto my-4 h-0.5 w-10 bg-gray-200 dark:bg-gray-600"></div>
                <p
                  className="text-xl font-semibold text-gray-800 dark:text-gray-200 sm:text-base"
                  dangerouslySetInnerHTML={{ __html: locale === 'kh' ? (values?.short_description_kh ?? values?.short_description) : values?.short_description }}
                />
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyStatistics;
