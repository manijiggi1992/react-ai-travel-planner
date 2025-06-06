import { Button } from "@/components/ui/button";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { BsFillSendFill } from "react-icons/bs";

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };

    await GetPlaceDetails(data).then((resp) => {
      console.log("GetPlacePhoto", resp.data); //check sample response in public/Google-Photo-Api.R

      const getPhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[3].name
      );
      console.log("photoUrl", getPhotoUrl); //https://places.googleapis.com/v1/places/ChIJ0X31pIK3voARo3mz1ebVzDo/photos/AXQCQNRfolbr83E8v39Z9Elc21Vr26pTSN33QRZeUBWmgrDnupjh_ajkDTBaOuB9U0Z54_uasJMH26e6X2-tDN-JBkXI7VNsgxz_5N6TP_MDCgYp9JLfBmyYLpBWJNClTsFLoleuel1mC5XzeGPqn7BQI1lkwVdfVzo3DJ-vf_37p_3Wc4DU1shyG6iG3XJxuSZqTZf6omVrIklVJpQ7DfyjYFPR5shHUnY4UZlKKLh714bmM5zFXmDq-cS-0Jxpro55etg9tpFJDIZFqDnI5euSGVNo9ZovpsjivhIO-hv3fLMvMneX8jhF0NkHzE6F6eWdNSDxTb8VkkPbKaW-OSw_wJ9MG2IS6bfO58IPbqC6xDRNXZuO4orPVWcgro2jtxcydT81xuU9SHxqzVOHvqR4vrm7hE2kXiu5sCgEQdCBKx8/media?maxHeightPx=1000&maxWidthPx=1000&key=AIzaSyCF_I1XzKaR2xtxyOPc3n7ce3Sj1BYyTic

      setPhotoUrl(getPhotoUrl);
    });
  };

  return (
    <div>
      <img
        src={photoUrl?`https://images.weserv.nl/?url=${encodeURIComponent(photoUrl)}`:'/placeholder.jpg'} //image proxy service to resolve cors issue
        className="h-[340px] w-full object-cover rounded-xl object-bottom"
      />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location?.label}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs lg:text-lg">
              📅 {trip?.userSelection?.noOfDays} Day
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs lg:text-lg">
              💰 {trip?.userSelection?.budget} Bugget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs lg:text-lg">
              🥂 {trip?.userSelection?.traveller} Traveller
            </h2>
          </div>
        </div>
        <Button>
          <BsFillSendFill />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;
