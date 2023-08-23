'use client';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../Database/FirebaseConfig';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUserContext } from '../context/store';

 const SignUp: React.FC = () => {
  const {userName,setUserName,log,setLog}=useUserContext(); //context api
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [subState, setSubState] = useState(false); //submit button
  const router = useRouter();
  const handleSubmit = () => {
    if (!(name || email || password)) {
      console.log(email);
      console.log(password);
      alert("Enter all details");
    } else {
      setSubState(true); // Disable the button while submitting

      createUserWithEmailAndPassword(auth, email, password)
        .then(async(res) => {
          console.log("Success");
          console.log(res.user);
          const user = res.user;
          await updateProfile(user,{displayName:name});
          console.log(user);
          setSubState(false); // Enable the button after successful submission
          setUserName(name);
          setLog(true);
          router.push("/");
        })
        .catch((error) => {
          console.log("Error: ");
          console.log("Error: " + error.message);
          alert(error.message)
          setSubState(false); // Enable the button if there's an error
        });
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center  p-24">
      <div className="flex min-h-screen text-white rounded-lg bg-slate-950 flex-col items-center  p-10">
        <h1 className='text-5xl text-center p-5 font-semibold'>SignUp</h1>
        <div className="mb-3 row">
          <label htmlFor="staticEmail" className="form-label">UserName</label>
          <div className="col-sm-10">
            <input type="text" onChange={(e) => { setName(e.target.value) }} className='text-gray-800' placeholder="UserName" />
          </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="staticEmail" className="form-label">Email</label>
            <div className="col-sm-10">
              <input type="email" onChange={(e) => { setEmail(e.target.value) }} className='text-gray-800' placeholder="Example@email.com" value={email} />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="inputPassword" className="form-label">Password</label>
            <div className="col-sm-10">
              <input type="password" onChange={(e) => { setPassword(e.target.value) }} className='text-gray-800' id="inputPassword" />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button type="button" onClick={handleSubmit} className="btn btn-light" disabled={subState} style={{ width: "55%", alignContent: "center", alignItems: "center" }}>SignUp</button>
          </div>
          <p className='my-2'>Already have an account?<span><Link href="/login" style={{ color: "white", textDecoration: "none" }}> Login</Link></span></p>
        </div>
      </div>
      );
}
export default SignUp;