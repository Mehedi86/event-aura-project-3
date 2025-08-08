"use client"

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

  const handleSocialLogin = (provider) => {
    // signIn(provider)
  }

  // useEffect(() => {
  //   if (session?.status == 'authenticated') {
  //     router.push("/");
  //     toast.success("User logged in successfully!!")
  //   }
  // }, [session?.status])
  // onClick={() => handleSocialLogin('google')}
  // onClick={() => handleSocialLogin('github')}

  return (
    <div className="flex items-center justify-center space-x-3">
      <button  className="btn  flex items-center justify-center text-green-500">
        <BsGoogle />
      </button>

      <button  className="btn  flex items-center justify-center text-primary">
        <BsGithub />
      </button>
    </div>
  );
};

export default SocialSignin;
