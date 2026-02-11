import React from "react";

export default function PageBanner({
  title,
  subtitle,
  children,
}) {
  return (
    <div className="relative w-full py-24 overflow-hidden bg-gray-950 text-white">
      
      {/* Background gradient glow */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-30"></div>
      </div>

      {/* Content */}
      <div className="relative lg:w-4/5 mx-auto px-4">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-10 text-center shadow-xl">
          
          {subtitle && (
            <p className="uppercase tracking-widest text-sm text-gray-300 mb-3">
              {subtitle}
            </p>
          )}

          <h1 className="text-3xl md:text-5xl font-bold">
            {title}
          </h1>

          {children && (
            <div className="mt-5 text-gray-200">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
