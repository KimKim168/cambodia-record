// components/NewsDetail.tsx
import React from 'react';
import CambodiaRecord from '../components/cambodia-record';
import MyMiltiImages from '../components/my-milti-images';
import CamboLayout from '../layout/CamboLayout';
import Search from '../components/search';

const Detail = () => {
  return (
    <CamboLayout>
      <div className="p-4 md:p-8 mx-auto">
     
        <div className="bg-white pb-8 max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left content */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-2">
              Solider station at the frontline on 27 July 2025
            </h2>
            <p className="text-gray-700 mb-4">
              Cambodia and Thai have been in war for decades. Now the conflict begins again due to Thai attempts to control the border.
            </p>
            <ul className="text-sm text-gray-800 space-y-1 mb-4">
              <li><span className="font-semibold">Creator:</span> </li>
              <li><span className="font-semibold">Types of media:</span> Photo</li>
              <li><span className="font-semibold">Subject:</span> </li>
              <li><span className="font-semibold">Publisher:</span> </li>
              <li><span className="font-semibold">Date of publishing:</span> </li>
              <li><span className="font-semibold">Publishing country:</span> </li>
              <li><span className="font-semibold">Description:</span> </li>
              <li><span className="font-semibold">File Upload:</span> </li>
              <li>
                <span className="font-semibold">Link:</span>{' '}
                <a
                  href="https://www.facebook.com/photo?fbid=1310029274462925&set=a.711264117672780"
                  className="text-blue-600 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Original Post
                </a>
              </li>
              <li><span className="font-semibold">Verify:</span> </li>
              <li><span className="font-semibold">Limited Access:</span> </li>
            </ul>
          </div>
          {/* Right content (image preview) */}
          <div>
            {/* <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="/assets/demo-images/conflict.png" // Replace this with the actual thumbnail if needed
                alt="Conflict thumbnail"
                className="w-full"
              />
            </div> */}
            <div>
              <MyMiltiImages/>
            </div>
          </div>

        </div>
        <hr/>
      </div>
       <div className='max-w-screen-xl mx-auto px-4 md:px-8 xl:px-0 mb-16'>
        <p className='mb-4'>Related</p>
        <CambodiaRecord/>
        </div>
    </CamboLayout>
  );
};

export default Detail;
