import { usePage } from "@inertiajs/react";

// const teamMembers = [
//   {
//     name: "John Doe",
//     title: "Grade 6 ",
//     imageUrl:
//       "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=600",
//   },
//   {
//     name: "Jane Doe",
//     title: "Grade 7 ",
//     imageUrl:
//       "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
//   },
//   {
//     name: "Bob Smith",
//     title: "Grade 6 ",
//     imageUrl:
//       "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600",
//   },
//   {
//     name: "Peter Johnson",
//     title: "Grade 7",
//     imageUrl:
//       "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600",
//   },
//   {
//     name: "David Lee",
//     title: "Grade 6 ",
//     imageUrl:
//       "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600",
//   },
//   {
//     name: "Sarah Williams",
//     title: "Grade 7",
//     imageUrl:
//       "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600",
//   },
//   {
//     name: "Michael Brown",
//     title: "Grade 6 ",
//     imageUrl:
//       "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600",
//   },
//   {
//     name: "Elizabeth Johnson",
//     title: "Grade 7",
//     imageUrl:
//       "https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg?auto=compress&cs=tinysrgb&w=600",
//   },
// ];

const MyCampuseTeam = () => {
    const { campusRepresentative } = usePage().props;

  return (
    <div className="flex flex-col justify-center mt-10 px-6 lg:px-0  max-w-screen-xl mx-auto">
      <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tighter border-l-4 border-red-700 pl-2">
        {campusRepresentative?.title}
      </h2>
      <div className="mt-4 text-base sm:text-lg prose dark:prose-invert ck-content whitespace-pre-line" dangerouslySetInnerHTML={ {__html: campusRepresentative?.short_description}}/>
      <div className="mt-10 sm:mt-10 w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {campusRepresentative?.children?.map((member) => (
          <div key={member.id}>
            <img
              src={`/assets/images/pages/${member?.images[0]?.image}`}
              alt={member.title}
              className="h-30 w-30 rounded-full object-cover bg-secondary"
              width={120}
              height={120}
            />
            <h3 className="mt-4 text-lg xl:text-xl prose dark:prose-invert ck-content font-semibold" >{member.title}</h3>
            <p className="text-muted-foreground text-md prose dark:prose-invert ck-content" dangerouslySetInnerHTML={{__html:member?.short_description}}></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCampuseTeam;
