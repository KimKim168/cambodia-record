// import { usePage } from '@inertiajs/react';
import React from 'react';

const MySchoolCurriculum = ({long_description}:{long_description:any}) => {
  return (
    <div>
      <div dangerouslySetInnerHTML={{__html: long_description}} className='mx-auto max-w-screen-xl py-16 px-4  prose prose-p:dark:text-primary prose-headings:dark:text-primary text-primary whitespace-pre-line'></div>
    </div>
  );
};

export default MySchoolCurriculum;
