'use client'

import React, { useState } from 'react'
import { signIn } from "next-auth/react"
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';


export default function LoginForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        const email = event.target.email.value;
        const password = event.target.password.value;
        
        try {
            const response = await signIn("credentials", { 
                email, 
                password, 
                callbackUrl: "/", 
                redirect: false 
            });

            if (response.ok) {
                toast.success("Logged in successfully!");
                router.push("/");
            } else {
                toast.error("Invalid email or password. Please try again.");
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to login. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card bg-base-200 shadow-xl w-full max-w-md mx-auto">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-4 justify-center">Sign In</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold flex items-center gap-2">
                                <FaEnvelope /> Email Address
                            </span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold flex items-center gap-2">
                                <FaLock /> Password
                            </span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            className="input input-bordered w-full"
                            required
                        />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">
                                Forgot password?
                            </a>
                        </label>
                    </div>
                    
                    <div className="form-control mt-6">
                        <button
                            type="submit"
                            className="btn btn-primary w-full gap-2"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="loading loading-spinner"></span>
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    <FaSignInAlt /> Sign In
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
