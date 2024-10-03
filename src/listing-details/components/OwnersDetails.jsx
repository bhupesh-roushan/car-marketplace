import React from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import Service from "@/Shared/Service";
import { useNavigate } from "react-router-dom";
function OwnersDetails({ carDetail }) {
  const { user } = useUser();

  const navigation=useNavigate()
  const onMessageOwnerButtonClick = async () => {
    const userId = user?.primaryEmailAddress?.emailAddress.split("@")[0];
    const ownerUserId=carDetail?.createdBy.split('@')[0]
    // current user id
    try {
     
      await Service.CreateSendBirdUser(
        userId,
        user?.fullName,
        user?.imageUrl
      ).then((resp) => {
        console.log(resp);
      });
    } catch (error) {
      console.log(error);
    }
    // owner user id
    try {
      
      await Service.CreateSendBirdUser(ownerUserId,carDetail?.userName,carDetail?.userImageUrl
      ).then((resp) => {
        console.log(resp);
      });
    } catch (error) {
      console.log(e)
    }
    //create  channel
    try {
      await Service.CreateSendBirdChannel([userId,ownerUserId],carDetail?.listingTitle)
      .then(resp=>{
        console.log(resp)
        navigation('/profile')
      })
    } 
    catch (error) {
      console.log(error)
    }
  };
  return (
    <div className="p-10 border rounded-xl shadow-md mt-7">
      <h2 className="font-medium text-2xl mb-3">Owner Details</h2>
      <img
        src={carDetail?.userImageUrl}
        className="w-[70px] h-[70px] rounded-full"
      />
      <h2 className="mt-2 font-bold text-xl">{carDetail?.userName}</h2>
      <h2 className="mt-2 text-gray-500">{carDetail?.createdBy}</h2>
      <Button onClick={onMessageOwnerButtonClick} className="w-full mt-6">
        Message Owner
      </Button>
    </div>
  );
}

export default OwnersDetails;
