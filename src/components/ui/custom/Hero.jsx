import React from "react";
import { Button } from "../button";
import { Link } from "react-router";

function Hero() {
  return (
    <div className="flex items-center mx-56 gap-9">
      <h1 className="font-extrabold text-[60px] text-center mt-16">
        <span className="text-[#f56551]">
          Discover Your Next Adventure with Al:
        </span>{" "}
        Personalized Itineraries at Your Fingertips
        <p className="text-xl text-gray-500 text-center">
          Your personal trip planner and travel curator, creating custom
          itineraries tailored to your interests and budget.
        </p>
        <Link to={"/create-trip"}>
          <Button>Get Started, It's Free</Button>
        </Link>
      </h1>
    </div>
  );
}

export default Hero;
