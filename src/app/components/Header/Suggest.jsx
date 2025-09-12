import { FaRegCalendarAlt } from 'react-icons/fa'

export default function SuggestBar() {
  const date = new Date()

  return (
    <div className="bg-black w-full min-h-[100px] text-orange-500 py-4">
      <div className="w-11/12 lg:w-4/5 mx-auto grid grid-cols-1 sm:grid-cols-3 items-center gap-4 text-center sm:text-left">
        
        {/* Left */}
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
            Book an Event Today!
          </h1>
        </div>

        {/* Center */}
        <div className="text-center">
          <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-widest uppercase">
            Limited Time Offer!
          </p>
        </div>

        {/* Right */}
        <div className="sm:text-right">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold py-2">
            Today
          </h1>
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
