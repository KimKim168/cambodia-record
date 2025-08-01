'use client';
import { useState } from 'react';

const MyMiltiImages = () => {
  const locale = 'en'; // or 'kh'

  const mission = {
    title: 'Our Mission',
    title_kh: 'បេសកកម្មរបស់យើង',
    short_description: 'We aim to bring positive change through education and outreach.',
    short_description_kh: 'យើងមានបេសកកម្មក្នុងការបង្កើតការផ្លាស់ប្តូរដោយអវិជ្ជា និងសកម្មភាពជាសាធារណៈ។',
    images: [
      { image: 'conflict.png' },
      { image: 'conflict2.avif' },
      { image: 'conflict1.jpeg' },
    ],
  };

  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const handleClose = () => setCurrentIndex(null);
  const showPrev = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? mission.images.length - 1 : (prev ?? 0) - 1
    );
  const showNext = () =>
    setCurrentIndex((prev) =>
      prev === mission.images.length - 1 ? 0 : (prev ?? 0) + 1
    );

  return (
    <>
      <div className="max-w-screen-xl mx-auto px-6 xl:px-0 space-y-2">
        {/* Main Image (first one) */}
        {mission.images.length > 0 && (
          <div
            className="w-full aspect-video overflow-hidden rounded-xl shadow-lg hover:scale-[1.01] transition cursor-pointer"
            onClick={() => setCurrentIndex(0)}
          >
            <img
              src={`/assets/demo-images/${mission.images[0].image}`}
              alt="Main image"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Thumbnail Grid (excluding first image) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {mission.images.slice(1).map((img, index) => (
            <div
              key={index + 1}
              className="w-full aspect-video overflow-hidden rounded-lg shadow-md hover:scale-105 transition cursor-pointer"
              onClick={() => setCurrentIndex(index + 1)}
            >
              <img
                className="w-full h-full object-cover"
                src={`/assets/demo-images/${img.image}`}
                alt={`Image ${index + 1}`}
              />
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {currentIndex !== null && (
          <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50">
            <div
              className="absolute inset-0 backdrop-blur-sm"
              onClick={handleClose}
            />

            <button
              onClick={handleClose}
              className="absolute top-5 right-6 text-white text-4xl z-50 hover:text-red-400 transition"
            >
              ✕
            </button>

            <button
              onClick={showPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-5xl z-50 hover:text-blue-400 transition"
            >
              ❮
            </button>

            <div className="relative z-40 max-w-4xl w-full px-4">
              <img
                src={`/assets/demo-images/${mission.images[currentIndex].image}`}
                alt={`Popup ${currentIndex}`}
                className="w-full h-auto rounded-xl shadow-xl border-4 border-white"
              />
            </div>

            <button
              onClick={showNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-5xl z-50 hover:text-blue-400 transition"
            >
              ❯
            </button>

            <div className="mt-6 flex gap-4 overflow-x-auto px-6 pb-4 z-50">
              {mission.images.map((thumb, index) => (
                <img
                  key={index}
                  src={`/assets/demo-images/${thumb.image}`}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-20 w-32 object-cover rounded-md cursor-pointer border-2 ${
                    index === currentIndex
                      ? 'border-blue-400'
                      : 'border-transparent hover:border-white'
                  } transition`}
                  alt={`Thumb ${index}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyMiltiImages;
