'use client';
import React from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../Database/FirebaseConfig';
import { useRouter } from 'next/navigation';
import { useUserContext } from '../context/store';

export default function Logout() {
    const {userName,setUserName,log,setLog}=useUserContext(); //context api
    const router=useRouter();
    
    const handleLogout = () => {        
        console.log("LogoutClicked")
        signOut(auth).then(() => {
            console.log("logout Successfull");
            setUserName("");
            setLog(false);
            router.push("/")

        }).catch((error) => {
            // An error happened.
            console.log("Can'logout");
        });
    }
    return (
        <div className='flex flex-col'>
            <h2 className='text-5xl text-center p-5 font-semibold'>You Want to Logout</h2>
           <div className='flex justify-center'> <button onClick={handleLogout} type="button" className='text-xl text-white bg-purple-800  p-3 rounded-md font-semibold'>Logout</button>
           </div>
        </div>
    )
}
