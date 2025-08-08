// import { registerUser } from '@/app/actions/auth/registerUser';
import React from 'react'
// import Swal from 'sweetalert2';

export default function RegisterForm() {
    const handleSignUp = async (event) => {
        event.preventDefault();
        const newUser = {
            name: event.target.name.value,
            email: event.target.email.value,
            password: event.target.password.value,
        };
        console.log(newUser)

        //     const result = await registerUser(newUser);
        //     if (result.acknowledged) {
        //         Swal.fire({
        //             title: "Drag me!",
        //             icon: "success",
        //             draggable: true
        //         });
        //         event.target.reset();
        //     }
    };

    return (
        <form onSubmit={handleSignUp} action="">
            <label htmlFor="email">Name</label> <br />
            <input
                type="text"
                name="name"
                placeholder="your name"
                className="mt-3 w-full input input-bordered"
            />
            <br /> <br />
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
                Sign Up
            </button>
        </form>
    )
}
