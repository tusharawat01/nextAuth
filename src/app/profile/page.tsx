'use client'

import axios from 'axios';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("nothing");

    const getUserDetails = async () => {
        try {
            const res = await axios.get("/api/users/me");
            console.log(res.data.data);
            setData(res.data.data._id);
        } catch (error:any) {
            console.log("Did not get User Details")
            toast.error(error.message);
        }
    }

    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success("Logout Success");
            router.push("/login");
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
       <h1>Profile Page</h1>
       <hr />
       <h2>{data === "nothing" ? "Nothing" : <Link href = {`/profile/${data}`}>{data}</Link>}</h2> 
       <hr />
       <button
       className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
       onClick={logout}
       >Logout</button>
       <button
       className='bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
       onClick={getUserDetails}
       >Get Details</button>
    </div>
  )
}


