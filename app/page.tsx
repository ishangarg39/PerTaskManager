'use client';

import Link from "next/link";
import { useUserContext } from "./context/store";

export default function Home() {
  const {userName,setUserName,log,setLog}=useUserContext();
  
  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
        <h1 className='text-5xl text-center p-5 font-semibold'> Task Manager </h1>
     {!log &&<Link href="/login"className='text-xl text-center p-5 font-medium text-purple-500	'>Please Login To Proceed</Link>} 
     {log &&<div className='text-xl text-center p-5 font-medium text-purple-500'>Hey {userName} is your Task BUDDy...</div>}
    </main>
  )
}
