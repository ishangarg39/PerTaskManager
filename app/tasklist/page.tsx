'use client';
import React, { useEffect, useState } from 'react';
import { arrayUnion, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../Database/FirebaseConfig';
import { useUserContext } from '../context/store';
import Link from 'next/link';

export default function TaskList() {
    const {userName,setUserName,log,setLog}=useUserContext(); //context api

    const [data, setData] = useState(null);
    const [del, setDel] = useState(false);
    const [assigningTaskId, setAssigningTaskId] = useState(null);
    const [name, setName] = useState(null);
    const [comments, setComments] = useState(null);
    const [ch, setCh] = useState(null);
    const [displayName, setDisplayName] = useState(null);
    const [update,setUpdate]=useState(0);
const getData = async () => {
    console.log("FDS" + displayName);
    const q = query(collection(db, 'Task'), where("Assign", "array-contains", displayName));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    });
    console.log("user 2 " + querySnapshot.data);
    const tempData = querySnapshot.docs?.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    setData(tempData);
};

useEffect(() => {
    onAuthStateChanged(auth, (user)=>{
        //  const user = auth.currentUser;
    console.log(user+"user  u")
    if (user) {
        // user.providerData.forEach((profile) => {
        //     console.log("Sign-in provider: " + profile.providerId);
        //     console.log("  Provider-specific UID: " + profile.uid);
        //     console.log("  Name: " + profile.displayName);
        //     console.log("  Email: " + profile.email);
        //     console.log("  Photo URL: " + profile.photoURL);
        //   });
        setDisplayName(user.displayName);
        console.log(user.displayName + "  us1");
        console.log(typeof user.displayName);
    } else {
        console.log(user + " dfsfs");
    }
});
}, []);

useEffect(() => {
    console.log(displayName+" u3")
    if (displayName) {
        ShowAll();
        getData();
    }
}, [displayName]);

useEffect(() => {
    console.log(displayName+" u3")
    setUpdate(0);

        ShowAll();
        getData();
    
}, [update]);

    const handleUpdate = async (taskId) => {
        try {
            const docs = doc(db, "Task", taskId);
            await updateDoc(docs, { Status: true });

            console.log('Task updated successfully!');
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleDelete = async (taskId) => {
        try {
            const docs = doc(db, "Task", taskId);
            await deleteDoc(docs);
            setDel(true)
            setData((prevData) => prevData.filter((task) => task.id !== taskId));
            console.log('Task Deleted successfully!');
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const ShowCompleted = async () => {
        console.log("completed task")
        const q = query(collection(db, 'Task'), where("Assign", "array-contains", displayName), where("Status", "==", true));
        const querySnapshot = await getDocs(q);
        const tempData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setData(tempData);

    }

    const ShowUnCompleted = async () => {
        console.log("uncompleted task"+displayName)
        const q = query(collection(db, 'Task'),  where("Assign", "array-contains", displayName),where("Status", "==", false));
        const querySnapshot = await getDocs(q);
        const tempData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setData(tempData);

    }
    const ShowAll = async () => {
        console.log("all task")
        const q = query(collection(db, 'Task'), where("Assign", "array-contains", displayName));
        const querySnapshot = await getDocs(q);
        const tempData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setData(tempData);

    }

    // ...

    const handleAssign = (taskId) => {
        setAssigningTaskId(taskId);
        console.log(assigningTaskId);
    };

    const handleCancelAssign = () => {
        setAssigningTaskId(null);
        setCh(null)
        setUpdate(1);
    };

    const addAssign = async (taskId) => {
        try {
            const docs = doc(db, "Task", taskId);
            await updateDoc(docs, { Title: name});
            setName("");
            console.log('User added successfully!');
            handleCancelAssign();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const addComment = async (taskId) => {
        try {
            const docs = doc(db, "Task", taskId);
            await updateDoc(docs, { Description: comments });
            setComments("");
            console.log('desc added successfully!');
            handleCancelAssign();
        } catch (error) {
            console.error('Error Commenting task:', error);
        }
    };
    return (
        <div  className="flex min-h-screen flex-col items-center  p-24">
              <div className='flex justify-center'>
                <h2 className='text-5xl text-purple-800 text-center mt-2 font-semibold'>Task List</h2>
               </div>
          {log && <div><div className='flex justify-center'>
            <button  className="bg-gray-950 border-none text-white p-2 rounded-lg m-10 h-10 text-base " onClick={ShowCompleted}>Completed task</button>
            <button  className="bg-gray-950 border-none  text-white p-2 rounded-lg m-10 h-10 text-base " onClick={ShowUnCompleted}>Uncompleted task</button>
            <button  className="bg-gray-950 border-none  text-white p-2 rounded-lg m-10 h-10 text-base " onClick={ShowAll}>All tasks</button>
            </div>
            <div className='flex flex-col align-center'>
            {data &&
                data?.map((task) => (
                    <div className="flex flex-row m-5" key={task.id}>
                        <div className='container-fluid rounded my-3' style={{ color: 'white', backgroundColor: '#212529', width: '20vw', padding: '10px', border: '10px' }}>
                            <h3>Task: {task.Title}</h3>
                            <p>
                                Description: {task.Description} || Due Date: {task.Due_Date}
                            </p>
                            <button  className="bg-white border-none  text-purple-800 p-2 rounded-lg m-2 h-10 text-base " type='button' onClick={() => handleDelete(task.id)}>
                                Delete
                            </button>
                            {!task.Status && (
                                <button  className="bg-white border-none  text-purple-800 p-2 rounded-lg m-2 h-10 text-base " type='button' onClick={() => handleUpdate(task.id)}>
                                    Completed
                                </button>
                            )}
                            {!assigningTaskId && (
                                <button  className="bg-white border-none  text-purple-800 p-2 rounded-lg m-2 h-10 text-base " type='button' onClick={() => handleAssign(task.id)}>
                                    Edit Title
                                </button>
                            )}
                            {assigningTaskId === task.id && ch===null && (
                                <div>
                                    <div className='text-gray-950'> <label >Title:   </label>
                                        <input
                                            type="text"
                                            value={name}
                                            placeholder='New Title'
                                            onChange={(e) => setName(e.target.value)}
                                        /></div>
                                    <button  className="bg-white border-none  text-purple-800 p-2 rounded-lg m-2 h-10 text-base " type="button" onClick={() => addAssign(task.id)}>
                                        Change
                                    </button>
                                    <button  className="bg-white border-none  text-purple-800 p-2 rounded-lg m-2 h-10 text-base "type="button" onClick={handleCancelAssign}>
                                        Cancle
                                    </button>
                                    {/* Add the UserList component here */}
                                </div>
                            )}
                             {!assigningTaskId && (
                                <button  className="bg-white border-none  text-purple-800 p-2 rounded-lg m-2 h-10 text-base " type='button' onClick={() =>{ handleAssign(task.id);setCh("")}}>
                                   Edit Description
                                </button>
                            )}
                            {assigningTaskId === task.id &&ch!==null && (
                                <div>
                                   
                                    <div className='text-gray-950'> <label >Description: </label>
                                        <input
                                            type="text"
                                            value={comments}
                                            placeholder='Type Comment'
                                            onChange={(e) => setComments(e.target.value)}
                                        /></div>
                                    <button  className="bg-white border-none  text-purple-800 p-2 rounded-lg m-2 h-10 text-base " type="button" onClick={() => addComment(task.id)}>
                                        Change
                                    </button>
                                    <button  className="bg-white border-none  text-purple-800 p-2 rounded-lg m-2 h-10 text-base " type="button" onClick={handleCancelAssign}>
                                        Cancle
                                    </button>
                                    {/* Add the UserList component here */}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                </div> 
                </div>}
                {!log &&<Link href="/login"className='text-xl text-center p-5 font-medium text-purple-500	'>Please Login To Proceed</Link>}
                        </div>
    );

}
