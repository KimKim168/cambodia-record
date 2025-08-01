import { useState } from 'react';

const MyContent = ({ children }: { children: any[] }) => {
    const [activeTitle, setActiveTitle] = useState(children[0]?.title); // default to first

    const activeItem = children.find((item) => item.title === activeTitle);

    return (
        <div className="px-6 py-16  lg:px-20">
            <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-10 lg:grid-cols-12">
                {/* Sidebar */}
                <div className="lg:col-span-4">
                    <div className="flex flex-col space-y-3 rounded-lg border p-4 lg:items-end lg:border-y-0 lg:border-r lg:border-l-0">
                        {children.map((item) => {
                            const isActive = item.title === activeTitle;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTitle(item.title)}
                                    className={`w-full rounded-md px-4 py-2 text-center text-lg transition-colors duration-300 lg:w-auto ${
                                        isActive ? 'bg-red-700 text-white' : 'text-primary hover:bg-red-700 hover:text-white'
                                    }`}
                                >
                                    {item.title}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Main Content */}
                <div className="space-y-10 lg:col-span-8">
                    {activeItem && (
                        <>
                            <div className="w-full">
                                <h1 className="text-primary w-full text-3xl leading-tight font-bold md:text-4xl">{activeItem.title}</h1>
                                <div className="border-primary mt-4 w-16 border-b-2" />
                                <div
                                    className="prose dark:prose-invert mt-6 w-full max-w-none"
                                    dangerouslySetInnerHTML={{ __html: activeItem.long_description }}
                                />
                            </div>
                            <div>
                                <img
                                    src={`/assets/images/pages/${activeItem.images[0]?.image}`}
                                    alt={activeItem.title}
                                    className="h-auto w-full rounded-md object-cover"
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyContent;
