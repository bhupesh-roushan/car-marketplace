// import React from 'react'
// import { Button } from './components/ui/button'
// import { SignInButton } from '@clerk/clerk-react'
// import Header from './components/Header'
// import Hero from './components/Hero'
// import Category from './components/Category'
// import MostSearchedCar from './components/MostSearchedCar'
// import InfoSection from './components/InfoSection'
// import Footer from './components/Footer'
// import {ClerkProvider} from "@clerk/clerk-react"
// function Home() {
//   const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
//   return (
//     <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
//     <div>
//       {/* <header></header> */}
//       <Header/>
//       {/* <hero></hero> */}
//       <Hero/>
//       {/* Category */}
//       <Category/>
//       {/* Most Search Car */}
//       <MostSearchedCar/>
//       {/* InfoSection */}
//       <InfoSection/>
//       {/* Footer Section */}
//       <Footer/>
//     </div>
//     </ClerkProvider>
//   )
// }

// export default Home



import React from 'react';
import { Button } from './components/ui/button';
import { SignInButton } from '@clerk/clerk-react';
import Header from './components/Header';
import Hero from './components/Hero';
import Category from './components/Category';
import MostSearchedCar from './components/MostSearchedCar';
import InfoSection from './components/InfoSection';
import Footer from './components/Footer';
import { ClerkProvider } from '@clerk/clerk-react';

function Home() {
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  return (
    
      <div>
        {/* <header></header> */}
        <Header />
        {/* <hero></hero> */}
        <Hero />
        {/* Category */}
        <Category />
        {/* Most Search Car */}
        <MostSearchedCar />
        {/* InfoSection */}
        <InfoSection />
        {/* Footer Section */}
        <Footer />
      </div>
  );
}

export default Home;

