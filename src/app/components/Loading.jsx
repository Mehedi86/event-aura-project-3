'use client';

import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';

export default function Loading() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/animations/loading.json')
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  if (!animationData) return null;

  return (
    <div className="flex justify-center items-center h-screen px-4 bg-black">
      <div className="w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px]">
        <Lottie animationData={animationData} loop={true} />
      </div>
    </div>
  );
}


