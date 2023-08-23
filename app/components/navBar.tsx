'use client';
import Link from 'next/link';
import React from 'react';
import { useUserContext } from '../context/store';
import { useRouter } from 'next/navigation';

export default function NavBar() {
  const {userName,setUserName,log,setLog}=useUserContext(); //context api
  const router=useRouter();
  const loginStatus = () => {
    if (!log ) {
      router.push("/login");
    }
    else {
      router.push("/logout");
    }
  }
  return (
    <div>
    <div className='pt-3 px-10'>
      
      <nav className="flex  ">
      
          
        <div className="flex   items-center ">
          <Link href="/">
           <div className='text-4xl align-middle text-center text-purple-800 font-semibold mr-5'> Task Manager</div>
          </Link>
          <Link href="/createtask">
            <div className="mr-5">New Task</div>
          </Link>

          <Link href="/tasklist">
            <div className="mr-5">Task List</div>
          </Link>

          <Link href="/about">
            <div className="mr-5">About</div>
          </Link>
        </div>
        <div className="flex ml-auto items-center space-x-4 ">
          
          <div style={{ margin: '10px' }}>
            
              <button className="bg-gray-950 border-none text-white p-2 rounded-lg h-10 text-base w-full" onClick={loginStatus}>
               {!log && <p>Login</p>} {log &&  <p>Logout</p>} 
              </button>
            
          </div>
        </div>
      </nav>
    </div>
          <hr className="mt-2" />
</div>
  );
}
