import { Request } from "express";

export interface UserRequest extends Request {
  cookies: {
    session: string;
    [key: string]: any; // opcional, por si hay más cookies
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
