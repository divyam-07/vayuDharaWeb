import { db } from "@/firebase";
import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  collection,
  deleteDoc,
  orderBy,
  query,
  doc,
  getDoc,
} from "firebase/firestore";
import iotImage from "@/assets/images/iotImage.webp";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
type Props = {
  id: string;
};
function DeviceRow({ id }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [data, setData] = useState<any>();
  const messages = useCollection(
    query(
      collection(db, "users", session?.user?.email!, "devices", id, "name")
      // orderBy("createdAt", "asc")
    )
  );
  const docRef = doc(
    db,
    "users",
    session?.user?.email!,
    "devices",
    id as string
  );

  // Fetch the document
  getDoc(docRef)
    .then((docSnapshot) => {
      if (docSnapshot.exists()) {
        const documentData = docSnapshot.data();
        setData(documentData);
        // console.log(documentData.name);
      } else {
        console.log("No document found!");
      }
    })
    .catch((error) => {
      console.error("Error fetching document:", error); // Error handling
    });
  const removeChat = async () => {
    await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id));
    router.push("/");
  };
  const [active, setActive] = useState(false);
  return (
    // <></>
    <Link
      href={`/device/${id}`}
      className={`DeviceRow relative justify-center items-center hover:scale-[1.01]  shadow-lg transition-all duration-300 ${
        active && "scale-[5]"
      }`}
      onClick={() => {
        setActive(true);
      }}
    >
      <div className="relative ">
        <Image
          src={iotImage}
          alt={"imageIot"}
          className="rounded-lg opacity-80 animate-pulse"
          height={144}
          width={288}
        />
        <div className="absolute inset-0 flex items-center justify-center ">
          <span className="text-black text-lg font-bold animate-pulse">
            {data?.name}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default DeviceRow;
