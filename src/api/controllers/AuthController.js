import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import UserModel from "../models/UserModel.js";
import generateAccessToken from "../utilities/generateAccessToken.js";

class AuthController {
    async signIn (req, res) {
        try {        
            const { email, password } = req.body;
        
            console.log(email, password);

            if (!(email && password)) {
              return res.status(422).json({ message: "All input is required" });
            }
        
            const user = await UserModel.findOne({ email });

            console.log("Comparing", password, user.passwordHash);
            const comparedPasswords = await bcrypt.compare(password, user.passwordHash); //convert password to string
            console.log(comparedPasswords);

            if (user && comparedPasswords) {
                const token = generateAccessToken(
                    { 
                        userId: user._id, 
                        email 
                    }
                );
                return res.status(200).json({ user, token });
            }

            return res.status(403).json({ message: "Wrong email or password" }); //Add status code
        }
        

        catch (err) { 
            console.log("Error during sign-in", err);
            res.status(500).json({ message: "Error during sign-in" });
         }
    }

    async signUp (req, res) {
        console.log("Sing-up");
        try {
            const { firstname, lastname, email, password } = req.body;
            
            if (!firstname || !lastname || !email || !password) { // If some of input data is missing
                return res.send({ message: "All inputs are required" });
            }

            let existingUser = await UserModel.findOne({ email });
            //console.log("FOund users", existingUser);

            if (existingUser) {
                return res.status(403).send({ message: "User with such email already exists" });
            }

            const passwordHash = await bcrypt.hash(password, 2);
            const newUser = await UserModel.create({ firstname, lastname, email, passwordHash });
            const token = generateAccessToken(
                { 
                    userId: newUser.id, 
                    email 
                }
            );

            res.status(200).json({ message: "Sign-up successful", user: newUser, token });

        } catch (err) {
            console.log("Error during sign-up", err);
            res.status(500).send({ message: "Sign-up failed" });
        }
        
    }

    async signOut (req, res) {
        console.log("Sign-out");
    }

    async authorize(req, res){
        try{
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const email = decoded.email;
          
            //find user by email or id and send to client
          
            const user = await UserModel.findOne({ email });
          
            if(!user){
                return res.status(404).json({message: 'Error during authorize. Invalid token'});
            }
          
            res.status(200).json({ user, message: "Authorized successfully" });
        } catch (err) {
          console.log(err);
          return res.status(500).json({message: 'Error during authorization'});
        }
    }
}


export default new AuthController;