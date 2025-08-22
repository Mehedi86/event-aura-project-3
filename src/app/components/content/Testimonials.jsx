'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Manager",
    company: "BrightVision Ltd.",
    review: "This platform made my work so much easier. The interface is simple, and the support team is very responsive!",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=32"
  },
  {
    id: 2,
    name: "David Kim",
    role: "Software Engineer",
    company: "TechNova Inc.",
    review: "I was impressed with the speed and performance. Everything works smoothly without any issues.",
    rating: 4,
    avatar: "https://i.pravatar.cc/150?img=12"
  },
  {
    id: 3,
    name: "Emily Carter",
    role: "Freelancer",
    company: "Self-Employed",
    review: "Absolutely loved the experience. It saved me hours of effort and gave me great results.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=47"
  },
  {
    id: 4,
    name: "James Rodriguez",
    role: "Product Designer",
    company: "PixelWorks",
    review: "The design and usability are top-notch. A few minor improvements would make it perfect.",
    rating: 4,
    avatar: "https://i.pravatar.cc/150?img=8"
  },
  {
    id: 5,
    name: "Sophia Lee",
    role: "Entrepreneur",
    company: "StartUp Hub",
    review: "This has been a game changer for my business. I can’t imagine running things without it now.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=28"
  },
  {
    id: 6,
    name: "Michael Brown",
    role: "Teacher",
    company: "Greenwood High School",
    review: "Very useful and intuitive. I recommend it to colleagues who want something efficient and reliable.",
    rating: 4,
    avatar: "https://i.pravatar.cc/150?img=64"
  }
];

export default function Testimonials() {
  return (
    <div className="w-11/12 lg:w-4/5 mx-auto py-12 ">
      {/* Section Heading */}
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="w-1 h-5 bg-orange-500 inline-block"></span>
            WHAT THEY SAYS
          </h2>

      {/* Wrapper div for padding */}
      <div className="px-4 md:px-0">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          centeredSlides={true} // center slides
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          speed={4000} // slow sliding animation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id} className="px-2">
              <div className="bg-gray-100 rounded-2xl p-6 h-[340px] flex flex-col items-center text-center shadow-md">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-gray-200"
                />
                <p className="text-gray-600 italic mb-4">“{t.review}”</p>
                <h3 className="font-semibold text-lg">{t.name}</h3>
                <span className="text-sm text-gray-500">{t.role} @ {t.company}</span>
                <div className="mt-3 flex">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      className={`text-yellow-400 text-lg ${i < t.rating ? 'opacity-100' : 'opacity-30'}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
