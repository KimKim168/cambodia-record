import { usePage } from '@inertiajs/react';

const MyCouncilAction = () => {
  const { studentCouncilInAction } = usePage().props;

  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto w-full max-w-screen-xl px-6 py-12 lg:px-0">
        <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tighter border-l-4 border-red-700 pl-2">
          {studentCouncilInAction?.title}
        </h2>
        {studentCouncilInAction?.children?.map((item, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={item.id}
              className="mt-8 grid gap-6 sm:grid-cols-1 md:grid-cols-5 lg:grid-cols-3 items-stretch"
            >
              {isEven ? (
                <>
                  <div className="bg-muted col-span-1 rounded-xl px-6 pt-6 pb-6 md:col-span-2 md:pt-8 lg:col-span-1 flex flex-col justify-start">
                    {/* Mobile image inside text block */}
                    <div className="bg-background mb-6 aspect-video w-full rounded-xl border md:hidden">
                      <img
                        src={`/assets/images/pages/${item?.images[0]?.image}`}
                        className="rounded-xl object-cover w-full h-full"
                        alt=""
                      />
                    </div>

                    <span className="text-2xl font-semibold tracking-tight">
                      {item?.title}
                    </span>

                    <ul className="mt-6 space-y-4 flex-grow">
                      <li>
                        <div className="flex items-start gap-3">
                          <p className="-mt-0.5" dangerouslySetInnerHTML={{__html: item?.long_description}}>
                           
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <img
                    src={`/assets/images/pages/${item?.images[0]?.image}`}
                    className="border-border/80 bg-muted col-span-1 hidden rounded-xl border md:col-span-3 md:block lg:col-span-2 h-full w-full object-cover"
                    alt=""
                  />
                </>
              ) : (
                <>
                  <img
                    src={`/assets/images/pages/${item?.images[0]?.image}`}
                    className="border-border/80 bg-muted col-span-1 hidden rounded-xl border md:col-span-3 md:block lg:col-span-2 h-full w-full object-cover order-1"
                    alt=""
                  />

                  <div className="bg-muted col-span-1 rounded-xl px-6 pt-6 pb-6 md:col-span-2 md:pt-8 lg:col-span-1 flex flex-col justify-start order-2">
                    {/* Mobile image inside text block */}
                    <div className="bg-background mb-6 aspect-video w-full rounded-xl border md:hidden">
                      <img
                        src={`/assets/images/pages/${item?.images[0]?.image}`}
                        className="rounded-xl object-cover w-full h-full"
                        alt=""
                      />
                    </div>

                    <span className="text-2xl font-semibold tracking-tight">
                      {item?.title}
                    </span>

                    <ul className="mt-6 space-y-4 flex-grow">
                      <li>
                        <div className="flex items-start gap-3">
                          <p className="-mt-0.5" dangerouslySetInnerHTML={{__html: item?.long_description}}>
                           
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyCouncilAction;
