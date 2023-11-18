import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useStateProvider } from "@/context/StateContext";

function Onboarding() {
  const [{ userInfo }] = useStateProvider();
  const [creationTime, setCreationTime] = useState(null);
  const [lastLoginTime, setLastLoginTime] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (userInfo && userInfo.metadata) {
      setCreationTime(formatTime(userInfo.metadata.creationTime));
      setLastLoginTime(formatTime(userInfo.metadata.lastSignInTime));
      // Fetch and set user location here if necessary
    }
  }, [userInfo]);

  useEffect(() => {
    console.log("Photo URL:", userInfo?.photoURL);
  }, [userInfo]);

  const formatTime = (utcTimeString) => {
    const utcTime = new Date(utcTimeString);
    return utcTime.toLocaleString(undefined, { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });
  };

  return (
    <div className="bg-panel-header-background h-screen w-screen text-white flex flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-2">
        <Image src="/whatsapp.gif" alt="whatsapp" height={300} width={300} />
        <span className="text-7xl">Whatsapp</span>
      </div>
      <h2 className="text-2xl">Create your profile</h2>
      <div className="flex gap-6 mt-6">
        <div className="flex flex-col items-center justify-center mt-5 gap-6">
        {userInfo && (
            <div className="text-white">
              <h2>User Info:</h2>
              {userInfo.profileImage && (
                <div className="profile-image">
                  <img src={userInfo.profileImage} alt="Profile Image" width={60} height={60} />
                </div>
              )}
              <p>Name: {userInfo.displayName || userInfo.name}</p>
              <p>Email: {userInfo.email}</p>
              {creationTime && <p>Creation Time: {creationTime}</p>}
              {lastLoginTime && <p>Last Login At: {lastLoginTime}</p>}
              {userLocation && <p>User Location: {userLocation}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
