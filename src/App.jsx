import React from 'react'
import Hero from './components/custom/Hero'

const App = () => {
  return (
    <>
      <Hero/>
    </>
  )
}

export default App

/*

<h2 className=' text-orange-600 '>{plan?.bestTimeToVisit}</h2>
                <div className=' mt-[5px] grid grid-cols-1 xl:grid-cols-2  gap-[20px] ' >
                <div className=' shadow-xl cursor-pointer flex gap-[20px] border border-gray-300 rounded-2xl p-3  '>
                <img className=' w-[200px] rounded-2xl ' src='/place.jpg'/>
                    <div className=' gap-[5px]' >
                      <h1 className=' font-bold text-[18px] ' >{plan?.placeName}</h1>
                      <p className=' text-gray-400 text-[14px] ' >{plan?.details}</p>
                      <h1>⏱️ {plan?.travelTime}</h1>
                      <h1>💸 {plan?.ticketPrice}</h1>
                    </div>
                </div>
                </div>


                */