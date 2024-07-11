'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { useRouter } from 'next/router';
import Link from 'next/link';


export default function VerifyEmailPage() {

    // const router = useRouter();

    const [token, setToken] = useState("");
    const [verified, setverified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
       try {
         await axios.post('/api/users/verifyemail', {token});
         setverified(true);
        }catch (error:any) {
            setError(true);
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        setError(false)
        //purely javascript based approach for getting token from query
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
        console.log(urlToken)
        console.log(token)

        // next js approach  for getting token
        // const { query } = router;
        // const urlToken2 = query.token;
        // setToken(urlToken2);

    }, [])

    useEffect(() => {
        setError(false)
        if(token.length > 0){
            verifyUserEmail()
        }
    },[token])


  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1 className='text-4xl'>Verify Email</h1>
        <h2 className='p-2 bg-orange-500 text-black'>{token ? `${token}`: "No Token"}</h2>
        {verified && (
            <div>
                <h2>Email verified</h2>
                <Link href = "/login">Login</Link>
            </div>
        )}
        {error && (
            <div>
                <h2>error</h2>
            </div>
        )}
    </div>
  )
}
