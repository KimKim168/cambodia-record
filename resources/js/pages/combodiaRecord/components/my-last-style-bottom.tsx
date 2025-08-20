import { usePage } from "@inertiajs/react";
import React from "react";

const MyLastStyleBottom = () => {
  const { location, topic, typePeople } = usePage().props;

  return (
    <div className="font-kantumruy mx-auto grid max-w-screen-xl px-4 xl:px-0">
      <section className="grid grid-cols-1 gap-8 md:grid-cols-3">
        
        {/* Location */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition hover:shadow-xl">
          <h3 className="mb-4 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 bg-clip-text text-xl font-extrabold text-transparent">
            Location
          </h3>
          <ul className="space-y-2 text-gray-700">
            {location?.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center rounded-lg px-2 py-1 transition hover:bg-gray-50 hover:text-gray-900"
              >
                <span className="mr-3 h-2.5 w-2.5 rounded-full bg-blue-200"></span>
                {item.location_name}
              </li>
            ))}
          </ul>
        </div>

        {/* Topics */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition hover:shadow-xl">
          <h3 className="mb-4 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 bg-clip-text text-xl font-extrabold text-transparent">
            Topics
          </h3>
          <ul className="space-y-2 text-gray-700">
            {topic?.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center rounded-lg px-2 py-1 transition hover:bg-gray-50 hover:text-gray-900"
              >
                <span className="mr-3 h-2.5 w-2.5 rounded-full bg-green-200"></span>
                {item.topic_name}
              </li>
            ))}
          </ul>
        </div>

        {/* People */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition hover:shadow-xl">
          <h3 className="mb-4 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 bg-clip-text text-xl font-extrabold text-transparent">
            People
          </h3>
          <ul className="space-y-2 text-gray-700">
            {typePeople?.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center rounded-lg px-2 py-1 transition hover:bg-gray-50 hover:text-gray-900"
              >
                <span className="mr-3 h-2.5 w-2.5 rounded-full bg-purple-200"></span>
                {item.label}
              </li>
            ))}
          </ul>
        </div>

      </section>
    </div>
  );
};

export default MyLastStyleBottom;
