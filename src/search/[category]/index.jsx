// import Header from "@/components/Header";
// import Search from "@/components/Search";
// import { db } from "./../../../configs";
// import { CarImages, CarListing } from "./../../../configs/schema";
// import { eq } from "drizzle-orm";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Service from "@/Shared/Service";
// import CarItem from "./../../components/CarItem";

// function SearchByCategory() {
//   const { category } = useParams();
//   console.log(category);
//   const [carList, setCarList] = useState();

//   useEffect(() => {
//     getCarList();
//   }, []);

//   const getCarList = async () => {
//     const result = await db
//       .select()
//       .from(CarListing)
//       .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
//       .where(eq(CarListing.category, category));
//     const resp = Service.FormatResult(result);
//     setCarList(resp);
//   };
//   return (
//     <div>
//       <Header />
//       <div className="p-16 bg-black flex justify-center">
//         <Search />
//       </div>
//       <div>
//         <h2 className="font-bold text-4xl p-10 lg:p-20">{category}</h2>

//         {/* list of cars */}
//        <div>
//             {carList.map((item,index)=>(
//                 <div>
//                     <CarItem car={item}/>
//                 </div>
//             ))}
//        </div>
//       </div>
//     </div>
//   );
// }

// export default SearchByCategory;



// old






import Header from "@/components/Header";
import Search from "@/components/Search";
import { db } from "./../../../configs";
import { CarImages, CarListing } from "./../../../configs/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Service from "@/Shared/Service";
import CarItem from "./../../components/CarItem";

function SearchByCategory() {
  const { category } = useParams();
  const [carList, setCarList] = useState([]); // Initialize as an empty array
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    getCarList();
  }, [category]);

  const getCarList = async () => {
    setIsLoading(true); // Start loading
    try {
      const result = await db
        .select()
        .from(CarListing)
        .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
        .where(eq(CarListing.category, category));
      const resp = Service.FormatResult(result);
      setCarList(resp); // Set the car list after formatting the result
    } catch (error) {
      console.error("Error fetching car list:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <Header />
      <div className="p-16 bg-black flex justify-center">
        <Search />
      </div>
      <div>
        <h2 className="font-bold text-4xl p-10 lg:p-20">{category}</h2>

        {/* Skeleton loading effect */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-10">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-48 bg-gray-300 rounded-lg"></div>
                <div className="mt-4 h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="mt-2 h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-10">
            {carList && carList.length > 0 ? (
              carList.map((item, index) => (
                <div key={index} >
                  <CarItem car={item} />
                </div>
              ))
            ) : (
              <p>No cars found for this category.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchByCategory;
