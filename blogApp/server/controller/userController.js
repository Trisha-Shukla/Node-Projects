import { sendVerificationEmail } from "../middleware/verification.js";
import "dotenv/config"
import bcrypt from 'bcrypt'
import User from "../model/userModel.js";
import jwt from "jsonwebtoken";

export async function register(req, res) {

  const { name, username, email, phone, gender } = req.body;
    console.log(req.body);
  try {
    //check if username exists
    const existingUsername = await User.findOne({ username });

    if (existingUsername)
      return res.status(400).send({ message: `Username ${username} exists` });

    //check if email exists
    const existingEmail = await User.findOne({ email });

    if (existingEmail)
      return res.status(400).send({ message: `Email ${username} exists` });

    //encryption: converting plain text password into a jumbled up hash
    const password = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      name,
      username,
      email,
      phone,
      password,
      gender,
    });

    await newUser.save();

    //Send Email
    await sendVerificationEmail(newUser._id, newUser.email);

    return res.status(201).send({ message: "User registered" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error registering user", error: error.message });
  }
}


export async function login(request, response) {
    const { username, password } = request.body;
    console.log(request.body);
    console.log("reached login");
    
    
    try {
      // AUTHENTICATION
      //see if user exists
      const user = await User.findOne({ username });
      console.log(user);
      
  
      if (!user)
        return response.status(401).send({ message: "Incorrect credentials" });
  
      //see if emailisVerified
      console.log(user.isEmailVerified);
      
  
      if (!user.isEmailVerified)
        return response
          .status(403)
          .send({ message: "Please verify your email before logging in" });
  
      //see if passwords match
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch)
        return response.status(401).send({ message: "Incorrect credentials" });
      console.log("reached pass match");
      

      //AUTHORISATION
    // SESSION VARIABLE = TOKEN

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    console.log("token created",token);
    
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
    const loggedInUser = {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
      };
      console.log(loggedInUser);
      
      // res.send(user).select(-password);
      response.send(loggedInUser);
  
    } catch (error) {
      return response.status(500).send({ message: error });
    }
  }

export function logout(req,res){
  console.log("reached logout");
  
  res.clearCookie("token");
  res.status(201).send({message:"Logout succesfully!!"})
}
