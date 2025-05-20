import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

function CreateTrip() {
  const [place, setPlace] = useState();
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-56 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preferences</h2>
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
                console.log(v);
                //   {
                //     "label": "Mumbai, Maharashtra, India",
                //     "value": {
                //         "description": "Mumbai, Maharashtra, India",
                //         "matched_substrings": [
                //             {
                //                 "length": 3,
                //                 "offset": 0
                //             }
                //         ],
                //         "place_id": "ChIJwe1EZjDG5zsRaYxkjY_tpF0",
                //         "reference": "ChIJwe1EZjDG5zsRaYxkjY_tpF0",
                //         "structured_formatting": {
                //             "main_text": "Mumbai",
                //             "main_text_matched_substrings": [
                //                 {
                //                     "length": 3,
                //                     "offset": 0
                //                 }
                //             ],
                //             "secondary_text": "Maharashtra, India"
                //         },
                //         "terms": [
                //             {
                //                 "offset": 0,
                //                 "value": "Mumbai"
                //             },
                //             {
                //                 "offset": 8,
                //                 "value": "Maharashtra"
                //             },
                //             {
                //                 "offset": 21,
                //                 "value": "India"
                //             }
                //         ],
                //         "types": [
                //             "locality",
                //             "geocode",
                //             "political"
                //         ]
                //     }
                // }
              },
            }}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">How many days are you</h2>
          <Input placeholder={"Ex.3"} type="number" />
        </div>
      </div>
    </div>
  );
}

export default CreateTrip;
