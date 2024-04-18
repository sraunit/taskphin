import Users from '../../models/user'
import {Request, Response , NextFunction} from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { RequestWithUser } from '../../types';

async function findUser(username : String) {
    
    try{
        const user_notavailable=await Users.findOne({ username });
        console.log(user_notavailable)
        if(user_notavailable){    
            return 'username not available';
        }
        else{
            return false;
        }
    }
    catch(err){
        console.log(err);
        return false;
    }
}

export const authenticate = async (req : RequestWithUser, res : Response, next : NextFunction) => {
    const auth_header = req.headers["authorization"];
    const token = auth_header && auth_header.split(" ")[1];
    console.log(token);
    if (token == null) {
      return res.sendStatus(401);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        console.log(err);
        return res.sendStatus(403);
      }
      req.username = user;
      next();
    });
  }

export const register = async  (req : Request , res : Response)  => {
    console.log(req);
    console.log(req.body);
    const { username , password } = req.body;
    const isolduser = await findUser(username);
    if (isolduser === false) {
      const hash = await bcrypt.hash(password, 8);
      const user = await Users.create({
        username: username,
        password: hash,
      });
      req.body = { sucess: true, message: "User has been created" };
      res.json(req.body);
    } else {
      req.body = { sucess: false, message: isolduser };
      res.json(req.body);
    }
    
  }

 export const login = async (req : Request , res : Response) => {
    const { username,password } = req.body;
    console.log(req.body);
    const user = await Users.findOne({ username });
    if (user) {
      bcrypt
        .compare(password, user.password)
        .then((value) => {
          if (value === true) {
            const access_Token = jwt.sign(
              username,
              process.env.ACCESS_TOKEN_SECRET
            );
            req.body = { sucess: true, token: access_Token };
            res.json(req.body);
          } else {
            req.body = { sucess: false, message: "password does not match" };
            res.json(req.body);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      req.body = { sucess: false, message: "username does not exist" };
      res.json(req.body);
    }
  }