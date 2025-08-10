"use client"

import { signIn } from "next-auth/react";
// import { signIn, useSession } from "next-auth/react";
// import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
// import toast from "react-hot-toast";
import { BsGithub, BsGoogle } from "react-icons/bs";

const SocialSignin = () => {
  // const router = useRouter()
  // const searchParams = useSearchParams()

  // const path = searchParams.get('redirect')
  // const session = useSession()

  const handleSocialLogin = async(provider) => {
    console.log("SOCIAL LOGIN", provider)
    const res = await signIn(provider, {redirect: false});
    console.log(result)
  }

  // useEffect(() => {
  //   if (session?.status == 'authenticated') {
  //     router.push("/");
  //     toast.success("User logged in successfully!!")
  //   }
  // }, [session?.status])



  return (
    <div className="flex items-center justify-center space-x-3">
      <button onClick={() => handleSocialLogin('google')} className="btn  flex items-center justify-center text-green-500">
        <BsGoogle />
      </button>

      <button onClick={() => handleSocialLogin('github')} className="btn  flex items-center justify-center text-primary">
        <BsGithub />
      </button>
    </div>
  );
};

export default SocialSignin;
