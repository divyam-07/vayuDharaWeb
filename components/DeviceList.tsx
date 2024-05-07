"use client";
import { db } from "@/firebase";
import { collection } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import NewChat from "./NewChat";
import DeviceRow from "./DeviceRow";

export default function DeviceList() {
  const { data: session } = useSession();
  // const {}
  // const [devices, setDevices] = useState("second")
  const [devices] = useCollection(
    session && collection(db, "users", session?.user?.email!, "devices")
  );
  console.log(devices);
  const router = useRouter();

  return (
    <>
      <div className="border-2 rounded-md mx-2 py-2">
        <div className="text-center">Devices</div>
        <div className="max-w-[425px] flex items-center justify-center px-6 py-4 flex-wrap gap-4">
          {devices?.docs.map((device) => {
            return <DeviceRow key={device.id} id={device.id} />;
          })}
        </div>
      </div>
    </>
  );
}
