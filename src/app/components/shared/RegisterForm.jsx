'use client'

import { registerUser } from '@/app/actions/auth/registerUser';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { FaUser, FaEnvelope, FaLock, FaUserPlus } from 'react-icons/fa';
import toast from 'react-hot-toast';


export default function RegisterForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(true);

    const handleSignUp = async (event) => {
        event.preventDefault();
        setLoading(true);
        
        const password = event.target.password.value;
        const confirmPassword = event.target.confirmPassword.value;

        if (password !== confirmPassword) {
            setPasswordMatch(false);
            toast.error('Passwords do not match!');
            setLoading(false);
            return;
        }

        setPasswordMatch(true);

        const newUser = {
            name: event.target.name.value,
            email: event.target.email.value,
            password: password,
            role: 'user'
        };

        try {
            const result = await registerUser(newUser);
            if (result.acknowledged) {
                Swal.fire({
                    title: "Registration Successful!",
                    text: "Your account has been created. Please login to continue.",
                    icon: "success",
                    confirmButtonText: "Go to Login"
                });
                event.target.reset();
                router.push("/login");
            } else {
                toast.error('Registration failed. Please try again.');
            }
        } catch (error) {
            toast.error('An error occurred during registration.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card bg-base-200 shadow-xl w-full max-w-md mx-auto">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-4 justify-center">Create Account</h2>
                <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold flex items-center gap-2">
                                <FaUser /> Full Name
                            </span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

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
                            placeholder="Create a password"
                            className="input input-bordered w-full"
                            required
                            minLength={6}
                        />
                        <label className="label">
                            <span className="label-text-alt text-gray-500">
                                Must be at least 6 characters
                            </span>
                        </label>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold flex items-center gap-2">
                                <FaLock /> Confirm Password
                            </span>
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            className={`input input-bordered w-full ${!passwordMatch ? 'input-error' : ''}`}
                            required
                            minLength={6}
                        />
                        {!passwordMatch && (
                            <label className="label">
                                <span className="label-text-alt text-error">
                                    Passwords do not match
                                </span>
                            </label>
                        )}
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
                                    Creating account...
                                </>
                            ) : (
                                <>
                                    <FaUserPlus /> Sign Up
                                </>
                            )}
                        </button>
                    </div>

                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <a href="/login" className="link link-primary font-semibold">
                                Sign in
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}
