import React from "react";

const MyLastStyleBottom = () => {
  const dataTable = [
    {
      title: "Locations",
      color: "bg-blue-200",
      items: [
        "An Seh",
        "Chob Kokir",
        "Osmach",
        "Pnom Kmaoch",
        "Phnom Trap",
        "Prasat Preah Vihear",
        "Prasat Ta Krabey",
        "Prasat Ta Muon Thom",
        "Ta Thav",
        "Thma Daun",
        "Triangle Area",
        "Ral Indry",
      ],
    },
    {
      title: "Topics",
      color: "bg-green-200",
      items: [
        "Abroad Marching",
        "Capture Soldiers",
        "Ceasefire",
        "Destruction",
        "International Intervention",
        "Local Marching",
        "Poison gas",
        "Weapon",
      ],
    },
    {
      title: "People",
      color: "bg-purple-200",
      items: ["Citizens", "Influencers", "Leaders", "Refugees", "Soldiers", "Stars"],
    },
  ];

  return (
    <div className="font-kantumruy mx-auto grid max-w-screen-xl px-4 xl:px-0">
      <section className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {dataTable.map((section, index) => (
          <div
            key={index}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition hover:shadow-xl"
          >
            <h3
              className={`mb-4 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 bg-clip-text text-xl font-extrabold text-transparent`}
            >
              {section.title}
            </h3>
            <ul className="space-y-2 text-gray-700">
              {section.items.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center rounded-lg px-2 py-1 transition hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className={`mr-3 h-2.5 w-2.5 rounded-full ${section.color}`}></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
};

export default MyLastStyleBottom;
