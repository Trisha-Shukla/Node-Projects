import { sendVerificationEmail } from "../middleware/verification.js";
import Users from "../models/userModel.js";
import bcrypt from 'bcrypt'

export const registerUser=async(req,res)=>{
    console.log(req.body);
    
    const {name,userName,email,phone}=req.body;

    try {
        const userNameExist=await Users.findOne({userName})
        if(userNameExist) res.status(400).send({message:`User with username ${userName} already exist`})
        const emailExist=await Users.findOne({email})
        if(emailExist) res.status(400).send({message:`User with email ${email} already exist`})

       const password = await bcrypt.hash(req.body.password,10);  

       const newUser= new Users({name,userName,email,phone,password});
       await newUser.save();
       await sendVerificationEmail(email);
       return res.status(201).send({message:`User registered`})
    } catch (error) {
        res.status(500).send({message:`Error registering user ${error}`})
    }
    
}

export async function login(request, response) {
    const { userName, password } = request.body;
    console.log(request.body);
    
    try {
      // AUTHENTICATION
      //see if user exists
      const user = await Users.findOne({ userName });
      console.log(user);
      
  
      if (!user)
        return response.status(401).send({ message: "Incorrect credentials" });
  
      //see if emailisVerified
  
      if (!user.isEmailVerified)
        return response
          .status(403)
          .send({ message: "Please verify your email before logging in" });
  
      //see if passwords match
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch)
        return response.status(401).send({ message: "Incorrect credentials" });

      //AUTHORISATION
    // SESSION VARIABLE = TOKEN

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        username: user.userName,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    //Send it to frontend:
    //1. send it with response return response.status(200).send({token: token})
    //2. send the token as an HTTP cookie

    // Set cookie with JWT token
    response.cookie("token", token, {
      httpOnly: true, //no other JS script will be able to see this on frontend
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
  
    } catch (error) {
      return response.status(500).send({ message: error });
    }
  }


// http://localhost:5173//verify-email?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJ0c2h1a2xhMDI1QGdtYWlsLmNvbSIsImlhdCI6MTczMzU1OTQ2MywiZXhwIjoxNzMzNTYzMDYzfQ.1ZDZdtET-k9PFWIqZQ3BQLsPXVzU39meAiXcdojVCck