"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";


export default function Profile() {
    const router = useRouter();
    const [data, setData] = useState("nothing")
    const [loading, setLoading] = useState(false);
    const onLogout = async () => {
        try {
            setLoading(true);
           const response = await axios.get("/api/users/logout");
           console.log(response);
           router.push("/login");
        } catch (error: any) { 
            console.log(error.message);
            toast.error(error);
        } finally {
            setLoading(false)
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data._id)
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1>{loading ? "Processing" : "Profile page"}</h1>
            <h2 className="p-1 rounded bg-green-500">{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}
            </Link>}</h2>
            <h3>Username</h3>
            <button className="border rounded-lg p-2 px-10 m-2 border-gray-800 bg-slate-700 text-white hover:bg-slate-900"
            onClick={onLogout}>Logout</button>

<button className="border rounded-lg p-2 px-10 m-2 border-gray-800 bg-purple-400 text-white hover:bg-Purple-900"
            onClick={getUserDetails}>User Data</button>

        </div>
    )
}