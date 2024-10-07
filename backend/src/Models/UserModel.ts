import Joi from "Joi";
import { ValidationError } from "./ErrorModels";

export type UserResponse = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: RoleType;
  token: string;
};

export type RoleType = "admin" | "user";

export type LoginCredentials = {
  email: string;
  password: string;
};

export type UserType = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: RoleType;
};

export const userValidationSchema = Joi.object({
  id: Joi.number().integer().positive().optional(),
  firstname: Joi.string().min(2).max(30).required().alphanum().trim(),
  lastname: Joi.string().min(2).max(30).required().alphanum().trim(),
  email: Joi.string().email({ tlds: { allow: true } }).required(),
  password: Joi.string().min(4).max(25).required(),
  role: Joi.forbidden(),
});

export const validateUser = (user: UserType) => {
  const result = userValidationSchema.validate(user);
  if (result.error) ValidationError(result.error.message);
};

export const loginValidationSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: true } }).required(),
  password: Joi.string().min(4).max(25).required(),
});

export const validateLogin = (credentials: LoginCredentials) => {
  const result = loginValidationSchema.validate(credentials);
  if (result.error) ValidationError(result.error.message);
};
