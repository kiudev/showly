import { Request } from "express";

export interface UserRequest extends Request {
  user?: {
    uid: string;
    email?: string;
  };
  userData?: {
    username: string;
    dateOfBirth: string;
    createdAt: Date;
  };
}
