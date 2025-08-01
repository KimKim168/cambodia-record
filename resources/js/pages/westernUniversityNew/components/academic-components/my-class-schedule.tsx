// import React from 'react';

// const schedules = {
//   'Grade 3': [
//     { hour: '1', Monday: 'Math', Tuesday: 'English', Wednesday: 'Science', Thursday: 'Art', Friday: 'PE' },
//     { hour: '2', Monday: 'Reading', Tuesday: 'Math', Wednesday: 'English', Thursday: 'Music', Friday: 'Science' },
//     { hour: '3', Monday: 'Art', Tuesday: 'Science', Wednesday: 'Math', Thursday: 'Reading', Friday: 'English' },
//   ],
//   'Grade 4': [
//     { hour: '1', Monday: 'Science', Tuesday: 'Math', Wednesday: 'History', Thursday: 'English', Friday: 'PE' },
//     { hour: '2', Monday: 'Geography', Tuesday: 'English', Wednesday: 'Math', Thursday: 'Science', Friday: 'Art' },
//     { hour: '3', Monday: 'Reading', Tuesday: 'Music', Wednesday: 'Science', Thursday: 'Math', Friday: 'English' },
//   ],
//   'Grade 5': [
//     { hour: '1', Monday: 'Math', Tuesday: 'Geography', Wednesday: 'English', Thursday: 'Biology', Friday: 'PE' },
//     { hour: '2', Monday: 'History', Tuesday: 'Math', Wednesday: 'Science', Thursday: 'Music', Friday: 'Art' },
//     { hour: '3', Monday: 'Reading', Tuesday: 'English', Wednesday: 'Math', Thursday: 'Geography', Friday: 'Science' },
//   ],
//   'Grade 6': [
//     { hour: '1', Monday: 'Biology', Tuesday: 'Math', Wednesday: 'History', Thursday: 'Science', Friday: 'PE' },
//     { hour: '2', Monday: 'English', Tuesday: 'Chemistry', Wednesday: 'Math', Thursday: 'Art', Friday: 'Computer' },
//     { hour: '3', Monday: 'Geography', Tuesday: 'English', Wednesday: 'Science', Thursday: 'Math', Friday: 'Music' },
//   ]
// };
const MyClassSchedules = ({schedulesAndSubjects}:{schedulesAndSubjects:any}) => {
  return (
    <div 
    className="
        prose
        max-w-screen-2xl
        mx-auto
        px-6
        lg:px-16
        dark:border-white
        prose-p:dark:text-white
        prose-a:dark:text-primary
        prose-li:dark:text-primary
        prose-strong:dark:text-primary
        prose-em:dark:text-primary
        prose-blockquote:dark:text-primary

        prose-h1:dark:text-primary
        prose-h2:dark:text-primary
        prose-h3:dark:text-primary
        prose-h4:dark:text-primary
        prose-h5:dark:text-primary
        prose-h6:dark:text-primary
        prose-headings:dark:text-primary

        prose-th:dark:text-primary
        prose-td:dark:text-primary
        prose-td:dark:border-primary
        prose-tr:dark:border-primary
        prose-tr:dark:border
        prose-td:dark:border
        prose-table:dark:border-primary
        prose-img:dark:border-primary
        prose-hr:dark:border-primary
        prose-td:border-primary
      "dangerouslySetInnerHTML={{__html: schedulesAndSubjects?.long_description}}>
    </div>
  );
};

export default MyClassSchedules;
