import { Request } from "express";
import Users from "../models/user";

export interface RequestWithUser extends Request {
  username:string;
}