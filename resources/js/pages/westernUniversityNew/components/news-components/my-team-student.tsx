import { usePage } from "@inertiajs/react";

// const teamMembers = [
//   {
//     name: "John Doe",
//     title: "Grade 6 ",
//     imageUrl:
//       "/assets/demo-images/StudentCouncil/09 Hor Heng Serey Socheata.png",
//   },
//   {
//     name: "Jane Doe",
//     title: "Grade 7 ",
//     imageUrl:
//       "/assets/demo-images/StudentCouncil/09 Hor Heng Serey Socheata.png",
//   },
//   {
//     name: "Bob Smith",
//     title: "Grade 6 ",
//     imageUrl:
//       "/assets/demo-images/StudentCouncil/09 Hor Heng Serey Socheata.png",
//   },
//   {
//     name: "Peter Johnson",
//     title: "Grade 7",
//     imageUrl:
//       "/assets/demo-images/StudentCouncil/09 Hor Heng Serey Socheata.png",
//   },
//   {
//     name: "David Lee",
//     title: "Grade 6 ",
//     imageUrl:
//       "/assets/demo-images/StudentCouncil/09 Hor Heng Serey Socheata.png",
//   },
//   {
//     name: "Sarah Williams",
//     title: "Grade 7",
//     imageUrl:
//       "/assets/demo-images/StudentCouncil/09 Hor Heng Serey Socheata.png",
//   },
//   {
//     name: "Michael Brown",
//     title: "Grade 6 ",
//     imageUrl:
//       "/assets/demo-images/StudentCouncil/09 Hor Heng Serey Socheata.png",
//   },
//   {
//     name: "Elizabeth Johnson",
//     title: "Grade 7",
//     imageUrl:
//       "/assets/demo-images/StudentCouncil/09 Hor Heng Serey Socheata.png",
//   },
// ];

const MyTeamStudent = () => {
  const { gradeLevelLeaders } = usePage().props;
  // console.log(gradeLevelLeaders);
  return (
    <div className="flex flex-col justify-center px-6 lg:px-0 lg:px- max-w-screen-xl mx-auto">
      <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tighter border-l-4  border-red-700 pl-2">
        {gradeLevelLeaders?.title}
      </h2>
      <div className="mt-4 text-base sm:text-lg prose dark:prose-invert ck-content whitespace-pre-line" dangerouslySetInnerHTML={ {__html: gradeLevelLeaders?.short_description}}/>
      <div className="mt-10 sm:mt-10 w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {gradeLevelLeaders?.children?.map((member) => (
          <div key={member.id}>
            <img
              src={`/assets/images/pages/${member?.images[0]?.image}`}
              alt={member.title}
              className="h-30 w-30 rounded-full object-cover bg-secondary"
              width={120}
              height={120}
            />
            <h3 className="mt-4 text-lg xl:text-xl font-semibold prose dark:prose-invert ck-content" >{member.title}</h3>
            <p className="text-muted-foreground text-md prose dark:prose-invert ck-content" dangerouslySetInnerHTML={{__html:member?.short_description}}></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTeamStudent;
