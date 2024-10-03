import React from 'react'

function ImageGallery({carDetail}) {
  return (
    <div>
      <img src={carDetail?.images[0].imageUrl} className='w-full object-cover h-[500px] rounded-xl' />
    </div>
  )
}

export default ImageGallery
