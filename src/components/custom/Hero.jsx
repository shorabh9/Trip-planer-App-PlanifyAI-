import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"

function Hero() {
  return (
    <>
        <div className='flex xl:gap-[30px] gap-[30px] items-center  flex-col mx-5   xl:mx-56 mt-9   ' >
            <div>
                <h1 className='font-serif text-[25px] xl:text-[50px] font-extrabold '>
                    <span className='text-[#f56551] '>Discover Your Adventure with AI:</span> Personalise Itineraries at Your Fingertips  
                </h1>
            </div>
            <div className=''>
                <p className='text-gray-400  xl:text-[20px]'>Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.</p>
            </div>
            <div className=' flex justify-center' >
                <Link to={'/create-trip'} >
                    <button  className=' font-serif bg-black mt-[10px] text-white cursor-pointer border p-2 xl:text-[18px] hover:bg-white  hover:text-black  text-[15px]  rounded-[5px] '>Get Started, It's Free</button>
                </Link>
            </div>
            <div className='' >
                <img src='/laptop.png'/>
            </div>
        </div>
        
    </>
  )
}

export default Hero