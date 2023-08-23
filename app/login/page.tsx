'use client';
import {  signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import Link from 'next/link';
import { auth } from '../Database/FirebaseConfig';
import { useRouter } from 'next/navigation';
import { useUserContext } from '../context/store';


export default function Login() {
  const {userName,setUserName,log,setLog}=useUserContext(); //context api
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [subState, setSubState] = useState(false); //submit button
const router=useRouter();
  const handleSubmit = () => {
    if (!(email || password)) {
      console.log(email);
      console.log(password);
      alert("Enter all details");
    } else {
      setSubState(true); // Disable the button while submitting

      signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          console.log("Success");
          console.log(res.user);
          const user=res.user;
          console.log(user.displayName);
          setSubState(false); // Enable the button after successful submission
          setLog(true);
          const displayName=user.displayName;
          setUserName(displayName || "");
          router.push("/");
        })
        .catch((error) => {
          // console.log("Error: ");
          // console.log("Error: " + error.message);
          alert(error.message)
          setSubState(false); // Enable the button if there's an error
        });
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center mb-20 p-20">
    <div className="flex min-h-screen text-white rounded-lg bg-slate-950 flex-col items-center  p-10">
      <h1 className='text-5xl text-white text-center p-5 font-semibold'>Login</h1>
      <div className="mb-3 row">
        <label htmlFor="staticEmail" className="form-label">Email</label>
        <div className="col-sm-10">
          <input type="email" onChange={(e) => { setEmail(e.target.value) }} className="form-control" placeholder="Example@email.com" value={email} />
        </div>
      </div>
      <div className="mb-3 row">
        <label htmlFor="inputPassword" className="form-label">Password</label>
        <div className="col-sm-10">
          <input type="password" onChange={(e) => { setPassword(e.target.value) }} className="form-control" id="inputPassword" />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <button type="button" onClick={handleSubmit} className="btn btn-light" disabled={subState} style={{ width: "55%", alignContent: "center", alignItems: "center" }}>Login</button>
      </div>
      <p className='my-2'>Don't have an account?<span><Link href="/signup" style={{ color: "white", textDecoration: "none" }}> SignUp</Link></span></p>
    </div>
  </div>
  )
}
