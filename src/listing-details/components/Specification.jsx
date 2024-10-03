import IconFeild from '@/add-listing/components/IconFeild';
import React from 'react';
import CarSpecification from '@/Shared/CarSpecification';

function Specification({ carDetail }) {
  // Add a fallback for when carDetail is not passed or is undefined
  if (!carDetail || typeof carDetail !== 'object') {
    return <div>No car details available</div>;
  }

  return (
    <div className='p-10 rounded-xl border shadow-md mt-7'>
      <h2 className='font-medium text-2xl'>Specifications</h2>
      {carDetail? CarSpecification.map((item, index) => (
        <div className='mt-5 flex items-center justify-between' key={index}>
          <h2 className='flex gap-2'>
            <IconFeild icon={item?.icon} />
            {item?.label}
          </h2>
          {/* Ensure that the carDetail[item?.name] exists and is valid */}
          <h2>{carDetail[item?.name] || "N/A"}</h2> 
        </div>
      )):
      <div className='w-full h-[500px] rounded-xl bg-slate-200 animate-pulse mt-7'>

      </div>
    }
    </div>
  );
}

export default Specification;
