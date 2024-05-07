"use client";
import { signIn } from "next-auth/react";
function Login() {
  return (
    <>
      <div className="bg-[#161161] h-screen flex flex-col items-center justify-center text-center space-y-10">
        <div className="text-white font-bold text-[40px]">vayuDhara</div>
        <button
          className="text-white font-bold text-3xl animate-pulse"
          onClick={() => signIn("google")}
        >
          Get Started
        </button>
      </div>
    </>
  );
}

export default Login;
