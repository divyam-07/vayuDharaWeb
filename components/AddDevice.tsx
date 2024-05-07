"use client";
import { db } from "@/firebase";
import {
  ChevronDoubleDownIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/16/solid";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

export default function AddDevice() {
  const { data: session } = useSession();
  const [purpose, setPurpose] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");

  const clearFields = () => {
    setPassword("");
    setPurpose("");
    setId("");
  };

  const addDevice = async () => {
    const docRef = doc(db, "users", session?.user?.email!, "devices", id);
    try {
      await setDoc(docRef, {
        userId: session?.user?.email!,
        createdAt: serverTimestamp(),
        name: purpose,
      });
      console.log("Device added with ID: ", id);
      alert("Device added successfully!");
    } catch (e) {
      console.error("Error adding device:", e);
      alert("Failed to add device.");
    }
  };

  const clickhandle = async (e: any) => {
    e.preventDefault();
    const deviceDoc = doc(db, "devices", id);

    try {
      const docSnapshot = await getDoc(deviceDoc);
      if (!docSnapshot.exists()) {
        alert("No document found!");
        clearFields();
        return;
      }

      const documentData = docSnapshot.data();
      if (password !== documentData.password) {
        alert("Wrong Password");
        clearFields();
        return;
      }

      await addDevice();
      window.location.reload();
      clearFields();
    } catch (error) {
      console.error("Error fetching document:", error);
      clearFields();
    }
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <div
        className="flex justify-center space-x-3 items-center cursor-pointer transition-all duration-500"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <div>Add Device</div>
        {!isOpen ? (
          <ChevronDownIcon className="h-4 w-4" />
        ) : (
          <ChevronUpIcon className="h-4 w-4" />
        )}
      </div>
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } max-w-[425px] mt-2 bg-white  border border-gray-300 rounded-lg mx-2 p-4 shadow-lg  mb-4`}
      >
        <form onSubmit={clickhandle} className="space-y-4">
          <div>
            <label
              htmlFor="id"
              className="block text-sm font-medium text-gray-700"
            >
              Device ID:
            </label>
            <input
              type="text"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="purpose"
              className="block text-sm font-medium text-gray-700"
            >
              Name:
            </label>
            <input
              type="text"
              id="purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Device
          </button>
        </form>
      </div>
    </>
  );
}
