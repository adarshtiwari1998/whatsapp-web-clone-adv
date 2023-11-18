import { auth } from "@/utils/FirebaseConfig";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import { useRouter } from "next/router";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";

function Login() {
  const router = useRouter();

  const [{}, dispatch] = useStateProvider();

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName: name, email, photoURL: profileImage, metadata },
    } = await signInWithPopup(auth, provider);
    try {
      console.log("Profile Image URL:", profileImage); // Log the profile image URL
      
      if (email) {
        const { data } = await axios.post(CHECK_USER_ROUTE, { email });
        console.log({ data });

        if (!data.status) {
          dispatch({ type: reducerCases.SET_NEW_USER, newUser: true });
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              name,
              email,
              profileImage,
              metadata, 
              status: "",
            },
          });
          router.push("/onboarding");
        }
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
    }
  };

  // try {
  //   const provider = new GoogleAuthProvider();
  //   provider.addScope('profile');
  //   provider.addScope('email');
  //   const { user } = await signInWithPopup(auth, provider);

  //   setUserInfo(user);

  //   // Fetch user's country information based on IP address
  //   const response = await fetch('http://ip-api.com/json/');
  //   const data = await response.json();
  //   setUserCountry(data.country);
  // } catch (error) {
  //   console.error("Error occurred during login:", error);
  // }

  // function Login() {
  //   const [userInfo, setUserInfo] = useState(null);
  //   const [userCountry, setUserCountry] = useState(null);

  //   const handleLogin = async () => {
  //     try {
  //       const provider = new GoogleAuthProvider();
  //       provider.addScope('profile');
  //       provider.addScope('email');
  //       const { user } = await signInWithPopup(auth, provider);

  //       setUserInfo(user);

  //       // Fetch user's country information based on IP address
  //       const response = await fetch('http://ip-api.com/json/');
  //       const data = await response.json();
  //       setUserCountry(data.country);
  //     } catch (error) {
  //       console.error("Error occurred during login:", error);
  //       // Handle the error
  //     }
  //   };

  // useEffect(() => {
  //   if (userInfo) {
  //     console.log("User Info:", userInfo);
  //   }
  // }, [userInfo]);

  // const getLocalTime = (utcTimeString) => {
  //   const utcTime = new Date(utcTimeString);
  //   return utcTime.toLocaleString(undefined, { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });
  // };

  return (
    <div className="flex justify-center items-center bg-panel-header-background h-screen w-screen flex-col gap-6 ">
      <div className="flex items-center justify-center gap-2 text-white">
        <Image src="/whatsapp.gif" alt="whatsapp" height={300} width={300} />
        <span className="text-7xl">Whatsapp</span>
      </div>
      <button
        className="flex items-center justify-center gap-7 bg-search-input-container-background p-5 rounded-lg"
        onClick={handleLogin}
      >
        <FcGoogle className="text-4xl" />
        <span className="text-white text-2xl">Login with Google</span>
      </button>
    </div>
  );
}

export default Login;
