import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../services/firebaseConfig';
import { Toaster, toast } from 'sonner';
import { doc, getDoc } from 'firebase/firestore';
import InfoSection from './compoments/InfoSection';
import HotelRecom from './compoments/HotelRecom';
import Plans from './compoments/Plans';
import Footer from './compoments/Footer';

function Viewtrip() {

    const {tripId} = useParams();
    const [trip, setTrip] = useState([]);
    useEffect(() => {
        tripId && GetTripData();
    },[tripId])

    //used to get Trip Information from Firebase
    const GetTripData = async() => {
        const docRef = doc(db,'AITrips',tripId);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()) {
            console.log("Document: ",docSnap.data());
            setTrip(docSnap.data());
        }
        else {
            console.log("No Such document")
            toast.error("No trip found!");
        }
    }
  return (
    <div className=' p-10 md:px-20 lg:px-44 xl:px-56   ' >
        {/* Information Section */}
        <InfoSection trip={trip} />

        {/* Recommended Hotels */}
        <HotelRecom trip={trip} />

        {/* Daily Plan */}
        <Plans trip={trip} />

        {/* Footer */}
        <Footer/>
   
    </div>
  )
}

export default Viewtrip