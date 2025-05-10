import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest){
    try {
       const reqBody = await request.json();
       const {email, password} = reqBody;
        
        // check if user exists 
      const user = await User.findOne({email})

      if(!user){
        return NextResponse.json({error: "User does not exist"}, {status: 400})
      }

    // check if the password is correct
    const validatePassword = await bcryptjs.compare(password, user.password)
    if(!validatePassword){
        return NextResponse.json({error: "Password is not correct"}, {status: 400})
      }

      // create token data
      const tokenData = {
        id: user._id,
        username: user.username,
        email: user.email,

      }
      console.log("user Id", user._id);
      //create token
   const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "30d"})

console.log("token generated successfully",token);
     //create the response
     const response = NextResponse.json({
        message: "Login Successful",
        success: true
     })
     console.log("this is my response", response);
     response.cookies.set("token", token, {
        httpOnly: true,
     })
     return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}