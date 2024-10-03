import React from 'react'
import Search from './Search'

function Hero() {
  return (
    <div>
      <div className='flex flex-col items-center p-10 py-20 gap-6 h-[650px] w-full bg-gray-100'>
      {/* bg-[#eef0fc] this color was used  */}
        <h2 className='text-lg'>Find cars for sales and for rent near you</h2>
        <h2 className='text-[60px] font-bold'>Discover Drive Dominate</h2>
        <Search/>
        <img src="/tesla3.png" className='mt-24 min-w-max ' />
      </div>
    </div>
  )
}

export default Hero
