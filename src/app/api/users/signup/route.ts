import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";


connect();

export async function POST(request: NextRequest){
    try {
       const reqBody = await request.json();
       const { username, email, password } = reqBody;
        console.log(reqBody);

        //check if user exists
       const user = await User.findOne({email});

       if(user){
        return NextResponse.json({error: "User Already exist"},
            {status: 400})
       }

       //hashing the password
       const salt = await bcryptjs.genSalt(10)
       const hashPassword = await bcryptjs.hash(password, salt)

       //create a user
      const newUser = new User({
        username,
        email, 
        password: hashPassword,
       })

      const savedUser = await newUser.save()
      console.log(savedUser);

      return NextResponse.json({
        message: "User created Successfully",
        status: true,
        savedUser,
    })



    } catch (error: any) {
        return NextResponse.json({error: error.message},
            {status: 500})
    }
}
