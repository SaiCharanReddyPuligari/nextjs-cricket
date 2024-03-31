import { connect } from "@/dbCongif/dbConfig";
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs'
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody
        //validation is required
        console.log((reqBody));

        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error:"User already exists"}, {status: 400})
        }
        
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        const newUser= new User({
            username, 
            email,
            password: hashPassword
        })

        const saveNewUser= await newUser.save()
        console.log(saveNewUser);
        
        //send verification email

        await sendEmail({email, emailType:"VERIFY", userId: saveNewUser._id});
        return NextResponse.json({
            message: "User registered successfully",
            success: true,
            saveNewUser,
        })

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}
