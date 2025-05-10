"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function signupPage(){
    const router = useRouter();
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    })
    const [disabledBtn, setDisabledBtn] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSignup = async () =>{
        try {
            setLoading(true);
          const response = await axios.post("/api/users/signup", user);
          console.log("signedup successfully", response.data);
          router.push("/login");
            
        } catch (error: any) {
            console.log("Signup failed",error.message)
           toast.error(error.message)
        }finally{
            setLoading(false);
        }
    }
    useEffect(() =>{
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setDisabledBtn(false);
        } else{
            setDisabledBtn(true);
        }
    }, [user])

    return(
        <div className="flex flex-col items-center justify-center min-h-screen ">
            <h1 className="text-center text-2xl p-2">{loading ? "processing" : "Signup"}</h1>
            <hr />
            <label htmlFor="username">Username:</label>
            <input className="p-4 border border-gray-300 rounded-lg "
                id="username"
                type="text" 
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
                placeholder="Username"
            />

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
    <button className="p-2 px-10 m-2 border border-gray-800 bg-slate-700 text-white rounded-lg hover:bg-slate-900" 
        onClick={onSignup}
    >{disabledBtn ? "No Signup" : "Signup"}</button>
    <Link href="/login" className="hover:text-gray-500 text-lg">Already have account? Visit login</Link>

        </div>

        
    )
}