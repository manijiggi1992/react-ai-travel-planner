import React, { useEffect, useState } from "react";
import { Button } from "../button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";

function Header() {
  localStorage.setItem(
    "user",
    JSON.stringify({
      id: "106094951637756813849",
      email: "manibin92@gmail.com",
      verified_email: true,
      name: "Mani Bn",
      given_name: "Mani",
      family_name: "Bn",
      picture:
        "https://lh3.googleusercontent.com/a/ACg8ocLsaDu5WdgPSBfqOw53nV16dhMAIWpplu5Sq_7d35XasSoF_w=s96-c",
    })
  );

  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log("Header-user", user);
  }, []);

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
      });
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <img src="logo.svg" />
      <div>
        {user ? (
          <div className="flex gap-3">
            <a href="/create-trip">
              <Button className="rounded-full" variant="outline">
                + Create Trip
              </Button>
            </a>
            <a href="/my-trips">
              <Button className="rounded-full" variant="outline">
                My Trip
              </Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img
                  src={`https://images.weserv.nl/?url=${user?.picture}`}
                  className="h-[35px] w-[35px] rounded-full"
                />
              </PopoverTrigger>

              <PopoverContent>
                <h2
                  className="cursor-pointer"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Log Out
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign in</Button>
        )}
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
  );
}

export default Header;
