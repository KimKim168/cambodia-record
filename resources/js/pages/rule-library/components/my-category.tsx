const MyCategory = () => {
  const items = [
    { name: "Theses", image: "/assets/demo-images/rule-images/image2.webp" },
    { name: "E-Publications", image: "/assets/demo-images/rule-images/image3.webp" },
    { name: "Audios", image: "/assets/demo-images/rule-images/image2.webp" },
    { name: "Journals", image: "/assets/demo-images/rule-images/image3.webp" },
    { name: "Videos", image: "/assets/demo-images/rule-images/image2.webp" },
    // Add more items here if needed to test scrolling
  ];

  const useScrollLayout = items.length > 5;

  return (
    <div className="max-w-screen-2xl mt-10 mx-auto px-2 sm:px-10 lg:px-20">
      <div className="flex">
        <h2
          className="text-xl md:text-2xl text-center lg:text-2xl text-black my-5 tracking-wide 
          after:content-[''] after:block after:w-24 md:after:w-32 after:h-1 after:bg-red-500 
          after:mx-auto after:mt-2 after:transition-all after:duration-300 
          hover:after:w-28 md:hover:after:w-36"
        >
          Our Databases
        </h2>
      </div>

      <div
        className={`bg-slate-400 rounded-lg p-2 ${
          useScrollLayout
            ? "flex overflow-x-auto gap-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300"
            : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        }`}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={`px-2 py-4 rounded-md hover:bg-white hover:text-black text-white 
              ${
                useScrollLayout
                  ? "flex-shrink-0 min-w-[120px] sm:min-w-[140px] md:min-w-[160px]"
                  : ""
              }
            `}
          >
            <div className="flex flex-col items-center justify-center">
              <img
                src={item.image}
                className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] mb-2 object-cover"
                alt={item.name}
              />
              <p className="text-center text-[12px] md:text-sm">{item.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCategory;
