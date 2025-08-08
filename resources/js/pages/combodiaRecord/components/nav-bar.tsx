const NavBar = () => {
    return (
        <ul className="fixed top-6/12 left-4 z-50 flex w-64 flex-col gap-1 overflow-hidden border-l border-gray-200 pl-1">
            {/* Home */}
            <li className="group w-14 overflow-hidden rounded-lg border-l border-transparent bg-white transition-all duration-500 hover:w-64 hover:border-gray-200 hover:shadow-lg has-[:focus]:w-64 has-[:focus]:shadow-lg">
                <a
                    href={`/`}
                    className="peer flex w-full cursor-pointer items-center gap-2.5 px-3 py-2 text-left text-purple-800 transition-all active:scale-95"
                >
                    <div className="rounded-lg border-2 border-purple-300 bg-purple-100 p-1">
                        {/* Home icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 3l9 6.75M4.5 10.5V21h15V10.5M9 21V15h6v6" />
                        </svg>
                    </div>
                    <div className="font-semibold">Home</div>
                </a>
            </li>

            {/* Post */}
            <li className="group w-14 overflow-hidden rounded-lg border-l border-transparent bg-white transition-all duration-500 hover:w-64 hover:border-gray-200 hover:shadow-lg has-[:focus]:w-64 has-[:focus]:shadow-lg">
                <a
                    href={`/posts`}
                    className="peer flex w-full cursor-pointer items-center gap-2.5 px-3 py-2 text-left text-blue-800 transition-all active:scale-95"
                >
                    <div className="rounded-lg border-2 border-blue-300 bg-blue-100 p-1">
                        {/* Pencil/Post icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 3.487a2.25 2.25 0 013.182 3.182l-10.5 10.5L6 18l.83-3.544 10.032-10.032z"
                            />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 7.125L17.625 5.25" />
                        </svg>
                    </div>
                    <div className="font-semibold">Posts</div>
                </a>
            </li>
            {/* Back */}
            <li className="group w-14 overflow-hidden rounded-lg border-l border-transparent bg-white transition-all duration-500 hover:w-64 hover:border-gray-200 hover:shadow-lg has-[:focus]:w-64 has-[:focus]:shadow-lg">
                <button
                    onClick={() => {
                        if (window.location.pathname === '/') {
                        } else if (window.history.length > 1) {
                            window.history.back();
                        } else {
                            window.location.href = '/';
                        }
                    }}
                    className="peer flex w-full cursor-pointer items-center gap-2.5 px-3 py-2 text-left text-green-800 transition-all active:scale-95"
                >
                    <div className="rounded-lg border-2 border-green-300 bg-green-100 p-1">
                        {/* Arrow back icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </div>
                    <div className="font-semibold">Back</div>
                </button>
            </li>
            <li className="group w-14 overflow-hidden rounded-lg border-l border-transparent bg-white transition-all duration-500 hover:w-64 hover:border-gray-200 hover:shadow-lg has-[:focus]:w-64 has-[:focus]:shadow-lg">
                <a
                    href={`/login`}
                    className="peer flex w-full cursor-pointer items-center gap-2.5 px-3 py-2 text-left text-blue-800 transition-all active:scale-95"
                >
                    <div className="rounded-lg border-2 border-blue-300 bg-blue-100 p-1">
                        {/* Login door arrow icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h12m0 0l-4-4m4 4l-4 4" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7" />
                        </svg>
                    </div>
                    <div className="font-semibold">Login</div>
                </a>
            </li>
        </ul>
    );
};

export default NavBar;
