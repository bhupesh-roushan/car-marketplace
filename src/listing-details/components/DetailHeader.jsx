import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { PiSpeedometerBold } from "react-icons/pi";
import { TbManualGearboxFilled } from "react-icons/tb";
import { FaGasPump } from "react-icons/fa6";
function DetailHeader({ carDetail }) {
  return (
    <div>
       {carDetail?.listingTitle? <div>
      <h2 className="font-bold text-3xl">{carDetail?.listingTitle}</h2>
      <p className="text-sm">{carDetail?.tagline}</p>

      <div className="flex gap-2 mt-3">
        <div className="flex gap-2 items-center bg-blue-50 rounded-full p-2 px-3">
          <FaCalendarAlt className="h-5 w-5 text-primary" />
          <h2 className="text-primary text-sm">{carDetail?.year}</h2>
        </div>

        <div className="flex gap-2 items-center bg-blue-50 rounded-full p-2 px-3">
          <PiSpeedometerBold className="h-5 w-5 text-primary" />
          <h2 className="text-primary text-sm">{carDetail?.mileage}</h2>
        </div>

        <div className="flex gap-2 items-center bg-blue-50 rounded-full p-2 px-3">
          <TbManualGearboxFilled className="h-5 w-5 text-primary" />
          <h2 className="text-primary text-sm">{carDetail?.transmission}</h2>
        </div>
        <div className="flex gap-2 items-center bg-blue-50 rounded-full p-2 px-3">
          <FaGasPump className="h-5 w-5 text-primary" />
          <h2 className="text-primary text-sm">{carDetail?.transmission}</h2>
        </div>
      </div>
      </div>:

      <div className="w-full rounded-xl h-[100px] bg-slate-200 animate-pulse">

      </div>}

      
    </div>
  );
}

export default DetailHeader;
