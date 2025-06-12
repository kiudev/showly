import { Request } from "express";

export interface UserRequest extends Request {
  cookies: {
    session: string;
    [key: string]: any;
  };
  user?: {
    uid: string;
    email?: string;
  };
  userData?: {
    username: string;
    createdAt: Date;
  };
}
