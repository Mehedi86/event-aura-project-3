'use client'

import React from 'react'
import { signIn } from "next-auth/react"
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


export default function LoginForm() {
    const router = useRouter();

    const handleLogin = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        toast("Submitting...")
        try {
            const response = await signIn("credentials", { email, password, callbackUrl: "/", redirect: false });

            if (response.ok) {
                toast.success("Logged In Successfully!!")
                router.push("/")
            }
            else {
                toast.error("Failed to login !!")
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to login !!")
        }
    };
    return (
        <form onSubmit={handleLogin} action="">
            <label htmlFor="email">Email</label> <br />
            <input
                type="text"
                name="email"
                placeholder="your email"
                className="mt-3 w-full input input-bordered"
            />
            <br /> <br />
            <label htmlFor="password">Password</label> <br />
            <input
                type="password"
                name="password"
                placeholder="your password"
                className="w-full mt-3 input input-bordered"
            />
            <br />
            <button
                type="submit"
                className="w-full btn btn-primary mt-12 text-lg"
            >
                Sign In
            </button>
        </form>
    )
}
