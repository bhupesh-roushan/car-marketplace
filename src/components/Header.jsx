// import { UserButton, useUser } from '@clerk/clerk-react'
// import React from 'react'
// import { Button } from './ui/button'
// import { Link } from 'react-router-dom'

// function Header() {
//     const {user,isSignedIn}=useUser()
//   return (
//     <div className='flex justify-between items-center shadow-sm p-5'>
//       <img src="/vite.svg" width={60} height={40} />
//       <ul className='hidden  md:flex gap-16'>
//         <li className='font-medium  hover:scale-105 transition-all cursor-pointer hover:text-primary '>Home</li>
//         <li className='font-medium  hover:scale-105 transition-all cursor-pointer hover:text-primary '>Search</li>
//         <li className='font-medium  hover:scale-105 transition-all cursor-pointer hover:text-primary '>New</li>
//         <li className='font-medium  hover:scale-105 transition-all cursor-pointer hover:text-primary '>Pre-Owned</li>
//       </ul> 

//         {isSignedIn ? 
        
//         <div className='flex items-center gap-5'>
//             <UserButton/>
//             <Link to={'/profile'}>
            
//             <Button>Submit Listing</Button>
//             </Link>
//         </div>
//         :
//         <Button>Log in </Button>
//     }


//     </div>
//   )
// }

// export default Header



import { UserButton, useUser, SignInButton } from '@clerk/clerk-react';
import React from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

function Header() {
  const { isSignedIn } = useUser();

  return (
    <div className='flex justify-between items-center shadow-sm p-5'>
      <img src="/vite.svg" width={60} height={40} />
      <ul className='hidden md:flex gap-16'>
        <li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'>
          Home
        </li>
        <li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'>
          Search
        </li>
        <li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'>
          New
        </li>
        <li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'>
          Pre-Owned
        </li>
      </ul>

      {isSignedIn ? (
        <div className='flex items-center gap-5'>
          <UserButton />
          <Link to={'/profile'}>
            <Button>Submit Listing</Button>
          </Link>
        </div>
      ) : (
        <SignInButton mode="modal">
          <Button>Log in</Button>
        </SignInButton>
      )}
    </div>
  );
}

export default Header;

