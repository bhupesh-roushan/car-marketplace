// import React from 'react'
// // import { IoIosCheckboxOutline } from "react-icons/io";
// function Features({features}) {

//   return (
//     <div className='p-5 border shadow-md rounded-xl my-7'>
//         <h2 className='font-medium text-2xl'>Features</h2>
//         <div>
//             {Object.entries(features)?.map(([features,value])=>(
//                 <div>
//                     {[features]} - {value}
//                 </div>
//             ))}
//         </div>
//     </div>
//   )
// }

// export default Features






import React from 'react';
import { IoIosCheckboxOutline } from "react-icons/io";
function Features({ features }) {
  // Ensure features is not undefined or null and is an object
  if (!features || typeof features !== 'object') {
    return <div>No features available</div>;
  }

  return (
    <div className='p-10 border shadow-md rounded-xl my-7'>
      <h2 className='font-medium text-2xl'>Features</h2>
      <div className='grid grid-cols-2 mt-5 md:grid-cols-3 lg:grid-cols-4 gap-7 '>
        {Object.entries(features)?.map(([feature, value], index) => (
          <div key={index} className='flex gap-2 items-center'>
            <IoIosCheckboxOutline className='text-xl  rounded-lg' />
            <h2 className='	text-transform: capitalize'>{feature}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;


{/* <div className='p-5 bg-white rounded-xl border shadow-md'>
            <h2 className='font-medium text-2xl'>features</h2>
            {[features]?.map((item,index)=>(
                <div key={index}>
                    <IoIosCheckboxOutline className='text-lg h-5 w-5 bg-blue-100 text-primary'/>
                </div>
            ))}
        </div> */}
