import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10); //generating and hasing the verifytoken //you can also use UUID pacakge for this
    //configure mail for usage
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000,
      });
    }
    else if(emailType=== "RESET"){
        await User.findByIdAndUpdate(userId, {
            forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000,
          });
    }

    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "1013952500c55c", //need verification
          pass: "240f11207ac6f1"//need verification
        }
      });

    const mailOptions = {
      from: "reddy@gmail.com", // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "verify your email" : "reset your password", // Subject line
      // text: "Hello world?", // plain text body
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token = ${hashedToken}"> here</a> to
             ${emailType === "VERIFY"? "verify your email" : "reset your password"} 
             or copy and paste the line below in the browser. <br>
             ${process.env.DOMAIN}/verifyemail?token = ${hashedToken}
              </p>`, // html body
    };
    const mailRepsonse = await transporter.sendMail(mailOptions);
  } catch (error: any) {
    //if you are not sure of type, use any, but always prefer using the dedicated type
    throw new Error(error.message);
  }
};
