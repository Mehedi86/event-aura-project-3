import { FaRegCalendarAlt } from 'react-icons/fa'

export default function SuggestBar() {
  const date = new Date()

  return (
    <div className="bg-black w-full min-h-[100px] text-orange-500 flex items-center relative overflow-hidden py-2">
      {/* Decorative tagline */}
      <div className="absolute inset-0 flex justify-center items-center px-4 text-center">
        <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-widest uppercase">
          Limited Time Offer!
        </p>
      </div>

      {/* Main content */}
      <div className="w-11/12 lg:w-4/5 mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 z-10">
        {/* Left */}
        <div className="text-center mb-4 sm:text-left">
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">
            Book an Event Today!
          </h1>
        </div>

        {/* Right */}
        <div className="text-center sm:text-right">
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold py-2 text-center">Today</h1>
          <p className="flex justify-center sm:justify-end items-center gap-2">
            <FaRegCalendarAlt size={18} className="sm:size-5" />
            <span className="text-white text-sm sm:text-base">
              {date.toLocaleDateString()}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
