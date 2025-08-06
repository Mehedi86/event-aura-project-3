import { FaRegCalendarAlt } from 'react-icons/fa'

export default function SuggestBar() {
  const date = new Date()

  return (
    <div className='bg-black w-full h-[100px] text-orange-500 flex items-center relative overflow-hidden'>
      {/* Decorative tagline in the background center */}
      <div className='absolute inset-0 flex justify-center items-center'>
        <p className='text-4xl font-bold text-white tracking-widest uppercase'>
          Limited Time Offer!
        </p>
      </div>

      {/* Main content above the overlay */}
      <div className='w-11/12 lg:w-4/5 mx-auto flex justify-between items-center z-10'>
        {/* left */}
        <div>
          <h1 className='text-2xl font-semibold'>Book an Event Today!</h1>
        </div>

        {/* right */}
        <div className='text-right'>
          <h1 className='text-2xl font-semibold text-center'>Today</h1>
          <p className='flex items-center gap-2'>
            <FaRegCalendarAlt size={20} />
            <span className='text-white'>{date.toLocaleDateString()}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
