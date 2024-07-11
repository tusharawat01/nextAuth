// 'use client'

// import { useRouter } from "next/navigation";
// import React from "react";

// export default function Home() {
//   const router = useRouter();

//   const handleNavigation = (path:any) => {
//     router.push(path);
//   };

//   return (
//     <div className='flex flex-col items-center justify-center min-h-screen py-2'>
//       <h1 className='text-2xl font-bold mb-6'>Home Page</h1>
//       <div className='flex space-x-4'>
//         <button
//           className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
//           onClick={() => handleNavigation("/login")}
//         >
//           Login
//         </button>
//         <button
//           className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
//           onClick={() => handleNavigation("/signup")}
//         >
//           Signup
//         </button>
//       </div>
//     </div>
//   );
// }


import React from 'react'

function page() {
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  )
}

export default page
