import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelesList,
} from "@/constants/options";
import { chatSession } from "@/service/AIModal";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router";

const mock = true;

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onGenerateTrip = async () => {
    if (mock) {
      navigate(`/view-trip/1748168561951`);
      return;
    }

    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      formData?.noOfDays > 5 ||
      !formData?.location ||
      !formData.budget ||
      !formData.traveller
    ) {
      toast("Please fill all the details");
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{todalDays}", formData?.noOfDays)
      .replace("{traveller}", formData?.traveller)
      .replace("{budget}", formData?.budget)
      .replace("{todalDays}", formData?.noOfDays);

    console.log("FINAL_PROMPT", FINAL_PROMPT);

    const result = await chatSession(FINAL_PROMPT);
    let cleaned = result.candidates[0].content.parts[0].text; //check sample response in public/ai-prompt-response.R
    cleaned = cleaned.match(/```json\s*([\s\S]*?)```/)[1].trim();
    const json = JSON.parse(cleaned);
    console.log("AI Response", json);
    setLoading(false);
    saveAITrip(json);
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp), //check sample response in public/google-login-success.R
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https:///www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        console.log("GetUserProfile", resp); //check sample response in public/get-user-profile.R
        setOpenDialog(false);
        localStorage.setItem("user", JSON.stringify(resp.data));
        onGenerateTrip();
      });
  };

  const saveAITrip = async (tripData) => {
    setLoading(true);
    // Add a new document in collection "cities"
    const docId = Date.now().toString();
    const user = JSON.parse(localStorage.getItem("user"));

    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: tripData,
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate(`/view-trip/1748526404455`);
  };

  useEffect(() => {
    //console.log("formData", formData);
  }, [formData]);

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-56 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences 🏕️🌴
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is destination of choice?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v); //check sample response in public/google-autocomplete-response.R
              },
            }}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">How many days are you</h2>
          <Input
            placeholder={"Ex.3"}
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                  formData?.budget == item.title && "shadow-lg border-black"
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            Who do you plan on travelling with on your next adventure?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelesList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("traveller", item.people)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                  formData?.traveller == item.people && "shadow-lg border-black"
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className="my-10 justify-end flex">
          <Button disabled={loading} onClick={onGenerateTrip}>
            {loading ? (
              <AiOutlineLoading3Quarters className="w-7 h-7 animate-spin" />
            ) : (
              "Generate Trip"
            )}
          </Button>
        </div>

        <Dialog open={openDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <img src="/logo.svg" />
                <h2 className="font-bold text-lg- mt-7">Sign in with Google</h2>
                <h2>Sign in to the App with Google authentication securely</h2>
                <Button
                  className="w-full mt-5 flex gap-2 items-center"
                  onClick={login}
                >
                  <FcGoogle /> Sign in with Google
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default CreateTrip;
