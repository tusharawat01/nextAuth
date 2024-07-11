import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";

export const sendEmail = async ({email, emailType, userId}:any) =>{

  try {

    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if(emailType === "VERIFY"){
      await User.findByIdAndUpdate(userId,{
        $set:{verifyToken: hashedToken, verifyTokenExpiry: new Date(Date.now() + 3600000)}
      })
       
    } else if(emailType === "RESET") {
      await User.findByIdAndUpdate(userId,{
        $set: {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: new Date(Date.now() + 3600000)}
      })
        
    }

    //Used Mailtrap fot this
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "b2db494c71eaca",
        pass: "f65a1b804ad3aa"
      }
    });

    const mailOptions = {
      from: "tushar@tushar.io",
      to: email, 
      subject: emailType === 'VERIFY' ? "Verify your email" : "Reset Your Password",
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "Reset your password"}or copy and paste the link below in your browser.
      <br>
      ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
      </p>`,
    }

    const mailResponse = await transport.sendMail(mailOptions);

    return mailResponse;
    
         
    } catch (error:any) {
        throw new Error(error.message)
    }
}