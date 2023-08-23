'use client';
import { collection, doc, getCountFromServer, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../Database/FirebaseConfig';
import { useRouter } from 'next/navigation';
import { useUserContext } from '../context/store';
import Link from 'next/link';

export default function TaskForm() {
  const {userName,setUserName,log,setLog}=useUserContext(); //context api

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [counts, setCounts] = useState(0); // Initialize counts state variable
  var userCollectionRef;
  const router = useRouter();

  var displayName;
  const user = auth.currentUser;
  if (user != null) {
    displayName = user.displayName;

  }


  useEffect(() => {
    console.log(counts);
  }, [counts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title !== '' && description !== '' && dueDate !== '') {
      const coll = collection(db, 'Task');
      const snapshot = await getCountFromServer(coll);
      console.log(typeof snapshot.data().count);
      const c = snapshot.data().count;
      setCounts(c + 1);
      userCollectionRef = doc(db, 'Task', `Task-${c + 1}`);
      const u = doc(db, 'Quizes', `${c + 1}`);
      var QName = await getDoc(u);
      if (QName.exists()) {
        console.log('Same task number');
      } else {
        await setDoc(userCollectionRef, {
          Title: title,
          Description: description,
          Due_Date: dueDate,
          Status: false,
          Assign: [displayName],
          Comments: []
        });
        setTitle('');
        setDescription('');
        setDueDate('');
        console.log('Data saved:', c + 1);
        //  navigate("/CreateQuiz/Ques", { state: { Q: `Quizes/${QuizName}/Ques` } })
        router.push("/tasklist");
      }
    } else {
      alert('Fill all details');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center  p-24">
        <h1 className='text-5xl text-center p-5 font-semibold'> Task Manager </h1>
        
     {log && <div className='flex flex-col bg-gray-950  rounded-lg p-10 '>
      <h2 className='text-3xl text-center text-white p-5 font-semibold'>Create Task</h2>
      <div className="mb-3 p-4">
        <label className="text-white">Title: </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        /></div>
          <div className="mb-3 p-4">
        <label className="text-white">Description: </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        </div>  
        <div className="mb-3 p-4">
        <label className="text-white">Due Date: </label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <div className='flex justify-center'>
      <button className='text-xl text-white bg-purple-800  p-3 rounded-md font-semibold' onClick={handleSubmit} type="submit">
        Add Task
      </button>
      </div>
      </div>}

      {!log &&<Link href="/login"className='text-xl text-center p-5 font-medium text-purple-500	'>Please Login To Proceed</Link>}
    </div>
  );
}
