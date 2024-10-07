import { UnauthorizedError } from './../Models/ErrorModels';
import { OkPacket } from "mysql";
import {LoginCredentials, UserType, validateLogin, validateUser} from "../Models/UserModel";
import { executeSqlQuery } from "../Utils/dal";
import { getNewToken } from "../Utils/cyber";



export const signupUserLogic = async (user: UserType): Promise<string> => {
  validateUser(user);

  const checkEmailQuery = `SELECT * FROM users WHERE email = '${user.email}'`;

  const checkEmail = await executeSqlQuery(checkEmailQuery);
  if (checkEmail.length >= 1)
    UnauthorizedError("Email is already exists");

  const sqlQuery = `
    INSERT INTO users (id, email, password, firstname, lastname, role)
    VALUES (null, '${user.email}','${user.password}', '${user.firstname}','${user.lastname}', 1)
    `;

  const info: OkPacket = await executeSqlQuery(sqlQuery);
  if (info.affectedRows === 0)
    UnauthorizedError("Error in signup sql query: " + info.message);
  user.id = +info.insertId;
  const token = getNewToken(user);
  return token;
};

export const loginUserLogic = async (login: LoginCredentials): Promise<string> => {
    // to validate the login credentials
    validateLogin(login);

    // next, we want to check if the credentials match any one of the users in the DB
  const getUserQuery = `
    SELECT * FROM users
    WHERE email = '${login.email}' 
    AND password = '${login.password}'
    `;

    // next, we get from MySql an array of users
    const userArray = await executeSqlQuery(getUserQuery);

    // we check if the array has no items (no users matched)
    if(userArray.length === 0 ) UnauthorizedError('incorrect email or password ');

    // extract the user from the array
    const user: UserType = userArray[0];

    // create a token for the user
    const token = getNewToken(user);

    // return the token to controller (route)
    return token;
};
