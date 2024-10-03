import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import DetailHeader from "../components/DetailHeader";
import { useParams } from "react-router-dom";
import { CarImages, CarListing } from "./../../../configs/schema";
import Service from "@/Shared/Service";
import { db } from "./../../../configs";
import { eq } from "drizzle-orm";
import ImageGallery from "../components/ImageGallery";
import Description from "../components/Description";
import Features from "../components/Features";
import Pricing from "../components/Pricing";
import Specification from "../components/Specification";
import OwnersDetails from "../components/OwnersDetails";
import Footer from "@/components/Footer";
import FinancialCalculator from "../components/FinancialCalculator";
import MostSearchedCar from "@/components/MostSearchedCar";

function ListingDetail() {
  const { id } = useParams();
  const [carDetail, setCarDetail] = useState();

  useEffect(() => {
    getCarDetail();
  }, []);

  const getCarDetail = async () => {
    const result = await db
      .select()
      .from(CarListing)
      .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
      .where(eq(CarListing.id, id));

    const resp = Service.FormatResult(result);
    setCarDetail(resp[0]);
  };
  return (
    <div>
      <Header />
      {/* Header Details */}
      <div className="p-10 md:p-20">
        <DetailHeader carDetail={carDetail} />
        <div className="grid grid-cols-1 md:grid-cols-3 w-full mt-10 gap-5">
            {/* left */}
            <div className="md:col-span-2">
                <ImageGallery carDetail={carDetail}/>
                <Description carDetail={carDetail}/>
                <Features features={carDetail?.features}/>
                <FinancialCalculator carDetail={carDetail}/>
            </div>
            {/* right */}
            <div>
                {/* pricing */}
                    <Pricing carDetail={carDetail}/>
                    {/* carproperties */}
                    <Specification carDetail={carDetail}/>
                    {/* owner details */}
                    <OwnersDetails carDetail={carDetail}/>

            </div>
        </div>

        <MostSearchedCar/>
      </div>
      <Footer/>
    </div>
  );
}

export default ListingDetail;
