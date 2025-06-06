import { db } from "@/service/firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import PlacesToVisit from "../components/PlacesToVisit";
import Footer from "../components/Footer";

function Viewtrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState();

  useEffect(() => {
    tripId && getTripData();
  }, [tripId]);

  // getTripData method is used to get data from firebase
  const getTripData = async () => {
    const docRef = doc(db, "AITrips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document", docSnap.data()); //check sample response in public/firebase-data.R
      setTrip(docSnap.data());
    } else {
      console.log("No Data Found");
      toast("No Data Found");
    }
  };

  return (
    <div className="p-10 md:px-20  lg:px-44 xlg:px-56">
      {/* {Information Section} */}
      <InfoSection trip={trip}/>

      {/* {Recommened Hotels} */}
      <Hotels trip={trip}/>

      {/* {Daily Plan} */}
      <PlacesToVisit trip={trip}/>

      {/* {Footer} */}
      <Footer trip={trip}/>
    </div>
  );
}

export default Viewtrip;
