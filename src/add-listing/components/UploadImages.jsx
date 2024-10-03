import React, { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./../../../configs/firebaseConfig";
import { db } from "./../../../configs";
import { CarImages } from "./../../../configs/schema";
import { eq } from "drizzle-orm";

function UploadImages({triggerUploadImages,setLoader,carInfo,mode}) {
  const [selectedFileList, setSelectedFileList] = useState([]);
  const[editCarImageList,setEditCarImageList]=useState([])

  useEffect(()=>{
    if(mode=='edit')
    {
        setEditCarImageList([])
        carInfo?.images.forEach((image)=>{
        setEditCarImageList(prev=>[...prev,image?.imageUrl])

      })
    }
  },[carInfo])




    useEffect(()=>{
        if(triggerUploadImages){
            UploadImageToServer()
        }
    },[triggerUploadImages])
  const onFileSelected = (event) => {
    const files = event.target.files;
    for (let i = 0; i < files?.length; i++) {
      const file = files[i];
      setSelectedFileList((prev) => [...prev, file]);
    }
  };

  const onImageRemove = (image, index) => {
    const result = selectedFileList.filter((item) => item != image);
    setSelectedFileList(result);
  };
  const onImageRemoveFromDb=async (image,index)=>{
      const result=await db.delete(CarImages).where(eq(CarImages.id,carInfo.images[index].id)).returning({id:CarImages.id})
      const imageList=editCarImageList.filter(item=>item!=image)
      setEditCarImageList(imageList)
  }

  const UploadImageToServer = async () => {
    setLoader(true)
      selectedFileList.forEach(async(file) => {
      const fileName = Date.now() + ".jpeg";
      const storageRef = ref(storage, "car-marketPlace/" + fileName);
      const metaData = {
        contentType: "image/jpeg",
      };
     await uploadBytes(storageRef, file, metaData).then((snapShot)=>{
          console.log("Uploaded File");
        }).then((resp) => {
          getDownloadURL(storageRef).then(async(downloadUrl) => {
            console.log(downloadUrl);
            await db.insert(CarImages).values({
                    imageUrl:downloadUrl,
                    carListingId:triggerUploadImages,
            })
          });
        });
        setLoader(false)
    });
  };

  return (
    <div>
      <h2 className="font-medium text-xl my-3">Upload Car Images</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5 ">

        {mode=='edit'&&editCarImageList.map((image, index) => (
          <div key={index}>
            <IoMdCloseCircle
              className="absolute m-2 text-lg text-white"
              onClick={() => onImageRemoveFromDb(image, index)}
            />
            <img
              src={image}
              className="w-full h-[130px] object-cover rounded-xl "
              alt=""
            />
          </div>
        ))}



        {selectedFileList.map((image, index) => (
          <div key={index}>
            <IoMdCloseCircle
              className="absolute m-2 text-lg text-white"
              onClick={() => onImageRemove(image, index)}
            />
            <img
              src={URL.createObjectURL(image)}
              className="w-full h-[130px] object-cover rounded-xl "
              alt=""
            />
          </div>
        ))}

        <label htmlFor="upload-images">
          <div className="border rounded-xl border-dotted border-primary bg-blue-100 p-10 cursor-pointer hover:shadow-lg">
            <h2 className="text-lg text-center text-primary">+</h2>
          </div>
        </label>
        <input
          type="file"
          multiple={true}
          id="upload-images"
          onChange={onFileSelected}
          className="opacity-0"
        />
      </div>
    </div>
  );
}

export default UploadImages;
