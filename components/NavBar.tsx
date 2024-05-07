"use client";
import { signOut, useSession } from "next-auth/react";
import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@/firebase";
import { useRouter } from "next/navigation";
function NavBar() {
  // const { data: session } = useSession();
  const { data: session } = useSession();
  const [chats, loading, error] = useCollection(
    session && collection(db, "users", session.user?.email!, "chats")
  );
  const router = useRouter();
  // console.log(chats);
  return (
    <>
      <div className="p-2 flex justify-around items-center">
        <div
          className="text-[28px] font-bold cursor-pointer"
          onClick={() => {
            router.push("/");
          }}
        >
          VayuDhara
        </div>
        <div>
          {session && (
            <img
              onClick={() => {
                signOut();
              }}
              src={session.user?.image!}
              alt={session.user?.name! + " Profile Picture"}
              className="h-8 w-8 rounded-full cursor-pointer mx-auto  hover:opacity-50"
            />
          )}
        </div>
      </div>
    </>
  );
}

export default NavBar;
