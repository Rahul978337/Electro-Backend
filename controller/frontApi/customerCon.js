
const statuscode= require("http-status-codes");
const bcrypt=require("bcrypt");

const user=require("../../models/userModels");
const jsonwebtoken=require("jsonwebtoken")  
const sendMail=require("../../middleware/sendMail")


module.exports.registerUser=async(req,res)=>{
    try{
        const{first_name,last_name,address,role,email,password,mobile}=req.body;
        const finduser=await user.findOne({email})
        if(finduser){
            res.json({
                status:statuscode.BAD_REQUEST,
            sucess:false,
            message:"email alerdy exist in our database"
         })
        }else{
            const saltRounds=10;
            const hashpassword=await bcrypt.hash(password,saltRounds)
            
        
            const userData={
                first_name:first_name,
                last_name:last_name,
                email:email,
                password:hashpassword,
                mobile:mobile,
                address:address,
                role:role,
                image: req.file ? req.file.filename : null
            }
            // console.log('Data',userData)

            const adduser=await user.create(userData)
            await adduser.save()

//             try {
//     await sendMail({
//         email: adduser.email,
//         subject: "User Registration",
//         message: `Dear ${adduser.first_name}`,
//         html: `<p>Dear ${adduser.first_name}</p>`
//     });
// } catch (err) {
//     console.log("Mail Error:", err.message);
// }


            if(adduser){
                res.json({
                    status:statuscode.OK,
                    sucess:true,
                    message:"user register sucessfully",
                    data:adduser
                })
            }
        }
    }catch(error){
    console.log(error);

    return res.json({
        status: 500,
        success: false,
        message: error.message
    });
}
}


module.exports.loginuser = async (req, res) => {
  console.log("JWT_SECRET =", process.env.JWT_SECRET);
  try {
    const { email, password } = req.body;

    

    const finduser = await user.findOne({ email,status:true })
    if (!finduser) {
      return res.json({
        status: statuscode.BAD_REQUEST,
        success: false,
        message: "User not found: signup first"
      });
    }

    const passEqual = await bcrypt.compare(password, finduser.password);
    if (!passEqual) {
      return res.json({
        status: statuscode.BAD_REQUEST,
        success: false,
        message: "Wrong password"
      });
    }
    const token = jsonwebtoken.sign(
  { email: email, password: password },
  process.env.JWT_SECRET,
  { expiresIn: "12h" }
);

    // await sendMail({
    //             email: finduser.email,
    //             subject: "User Login",
    //             message: `Dear ${finduser.first_name} ${finduser.last_name},\n\nThank you for logging in with us! Your account has been successfully accessed.\n\nBest regards,\nelectro.com Team`,
    //             html: `<p>Dear ${finduser.first_name} ${finduser.last_name},</p><p>Thank you for logging in with us! Your account has been successfully accessed.</p><p>Best regards,<br>electro.com Team</p>`
    //         });

try {
  await sendMail({
    email: finduser.email,
    subject: "User Login",
    message: "...",
    html: "..."
  });
} catch (err) {
  console.log("Mail Error:", err.message);
}
    


    return res.json({
      status: statuscode.OK,
      success: true,
      message: "User login successfully",
      data: finduser,
      token: token
    });

  } catch (error) {
    return res.json({
      status: statuscode.BAD_REQUEST,
      success: false,
      message: error.message
    });
  }
};
