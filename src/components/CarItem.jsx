import { Separator } from "./ui/separator";
import React from "react";
import { LuFuel } from "react-icons/lu";
import { PiSpeedometerLight } from "react-icons/pi";
import { TbManualGearbox } from "react-icons/tb";
import { RxOpenInNewWindow } from "react-icons/rx";
import { Link } from "react-router-dom";
function CarItem({ car }) {


  return (

    <Link to={"/listing-details/"+car?.id}> 
    <div className="rounded-xl bg-white hover:shadow-lg cursor-pointer">
        <h2 className="absolute m-2 bg-green-500 px-2 rounded-full text-sm text-white">New</h2>
      <img src={car?.images[0]?.imageUrl} width={'100%'} height={250} className="rounded-t-xl h-[180px] w-full object-cover" />
      <div>
        <h2 className="font-bold text-black text-lg ml-3 mb-3">{car?.listingTitle}</h2>
        <Separator/>
        <div className="grid grid-cols-3 mt-5">
            <div className="flex flex-col items-center">
                <LuFuel className="text-lg mb-2"/>
                <h2>{car?.fuelType}</h2>
            </div>
            <div className="flex flex-col items-center">
                <PiSpeedometerLight className="text-lg mb-2"/>
                <h2>{car?.mileage}Km</h2>
            </div>
            <div className="flex flex-col items-center">
                <TbManualGearbox className="text-lg mb-2"/>
                <h2>{car?.transmission}</h2>
            </div>
        </div>
        <Separator className="my-2"/>

        <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl ml-3">${car?.sellingPrice} </h2>
            <h2 className="text-primary text-sm flex gap-2 items-center">
             View Details <RxOpenInNewWindow /></h2>
        </div>



      </div>
    </div>
    </Link> 
  );
}

export default CarItem;
