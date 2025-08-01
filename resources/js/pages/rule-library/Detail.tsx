import Layout from "./Layout";


const Detail = () => {
  return (
    <Layout>
        <div className="flex flex-col gap-10 lg:flex-row max-w-screen-2xl mx-auto px-6 xl:px-20 py-10">
        {/* Main Content */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-4">Static Page Title</h1>
          <img
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80"
            alt="Page Image"
            className="w-full h-auto aspect-[16/9] object-cover rounded-lg shadow-md mb-6"
          />
          <div
            className="product-description prose max-w-none overflow-hidden"
            dangerouslySetInnerHTML={{
              __html: `<p>This is a static page description. You can replace this HTML content with any static markup you'd like to show here.</p>`,
            }}
          ></div>
        </div>

        {/* Sidebar Banners */}
        <div className="w-full lg:w-80 flex flex-col gap-6 overflow-hidden">
          <img
            src="/assets/demo-images/rule-images/banner2.webp"
            alt="Static Banner 1"
            className="w-full h-auto object-cover rounded-md shadow"
          />
          <img
            src="/assets/demo-images/rule-images/banner1.webp"
            alt="Static Banner 2"
            className="w-full h-auto object-cover rounded-md shadow"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Detail;
