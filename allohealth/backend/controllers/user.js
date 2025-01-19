import "dotenv/config"
import bcryptjs from 'bcryptjs'

import jwt from "jsonwebtoken";
import User from "../model/user.js";

export async function register(req, res) {

  const { name, username, email } = req.body;
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
    const password = await bcryptjs.hash(req.body.password, 10);

    const newUser = new User({
      name,
      username,
      email,
      password,
    });

    await newUser.save();

    //Send Email
    

    return res.status(201).send({ message: "User registered" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error registering user", error: error.message });
  }
}


export async function login(request, response) {
    const { email, password } = request.body;
    console.log(request.body);
    console.log("reached login");
    
    
    try {
      // AUTHENTICATION
      //see if user exists
      const user = await User.findOne({ email });
      console.log(user);
      
  
      if (!user)
        return response.status(401).send({ message: "Incorrect credentials" });
  
  
      //see if passwords match
  
      const passwordMatch = await bcryptjs.compare(password, user.password);
  
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
