import React from 'react'
import { Link } from 'react-router-dom'

function HotelRecom({trip}) {
  return (
    <div className='mt-[30px] flex flex-col  '>
        <h2 className=' font-bold text-[25px] '>Hotel Recommendation</h2>
        <div className='mt-[20px] grid sm:grid-cols-2 gap-[20px] md:grid-cols-2 xl:grid-cols-3 ' >
            {   
                trip?.tripData?.hotels.map((hotel,index) => (
                  <Link to={'https://www.google.com/maps/search/?api=1&query='+ hotel?.name + " " + hotel?.address}  target='_blank' >
                   <div className='hover:scale-105 transition-transform duration-300 cursor-pointer flex flex-col gap-[5px]  ' >
                        <img className=' w-[300px] shadow-2xl rounded-2xl ' src='/hotel3.jpg'/>
                        <h2 className='font-medium  ' >{hotel.name}</h2>
                        <p className=' text-gray-400 text-[13px]' >📍 {hotel.address}</p>
                        <p className=' text-[14px] ' >💰 {hotel.price}</p>
                        <p className=' text-[14px] '>⭐ {hotel.rating}</p>
                   </div>
                   </Link>
                )
            )}
        </div>
    </div>
  )
}

export default HotelRecom