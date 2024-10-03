import Service from "@/Shared/Service";
import { db } from "./../../configs";
import { CarImages, CarListing } from "./../../configs/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Search from "@/components/Search";
import CarItem from "@/components/CarItem";

function SearchByOptions() {
  const [searchParams] = useSearchParams();
  const conditon = searchParams.get("cars");
  const make = searchParams.get("make");
  const[isLoading,setIsLoading]=useState()

  const[carList,setCarList]=useState([])

  useEffect(() => {
    getCarList();
  }, []);

  const getCarList = async () => {
    const result = await db
      .select()
      .from(CarListing)
      .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
      .where(conditon != undefined && eq(CarListing.conditon, conditon))
      .where(make != undefined && eq(CarListing.make, make));

    const resp = Service.FormatResult(result);
    console.log(resp);
    setCarList(resp)
  };
  return (
    <div>
      <Header />
      <div className="p-16 bg-black flex justify-center">
        <Search />
      </div>
      <div>
        <h2 className="font-bold text-4xl p-10 lg:p-20">Search Result</h2>

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
                <div key={index}>
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

export default SearchByOptions;
