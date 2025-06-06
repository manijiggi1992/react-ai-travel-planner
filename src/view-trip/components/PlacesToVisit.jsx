import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
  //console.log("trip", Object.entries(trip?.tripData?.itinerary));
  return (
    <div>
      <h2 className="font-bold text-lg">Places to Visit</h2>
      <div className="mt-2">
        {Object.entries(trip?.tripData?.itinerary || {}).map(([key, value]) => (
          <div>
            <h2 className="font-medium text-lg">{key}</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {(value?.plan || value?.activities)?.map((place) => (
                <div className="my-3 p-5">
                  <h2 className="font-medium text-sm text-orange-600">
                    {place?.time || place?.travelTime || place?.timeToTravel}
                  </h2>
                  <PlaceCardItem place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
