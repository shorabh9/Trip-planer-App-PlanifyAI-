import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { Navigate,useNavigation ,Link} from 'react-router-dom';
import { db } from '../../services/firebaseConfig';
import { useState } from 'react';


function MyTrip() {

    const navigate = useNavigation();
    const [trips,setTrips] = useState([]);
    useEffect(() =>{
        GetUserTrips();
    },[])

    const GetUserTrips = async() => {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log(user);
        if(!user)
        {
            navigate('/');
            return ;
        }

        const q = query(collection(db,'AITrips'), where('userEmail', '==',user?.email))
        const querySnapshot = await getDocs(q);
        const tripsArray = [];
        querySnapshot.forEach((doc) => {
            tripsArray.push({id: doc.id, ...doc.data()})
            console.log(doc.id," hello ",doc.data());
           
        })
        setTrips(tripsArray);
        
    }
  return (
    <>
        <div className=' py-[40px] px-10  xl:px-55 ' >
            <h1 className=' text-[30px] font-bold ' >My Trips</h1>
            <div className=' grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 ' >
                {
                   trips.length > 0 ? (
                    trips.map((trip) =>(
                        <Link to={`/view-trip/${trip.id}`} >
                        <div className='hover:scale-105 transition-transform duration-300  rounded-2xl p-3    cursor-pointer  flex flex-col  mt-[30px] ' >
                           <img className='  rounded-2xl  w-[300px] ' src='/trip.jpg'/>
                            <h1 className=' font-bold ' >{trip?.userSelection?.location}</h1>
                            <div className=' flex gap-[5px] ' >
                                <p className=' text-gray-400 '>{trip?.userSelection?.noOfDays} Days trip </p>
                                <p className=' text-gray-400 ' > with {trip?.userSelection?.budget} Budget </p>  
                            </div>
                           </div></Link>
                    ))
                   ) : <div className='  text-[40px] font-serif    mt-[50px] flex flex-col items-center justify-center  ' >No trips found</div>
                }
                
            </div>
        </div>
    </>
  )
}

export default MyTrip