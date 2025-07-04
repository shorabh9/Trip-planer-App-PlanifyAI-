import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Plans({ trip }) {

  
  return (
    <div className=' mt-[30px] '>
      <h2 className='font-bold text-[25px]'>Places to Visit</h2>
      <div className=' ' >
        {trip?.tripData?.itinerary?.map((plan, index) => (
          <div key={index} className='' >
            <h2 className=' mt-[30px] font-bold text-[25px] '>Day {plan.dayNumber}</h2>
            <div className=' grid sm:grid-cols-1 xl:grid-cols-2 gap-[20px] ' >
                {
                  plan?.places.map((visit, visitIndex) => (
                    <Link to={'https://www.google.com/maps/search/?api=1&query=' + visit?.placeName + " , " + trip?.userSelection?.location} target='_blank'>
                      <div key={visitIndex} className='hover:scale-105 transition-transform duration-300  ' >
                        <h2 className='text-orange-600 mt-[15px]  '>{visit?.bestTimeToVisit}</h2>
                          <div className='inline-flex flex-col sm:flex-row gap-[20px] mt-[5px] border border-gray-300 rounded-2xl p-3 shadow-xl cursor-pointer w-auto'>
                            <img className='w-[200px] flex justify-center rounded-2xl' src='/place.jpg' alt='place'/>
                            <div className='gap-[5px]'>
                              <h1 className='font-bold text-[18px]'>{visit?.placeName}</h1>
                              <p className='text-gray-400 text-[14px]'>{visit?.details}</p>
                              <h1>⏱️ {visit?.travelTime}</h1>
                              <h1>💸 {visit?.ticketPrice}</h1>
                            </div>
                          </div>
                        
                      </div>
                    </Link>
                  ))
                }
             </div>    
          </div>
        ))}
      </div>
    </div>
  );
}

export default Plans;
