import { Request } from "express";

export interface UserRequest extends Request {
  user?: {
    uid: string;
    email?: string;
  };
  userData?: {
    username: string;
    createdAt: Date;
  };
}
