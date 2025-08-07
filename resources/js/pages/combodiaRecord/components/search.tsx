import { useState } from 'react';
import { router } from '@inertiajs/react';
import AdvancedSearch from "./advanced-search";

const Search = () => {
    // 1. State to store the user's search input
    const [searchTerm, setSearchTerm] = useState('');

    // 2. Function to handle the search submission
    const handleSearch = (e) => {
        e.preventDefault(); // Prevents the page from doing a full reload

        // 3. Use Inertia's router to make a GET request to your 'post' method's URL.
        // This sends the search term as a query parameter (e.g., /posts?search=your_term)
        // Make sure to replace '/cambodia-record/posts' with the actual URL for your post list page.
        router.get('/posts', { search: searchTerm }, {
            preserveState: true, // Keeps the search term in the input box after searching
            replace: true,
        });
    };

    return (
        <div className="px-4">
            {/* 4. Use a <form> element and link it to the handleSearch function */}
            <form onSubmit={handleSearch} className="">
                <div className="relative mx-auto w-full max-w-xl ">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full rounded-full border border-gray-300 px-5 py-3 pl-10 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        // 5. Connect the input to the state
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    {/* You can add a submit button inside the form if you want */}
                    {/* <button type="submit" className="absolute top-1/2 right-3 -translate-y-1/2">Search</button> */}
                </div>
                <div className="max-w-xl mx-auto">
                    <AdvancedSearch/>
                </div>
            </form>
            <div className="mx-auto my-8 max-w-screen-xl border-t-1 border-gray-300"></div>
        </div>
    );
};

export default Search;
