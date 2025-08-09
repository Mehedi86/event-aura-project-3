"use client";

import RegisterForm from "@/app/components/shared/RegisterForm";
import SocialSignin from "@/app/components/shared/SocialSignin";
import Link from "next/link";
import React from "react";

const SignUpPage = () => {
  return (
    <div className="min-h-[1000px] px-4 md:px-12 lg:px-24 mx-auto pt-48 md:pt-48 bg-[url('/img/login/login.jpg')] bg-center bg-cover bg-no-repeat">
      <div className="border-2 p-6 md:p-12 bg-white w-full md:w-1/3 mx-auto">
        <h6 className="text-2xl md:text-3xl font-semibold text-primary text-center mb-6 md:mb-12">
          Register
        </h6>
        <RegisterForm />
        <div>
          <h6 className="my-6 text-center">or sign in with</h6>
          <SocialSignin />
          <h6 className="my-6 text-center">
            Already have an account?{" "}
            <Link className="text-primary font-semibold" href={"/login"}>
              Sign In
            </Link>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
