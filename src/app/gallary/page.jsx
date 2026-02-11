'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiSolidLike } from "react-icons/bi";
import Loading from "../loading";
import PageBanner from "../components/shared/PageBanner";

const Page = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();

  // ✅ Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 6; // You can change this

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleLikeBtn = (e) => {
    e.stopPropagation();
    if (status === 'authenticated') {
      console.log('you can react here')
      return;
    }
    router.push('/login')
  }

  const images = [
    "/img/recent/recent1.jpg",
    "/img/recent/recent2.jpeg",
    "/img/recent/recent3.jfif",
    "/img/recent/recent4.png",
    "/img/recent/dhaka.jpg",
    "/img/recent/event6.jpg",
    "/img/recent/event7.jfif",
    "/img/recent/event8.png",
    "/img/recent/event9.jfif",
    "/img/recent/event10.jpg",
    "/img/recent/event11.webp",
    "/img/recent/event12.jpg",
    "/img/categories/wedding.jpg",
  ];

  // ✅ Pagination Logic
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);
  const totalPages = Math.ceil(images.length / imagesPerPage);

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="lg:w-4/5 mx-auto px-4 pt-32 lg:pt-48 pb-20">
      <div className="mb-12">
        <PageBanner
          subtitle="Event Highlights"
          title="Our Gallery"
        />
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {currentImages.map((src, idx) => (
          <div
            key={idx}
            className="relative overflow-hidden rounded shadow-lg group cursor-pointer"
            onClick={() => setSelectedImage(src)}
          >
            <div className="absolute bottom-2 left-10 text-neutral-200 flex items-center gap-2 z-1">
              <BiSolidLike
                onClick={(e) => handleLikeBtn(e)}
                size={24}
                className="hover:scale-150 cursor-pointer transition transform duration-300"
              />
              <h1 className="font-bold text-xl">10</h1>
            </div>
            <img
              src={src}
              alt={`Gallery ${idx + 1}`}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">View</span>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Pagination Buttons (Design untouched above) */}
      <div className="flex justify-center mt-10 gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 rounded border cursor-pointer ${currentPage === index + 1
              ? "bg-black text-white"
              : "bg-white text-black"
              }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Selected"
            className="w-full lg:h-full rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default Page;
