import { Link, usePage } from '@inertiajs/react';
import MyNewLayout from '../layout/MyLayout';

export default function show() {
    const { showData } = usePage().props;

    return (
        <MyNewLayout>
            <section className="mx-auto max-w-screen-2xl px-4 py-10 sm:px-6 lg:px-20">
                {/* Breadcrumb */}
                {/* <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator>
              <ChevronsRight className="h-4 w-4" />
            </BreadcrumbSeparator>

            <BreadcrumbItem>
              <BreadcrumbLink href={`/${showData?.category?.name?.toLowerCase()}`}>
                {showData?.category?.name}
              </BreadcrumbLink>
            </BreadcrumbItem>

            {showData?.name && (
              <>
                <BreadcrumbSeparator>
                  <ChevronsRight className="h-4 w-4" />
                </BreadcrumbSeparator>

                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink href="#" aria-current="page">
                    {showData.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb> */}

                {/* Main Layout */}
                <div className="flex flex-col gap-12 lg:flex-row">
                    {/* Content Area */}
                    <article className="w-full ">
                        <h1 className="mb-6 text-3xl tracking-tight font-bold text-red-700 font-noto-san-extra-light sm:text-4xl dark:text-white">{showData?.title}</h1>

                        {showData?.images?.[0]?.image && (
                            <img
                                src={`/assets/images/pages/${showData.images[0].image}`}
                                alt={showData.name}
                                className="mb-8 h-auto w-full rounded-xl object-cover"
                                loading="lazy"
                                decoding="async"
                            />
                        )}
                        
                            <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: showData?.long_description }} />
                    </article>

                </div>
            </section>
        </MyNewLayout>
    );
}
