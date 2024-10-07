import express, { NextFunction, Request, Response } from "express";
import { LoginCredentials, UserType } from "../Models/UserModel";
import {  loginUserLogic, signupUserLogic } from "../Logic/auth-logic";
import { decodeAndExtractUserInformation } from "../Utils/cyber";

const router = express.Router();

router.post(
  "/auth/signup",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.body as UserType;
      const token = await signupUserLogic(user);
      res.status(201).json(token);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/auth/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const login = req.body as LoginCredentials;
      const token = await loginUserLogic(login);
      res.status(200).json(token);
    } catch (err) {
      next(err);
    }
  }
);


router.get(
  "/auth/user", decodeAndExtractUserInformation, 
  async (req: Request, res: Response, next: NextFunction) => {
    try{
      const user = req.body as UserType;
      res.status(200).json(user); 
    } catch (err) {
      next(err);
    }
});

export default router;