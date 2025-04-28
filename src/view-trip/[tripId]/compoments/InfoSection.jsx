import React from 'react'

function InfoSection({trip}) {
  
  return (
    <div>
       <img src='/hotel.jpg' className='h-[340px]  w-full object-cover rounded-xl'  />

       <div>
            <h2 className=' font-bold mt-[10px] text-[25px] '>{trip?.userSelection?.location}</h2>
            <div className=' mt-[10px] flex xl:flex-row flex-col gap-[30px]  ' >
                <h2 className=' bg-gray-300  w-auto px-3  py-1 rounded-xl' >📅 {trip?.userSelection?.noOfDays} Days </h2>
                <h2 className=' bg-gray-300  w-auto px-3  py-1 rounded-xl' >💰 {trip?.userSelection?.budget} Budget</h2>
                <h2 className=' bg-gray-300  w-auto px-3  py-1 rounded-xl'>🥂 No. of Traveler: {trip?.userSelection?.traveler}</h2>
            </div>
       </div>
    </div>
  )
}

export default InfoSection