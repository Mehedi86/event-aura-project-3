'use server'

import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcrypt"

export const loginUser = async(payload) => {
    const { email, password } = payload;
    const userCOllection = dbConnect('users');
    const user = await userCOllection.findOne({ email });
    if(!user) return null;
    const isPasswordOk = bcrypt.compare(user.password, password);
    if(!isPasswordOk) return null;

    return user;
}