import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import carDetails from "./../Shared/carDetails.json";
import features from "./../Shared/features.json";
import InputFeild from "./components/InputFeild";
import DropdownFeild from "./components/DropdownFeild";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { db } from "./../../configs";
import { CarImages, CarListing } from "./../../configs/schema";
import TextAreaField from "./components/TextAreaField";
import IconFeild from "./components/IconFeild";
import UploadImages from "./components/UploadImages";
import { BiLoaderCircle } from "react-icons/bi";
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import moment from "moment"
import { eq } from "drizzle-orm";
import Service from "@/Shared/Service";

function AddListing() {
  const [formData, setFormData] = useState([]);
  const [featuresData,setFeaturesData]=useState([]);
  const [triggerUploadImages,setTriggerUploadImages]=useState()
  const[searchParams]=useSearchParams()
  const [loader,setLoader]=useState(false)
  const navigate=useNavigate()
  const[carInfo,setCarInfo]=useState()
  const {user}=useUser()

  const mode=searchParams.get('mode')
  const recordId=searchParams.get('id')

  useEffect(()=>{
    if(mode=='edit')
    {
      getListingDetail()
    }
  },[])

  const getListingDetail=async()=>{
    const result=await db.select().from(CarListing)
    .innerJoin(CarImages,eq(CarListing.id,CarImages.carListingId))
    .where(eq(CarListing.id,recordId))
    const resp=Service.FormatResult(result)
    setCarInfo(resp[0])
    setFormData(resp[0])
    setFeaturesData(resp[0]?.features)
  }


  


  // used to handle form inputs

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    console.log(formData);
  };

// used to save car feature which is selected


  const handleFeatureChange=(name,value)=>{
      setFeaturesData((prevData)=>({
        ...prevData,
        [name]:value
      }))

      console.log(featuresData)
  }

  

  const onSubmit = async (e) => {
    setLoader(true)
    e.preventDefault();
    console.log(formData);
    toast('Please Wait.....')


    if(mode=='edit'){
      const result=await db.update(CarListing).set({
        ...formData,
        features:featuresData,
        createdBy:user?.primaryEmailAddress?.emailAddress,
        postedOn:moment().format('DD/MM/YYYY')
      }).where(eq(CarListing.id,recordId)).returning({id:CarListing.id})
      console.log(result)
      navigate('/profile')
      setLoader(false)

    }else{

    
    try {
      const result = await db.insert(CarListing).values({
        ...formData,
        features:featuresData,
        createdBy:user?.primaryEmailAddress?.emailAddress,
        userName:user?.fullName,
        imageUrl:user?.imageUrl,

        postedOn:moment().format('DD/MM/YYYY')
      }).returning({id:CarListing.id});

      if (result) {
        console.log("Data Saved");
        setTriggerUploadImages(result[0]?.id)
        setLoader(false)
      }
    } catch (error) {
      console.log("Error", error);
    }
  }
  };

 

  return (
    <div>
      <Header />
      <div className="px-10 md:px-20 my-10">
        <h2 className="font-bold text-4xl">Add New Listing</h2>
        <form className="p-10 border rounded-xl mt-10">
          {/* Car Details */}
          <div>
            <h2 className="font-medium text-xl mb-6">Car Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {carDetails.carDetails.map((item, index) => (
                <div key={index}>
                  <label className="text-sm flex gap-2 items-center mb-2">
                    <IconFeild icon={item?.icon}/>
                    {item?.label} {item.required && <span className="text-red-600"> *</span>}
                  </label>

                  {item.fieldType == "text" || item.fieldType == "number" ? (
                    <InputFeild item={item}
                      handleInputChange={handleInputChange}
                      carInfo={carInfo}
                    />
                  ) : item.fieldType == "dropdown" ? (
                    <DropdownFeild item={item}
                      carInfo={carInfo}
                      handleInputChange={handleInputChange}
                    />
                  ) : item.fieldType == "textarea" ? (
                    <TextAreaField item={item}
                      carInfo={carInfo}
                      handleInputChange={handleInputChange}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-6" />
          {/* feature list */}

          <div>
            <h2 className="font-medium text-xl my-6">Feautures</h2>
            <div className="grid grid-cols-2 md:grid-cols-3">
              {features.features.map((item, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Checkbox 
                    onCheckedChange={(value) =>
                      handleFeatureChange(item.name, value)
                      
                    }
                    checked={featuresData?.[item.name]}
                  />
                  <h2>{item.label}</h2>
                </div>
              ))}
            </div>
          </div>

          {/* car Images */}
          <Separator className="my-6"/>
          <UploadImages triggerUploadImages={triggerUploadImages} 
          setLoader={(v)=>{setLoader(v);navigate('/profile')}} carInfo={carInfo} mode={mode}/>

          <div className="mt-10 flex justify-end">
            <Button disabled={loader} type="submit" onClick={(e) => onSubmit(e)}>
                {!loader?'Submit':<BiLoaderCircle className="animate-spin text-xl"/>}
            </Button>
          </div>
        </form>
      </div>
      
    </div>
  );
}

export default AddListing;
