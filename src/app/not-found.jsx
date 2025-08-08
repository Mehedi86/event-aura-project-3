import React from 'react';

export default function NotFoundPage404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 sm:p-8 md:p-12 mt-12">
      <div
        className="
          w-full max-w-4xl 
          aspect-[4/3] sm:aspect-[5/3] 
          bg-center bg-cover bg-no-repeat 
          bg-[url('/img/error/not-found.svg')]
        "
      ></div>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mt-8 text-gray-700">
        Oops! Page not found.
      </h1>
    </div>
  );
}
