interface StudentCouncil {
  title: string;
  long_description: string;
  images: { image: string }[];
}

const MyHeroStudentCouncil = ({ studentCouncil }: { studentCouncil: any }) => {
  if(!studentCouncil || studentCouncil?.lengt == 0){
    return <div className="my-10"></div>
  }
  return (
    <div className="flex flex-col max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-0 my-12 lg:my-16">
      
      {/* Hero Image */}
      <div className="w-full">
        <img
          src={
            studentCouncil?.images?.[0]?.image
              ? `/assets/images/pages/${studentCouncil.images[0].image}`
              : "/fallback.jpg"
          }
          className="w-full object-cover aspect-[21/9]"
          alt={studentCouncil?.title || "Student Council Main Officer"}
        />
      </div>

      {/* Description Card */}
      <div className="relative z-10  lg:px-8 mt-10 lg:-mt-28">
        <div className="bg-background shadow-lg dark:shadow-foreground/10 rounded-xl 
                        max-w-screen-xl mx-auto p-4 sm:p-6 lg:p-12 
                        flex flex-col lg:flex-row items-start lg:items-center gap-6">
          <div className="flex-1 w-full break-words ">
            <h3 className="text-2xl text-primary sm:text-3xl font-bold tracking-tight mb-4">
              {studentCouncil?.title}
            </h3>
            <div
              className="prose max-w-none dark:prose-invert ck-content leading-relaxed text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: studentCouncil?.long_description }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyHeroStudentCouncil;
