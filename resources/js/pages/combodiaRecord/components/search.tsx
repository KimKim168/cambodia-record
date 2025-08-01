import AdvancedSearch from "./advanced-search";

const Search = () => {
    return (
        <div className="px-4">
            <div className="">
                <div className="relative mx-auto w-full max-w-xl ">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full rounded-full border border-gray-300 px-5 py-3 pl-10 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <div className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>
            <div className="max-w-xl mx-auto">
                <AdvancedSearch/>
            </div>
            </div>
            <div className="mx-auto my-8 max-w-screen-xl border-t-1 border-gray-300"></div>
        </div>
    );
};

export default Search;
