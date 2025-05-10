"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function loginPage(){
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const [disabledBtn, setDisabledBtn] = useState(false);
    const [loading, setLoading] = useState(false)

    const onLogin = async () =>{
        try {
            setLoading(true);
           const response = await axios.post("/api/users/login", user);
           console.log("Login successful", response.data)
            router.push("/profile")
        } catch (error: any) {
            console.log("Login Failed", error)
            toast.error(error.message)
        } finally {
            setLoading(false);
        }

    }
useEffect(() =>{
    if(user.email.length > 0 && user.password.length > 0){
        setDisabledBtn(false);
    } else{
        setDisabledBtn(true);
    }

}, [user])

    return(
        <div className="flex flex-col items-center justify-center min-h-screen ">
            <h1 className="text-center text-2xl p-2">{loading ? "Processing" : "Login"}</h1>
            <hr />
<label className="items-start text-black" htmlFor="email">Email:</label>
            <input className="p-4 border border-gray-300 rounded-lg "
                id="email"
                type="text" 
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="email"
            />

<label htmlFor="password">Password:</label>
            <input className="p-4 border border-gray-300 rounded-lg "
                id="password"
                type="password" 
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="Password"
            />
    <button className="border rounded-lg p-2 px-10 m-2 border-gray-800 bg-slate-700 text-white hover:bg-slate-900" 
        onClick={onLogin}
    >{disabledBtn ? "No Login" : "Login"}</button>
    <Link href="/signup" className="hover:text-gray-500 text-lg">Already have account? Visit signup</Link>

        </div>

        
    )
}