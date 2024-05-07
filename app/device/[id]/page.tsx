"use client";
import { db } from "@/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  params: {
    id: string;
  };
};

function ChatPage({ params: { id } }: Props) {
  console.log(id);
  const router = useRouter();
  const [CO, setCO] = useState(0);
  const [PM2_5, setPM2_5] = useState(0);
  const [AQI, setAQI] = useState(0);
  const [state, setState] = useState<boolean>();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchData();
  }, [session]);
  const fetchData = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, "devices", id as string);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        const documentData = docSnapshot.data();
        setAQI(documentData.AQI);
        setPM2_5(documentData.PM2_5);
        setCO(documentData.CO);
        setState(documentData.IonGeneratorState);
        setLoading(false);
      } else {
        console.log("No document found!");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
      alert("Something went wrong");
      router.push("/");
    }
  };
  const getBgColor = (val: number) => {
    if (val <= 50) return "bg-green-500";
    if (val <= 100) return "bg-yellow-500";
    if (val <= 150) return "bg-orange-500";
    if (val <= 200) return "bg-red-500";
    if (val <= 330) return "bg-purple-500";
    return "bg-brown-500";
  };
  const handleToggle = async () => {
    const docRef = doc(db, "devices", id as string);
    try {
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const documentData = docSnapshot.data();
        const newState = !documentData.IonGeneratorState; // Toggle the IonGeneratorState

        // Update the document in Firestore
        await updateDoc(docRef, {
          IonGeneratorState: newState,
        });

        // Update local state
        setState(newState);
      } else {
        console.log("No document found!");
        router.push("/");
      }
    } catch (error) {
      console.error("Error fetching or updating document:", error);
      // Handle errors like network issues or permissions errors
    }
  };
  return (
    <>
      {loading === false ? (
        <div className=" mx-auto max-w-[425px] p-4">
          <div
            className={`h-24 w-full items-center justify-center flex my-2 rounded-md ${getBgColor(
              AQI
            )}`}
          >
            <div>AQI-{AQI}</div>
          </div>
          <div className="flex gap-2">
            <div
              className={`h-24 w-full flex items-center justify-center rounded-md ${getBgColor(
                PM2_5
              )}`}
            >
              <div>PM2.5-{PM2_5}</div>
            </div>
            <div
              className={`h-24 w-full flex items-center justify-center rounded-md ${getBgColor(
                CO
              )}`}
            >
              <div>CO-{CO}</div>
            </div>
          </div>
          <div className="flex items-center  my-2 gap-2 justify-between px-10">
            <div>{state ? "Ion generator ON" : "Ion generator OFF"}</div>
            <div
              className={`relative w-14 h-8  rounded-full cursor-pointer ${
                state ? "bg-green-500" : "bg-gray-300"
              }`}
              onClick={handleToggle}
              style={{ transition: "background-color 0.3s ease" }}
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transform ${
                  state ? "translate-x-6" : "translate-x-0"
                }`}
                style={{ transition: "transform 0.3s ease" }}
              ></div>
            </div>
          </div>
        </div>
      ) : (
        <Skeleton />
      )}
    </>
  );
}

export default ChatPage;
const Skeleton = () => {
  return (
    <div className=" mx-auto max-w-[425px] p-4">
      <div
        className={`h-24 w-full items-center justify-center flex my-2 rounded-md bg-gray-500 animate-pulse`}
      ></div>
      <div className="flex gap-2">
        <div
          className={`h-24 w-full flex items-center justify-center rounded-md bg-gray-500 animate-pulse `}
        ></div>
        <div
          className={`h-24 w-full flex items-center justify-center rounded-md bg-gray-500 animate-pulse `}
        ></div>
      </div>
      <div className="flex items-center  my-2 gap-2 justify-between px-10">
        <div>{"Ion generator OFF"}</div>
        <div
          className={`relative w-14 h-8  rounded-full cursor-pointer ${"bg-gray-300"}`}
          style={{ transition: "background-color 0.3s ease" }}
        >
          <div
            className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transform ${"translate-x-0"}`}
            style={{ transition: "transform 0.3s ease" }}
          ></div>
        </div>
      </div>
    </div>
  );
};
