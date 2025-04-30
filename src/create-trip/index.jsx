import React, { useEffect, useState } from 'react'
import { AI_PROMPT, SelectBudgetOptions,SelectTravelList } from '../components/constants/Options'
import { useGoogleLogin } from '@react-oauth/google';
import { Button } from "@/components/ui/button"
import OSMAutocomplete from '../services/PlaceAPI';
import { FcGoogle } from "react-icons/fc";
import { useNavigate,useNavigation } from 'react-router-dom';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { sendPromptToGemini } from '../services/AIModal';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
function CreateTrip() {

  const [place, setPlace] = useState();
  const [formData, setFromData] = useState({});
  const [openDailog, setOpenDailog] = useState(false);
  const [loading, setLooading] = useState(false)
  const navigate = useNavigate();
  const handlePlaceSelect = (place) => {
    console.log('Selected Place:', place);
    setPlace(place);
    handelInputChange('location', place.display_name);
  };


  const handelInputChange = (name,value) => {
    setFromData({
      ...formData,
      [name]:value
    })
  }

  useEffect(() =>{
    console.log(formData);
  },[formData])


  const OnGenerateTrip = async() => {

    const user = localStorage.getItem('user');

    if(!user)
    {
      setOpenDailog(true);
      return ;
    }

    if(formData?.noOfDays > 5 ||  !formData?.budget || !formData?.traveler  )
    { 
      console.log("hello bhai")
      alert('Please fill all the details')
      return;
    }

    const FINAL_PROMPT = AI_PROMPT
    .replace('{location}',formData?.location)
    .replace('{totalDays}', formData?.noOfDays)
    .replace('{traveler}' , formData?.traveler)
    .replace('{budget}', formData?.budget)
    
    console.log(FINAL_PROMPT);
    setLooading(true);
    const aiResponse = await sendPromptToGemini(FINAL_PROMPT);
    //const parsedResponse = JSON.parse(aiResponse);
   // console.log(parsedResponse);
    console.log(aiResponse);
    SaveAiTrip(aiResponse)
    
    // const result = await chatSession.sendMessage(FINAL_PROMPT);
    // console.log(result?.response?.text());
   
  }
 
  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      console.log('Login Success:', codeResp);  // optional
      GetUserProfile(codeResp); // <-- Call the function to get profile data
    },
    onError: (error) => {
      console.error('Login Error:', error);
    }
  });
  
const SaveAiTrip = async(TripData) => {

  const user =JSON.parse(localStorage.getItem('user'))
  const docId = Date.now().toString()
  await setDoc(doc(db, "AITrips", docId), {
    userSelection:formData,
    tripData:TripData,
    userEmail:user?.email,
    id:docId
  });
  setLooading(false);
  navigate('/view-trip/' + docId)
}
  
const GetUserProfile = (tokenInfo) => {
  axios
    .get('https://www.googleapis.com/oauth2/v1/userinfo', {
      params: {
        access_token: tokenInfo?.access_token,
      },
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'application/json',
      },
    })
    .then((resp) => {
      console.log("hello veere",resp.data); // Usually, resp.data contains the user info
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDailog(false);
      OnGenerateTrip();
      window.location.reload()
    })
    .catch((err) => {
      console.error('Error fetching user profile:', err);
    });
};

  return (
    <>
        <div className='flex flex-col justify-between  sm:px-10 md:px-32 lg:px-56 xl:px-56 px-5 mt-10   '>
            <h2 className=' text-[30px] font-bold'>Tell us your travel preferences ⛺🌴</h2>
            <p className='text-[20px] text-gray-400 ' >Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>
            <div className='mt-20'> 
                <div>
                    <h2 className=' text-[22px]'>What is destination of choice?</h2>
                    <OSMAutocomplete
                      onSelect={handlePlaceSelect} 
                    /> 
                </div>
                <div className='mt-[50px]' >
                  <h2 className='text-[22px]'>How many days are you planning your trip?</h2>
                  <input className=' mt-[10px] rounded-[5px] border border-gray-300 w-full p-2 ' type='number'  placeholder='Ex.3(applicable only for less than 5 days)'
                    onChange={(e) =>handelInputChange('noOfDays',e.target.value)}
                    min={1}
                    max={7}
                   />
                </div>
                <div className='mt-[50px]' >
                  <h2 className='text-[22px]'>What is Your Budget?</h2>
                  <div className='grid grid-cols-3 gap-5 mt-5 '>
                      {SelectBudgetOptions.map((item,index) =>(
                        <div key={item.id || index} 
                          onClick={() => handelInputChange('budget',item.title)}
                          className= {`p-4  cursor-pointer rounded-lg  hover:shadow-xl
                            ${formData?.budget==item.title ? 'border-2 shadow-xxl border-black' : 'border border-gray-300'}
                          `} >
                          <h2 className='text-4xl'>{item.icon}</h2>
                          <h2 className='font-bold pt-[2px] text-lg '>{item.title}</h2>
                          <h2 className='pt-[3px]' >{item.desc}</h2>
                        </div>
                      ))}
                  </div>
                  <div className='mt-[50px]' >
                    <h2 className='text-[22px]' >Who do you plan on traveling with on your next adventure?</h2>
                    <div className=' grid grid-cols-3 gap-5 mt-[10px] ' >
                      {SelectTravelList.map((item,index) =>(
                        <div  key={item.id || index} 
                          onClick={() => handelInputChange('traveler',item.people)} 
                          className={` p-4 mt-[5px] cursor-pointer hover:shadow-xl  rounded-xl  
                            ${formData?.traveler==item.people ? ' border-black   border-2 shadow-xl ': 'border border-gray-300'}
                          `} >
                          <h2 className='text-4xl'>{item.icon}</h2>
                          <h2 className='text-lg font-bold pt-[2px]' > {item.title} </h2>
                          <h2 className='pt-[3px]' >{item.desc}</h2>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
            </div>
            <div className=' mb-[40px] flex justify-end mt-[10px]' >
              <button 
              disabled={loading}
              onClick={OnGenerateTrip} className=' p-3 bg-black text-white  rounded-[6px] cursor-pointer '>
                {
                  loading ? <AiOutlineLoading3Quarters className=' h-7 w-7  animate-spin ' /> : 'Generate Trip'
                }
              </button>
            </div> 
            <Dialog open={openDailog}>
              
              <DialogContent>
                  <DialogHeader>
                        <DialogDescription>
                          <div className='flex gap-[5px]'>
                            <img className='h-[35px] ' src='/logo.svg'/>
                            <p className='  font-bold text-black text-[25px]    '>PlanifyAI</p>
                          </div>
                          <div className=' pt-[25px] ' >
                            <p className=' font-bold text-[17px] '>Sign In With Google</p>
                            <p>Sign in to the App with Google authentication securely</p>
                          </div>
                          <div className='pt-[18px]' >
                            <Button onClick={login}  className='w-full cursor-pointer text-[16px] flex gap-[12px]' ><FcGoogle className=' size-[25px] ' /> Sign In With Google</Button>
                          </div>
                        </DialogDescription>
                  </DialogHeader>
              </DialogContent>
        </Dialog>    
        </div>
        
    </>
  )
}

export default CreateTrip