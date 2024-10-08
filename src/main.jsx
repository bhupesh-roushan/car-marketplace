// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import Home from './Home'
// import Contact from './Contact'
// import Profile from "./profile/Index"
// import {ClerkProvider} from "@clerk/clerk-react"
// import AddListing from "./add-listing"
// import { Toaster } from 'sonner'
// import SearchByCategory from './search/[category]'
// import SearchByOptions from './search'
// import ListingDetail from './listing-details/[id]'



// const router=createBrowserRouter([
//   {
//     path:"/",
//     element:<Home/>
//   },
//   {
//     path:"/contact",
//     element:<Contact/>
//   },
//   {
//     path:"/profile",
//     element:<Profile/>
//   },
//   {
//     path:"/add-listing",
//     element:<AddListing/>
//   },
//   {
//     path:"/search/:category",
//     element:<SearchByCategory/>
//   },
//   {
//     path:"/search",
//     element:<SearchByOptions/>
//   },
//   {
//     path:"/listing-details/:id",
//     element:<ListingDetail/>
//   }
// ])

// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

// if (!PUBLISHABLE_KEY) {
//   throw new Error("Missing Publishable Key")
// }


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
//     <RouterProvider router={router}/>
//     <Toaster />
//     </ClerkProvider>
//   </StrictMode>
// )



import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Home';
import Contact from './Contact';
import Profile from './profile/Index';
import { ClerkProvider } from '@clerk/clerk-react';
import AddListing from './add-listing';
import { Toaster } from 'sonner';
import SearchByCategory from './search/[category]';
import SearchByOptions from './search';
import ListingDetail from './listing-details/[id]';
import { SignIn } from '@clerk/clerk-react'; // Import SignIn page from Clerk

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/contact',
    element: <Contact />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/add-listing',
    element: <AddListing />,
  },
  {
    path: '/search/:category',
    element: <SearchByCategory />,
  },
  {
    path: '/search',
    element: <SearchByOptions />,
  },
  {
    path: '/listing-details/:id',
    element: <ListingDetail />,
  },
  {
    path: '/sign-in', // Add the route for the sign-in page
    element: <SignIn />,
  },
]);

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/sign-in">
      <RouterProvider router={router} />
      <Toaster />
    </ClerkProvider>
  </StrictMode>
);
