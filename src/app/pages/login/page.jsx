"use client";
import LoginForm from "@/app/components/shared/LoginForm";
// import Image from "next/image";
import Link from "next/link";
import React from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import SocialSignin from "@/components/SocialSignin";

const Page = () => {
  // const router = useRouter();
  // const searchParams = useSearchParams();
  // const path = searchParams.get("redirect");

  return (
    <div className="container min-h-screen px-4 md:px-12 lg:px-24 mx-auto py-48 md:py-48">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          {/* <Image
            src="/img/login/login.jpg"
            height={540}
            width={540}
            alt="login image"
            className="w-full h-auto"
          /> */}
        </div>
        <div className="border-2 p-6 md:p-12">
          <h6 className="text-2xl md:text-3xl font-semibold text-primary text-center mb-6 md:mb-12">
            Sign In
          </h6>
          <LoginForm />
          <div>
            <h6 className="my-6 md:my-12 text-center">or sign in with</h6>
            {/* <SocialSignin /> */}
            <h6 className="my-6 md:my-12 text-center">
              Don’t have an account?{" "}
              <Link className="text-primary font-semibold" href={"/signup"}>
                Sign Up
              </Link>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
