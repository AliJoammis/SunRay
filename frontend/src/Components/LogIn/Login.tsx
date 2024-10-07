import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  AlertColor,
} from "@mui/material";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { getUserInformation, signinUser, signupUser } from "../../services/authServices";
import { useUser } from '../../Context/Context';
import { SignupCredentials } from "../../Models/UserModel";


export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>("error");
  const [emailError, setEmailError] = useState("");

  // Clear form fields when isSignUp changes
  useEffect(() => {
      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
  }, [isLogin]);

  // get context values
  const { login } =  useUser();
  
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    if (!validateEmail(newEmail)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleRePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRePassword(event.target.value);
  };

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {  
    event.preventDefault();
    if (emailError) {
      setSnackbarMessage(emailError);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    try {
      await (signinUser({email,password}));
      //get user information
      const userData = await (getUserInformation());

      //update context
      login(userData);
      console.log("Login successful");

      //navigate to the right page
      console.log("Navigating to role page:", userData.role);
      // navigate(`/${userData.role}`);
      navigate(`/offers`);

    } catch (error) {
      console.error("Login failed:", error);
      setSnackbarMessage("Login failed");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSignupSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (password !== rePassword) {
      setSnackbarMessage("Passwords do not match");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    if (emailError) {
      setSnackbarMessage(emailError);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    try {
      
      const signupCredentials: SignupCredentials = {
        firstname : firstName,
        lastname : lastName,
        email: email,
        password: password,
        repassword: rePassword

      }
      await (signupUser(signupCredentials));
      
      // Clear form fields
      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
      setIsLogin(true);

      await (signinUser({email,password}));
      //get user information
      const userData = await (getUserInformation());
      console.log(userData)

      //update context
      login(userData);
      
      //navigate to the right page
      console.log("Navigating to role page:", userData.role);
      navigate(`/offers`);
      
      console.log("Sign up successful");

    } catch (error) {
      console.error("Sign up failed:", error);
      setSnackbarMessage("Sign up failed");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      <form
        className="loginForm"
        onSubmit={isLogin ? handleLoginSubmit : handleSignupSubmit}
      >
        <div className={`loginContainer ${!isLogin ? "signUp" : ""}`}>
          <div className="loginLabelDiv">
            <Typography className="loginLabel" variant="h4">
              {isLogin ? "Login" : "Sign Up"}
            </Typography>
          </div>
          <div className={`textfieldDiv ${!isLogin?  "signUp" : ""}`}>

            {!isLogin && (
              <>
                <TextField
                  InputLabelProps={{
                    style: { fontSize: 15, color:"white"},
                  }}
                  className="textfield"
                  id="firstName"
                  label="First Name"
                  variant="standard"
                  color="warning"
                  onChange={handleFirstNameChange}
                  value = {firstName}
                />
                <br />
                <TextField
                  InputLabelProps={{
                    style: { fontSize: 15 , color:"white"},
                  }}
                  className="textfield"
                  id="lastName"
                  label="Last Name"
                  variant="standard"
                  color="warning"
                  onChange={handleLastNameChange}
                  value = {lastName}
                  required
                />
                <br />
              </>
            )}
            <TextField
              InputLabelProps={{
                style: { fontSize: 15 , color:"white"},
              }}
              className="textfield"
              id="email"
              label="Email"
              variant="standard"
              color="warning"
              onChange={handleEmailChange}
              error={!!emailError}
              helperText={emailError}
              required
              value = {email}
            />
            <br />
            <TextField
              InputLabelProps={{
                style: { fontSize: 15 , color:"white"},
              }}
              className="textfield"
              id="password"
              label="Password"
              variant="standard"
              color="warning"
              type="password"
              onChange={handlePasswordChange}
              value = {password}
              required
            />
            <br />
            {!isLogin && (
              <>
                <TextField
                  InputLabelProps={{
                    style: { fontSize: 15 , color:"white"},
                  }}
                  className="textfield"
                  id="rePassword"
                  label="RePassword"
                  variant="standard"
                  color="warning"
                  type="password"
                  onChange={handleRePasswordChange}
                  value = {rePassword}
                  required
                />
                <br />
              </>
            )}
          </div>

          <div className="btnDiv">
            <Button
              className="formBtn"
              type="submit"
              variant="contained"
              color={isLogin ? "primary" : "success"}
            >
              {isLogin ? "Login" : "Sign Up"}
            </Button>

            {isLogin ? (
              <>
                <Typography
                  className="forgetPassword"
                  component={Link}
                  to={"./"}
                  variant="caption"
                  color="white"
                >
                  Forgotten password?
                </Typography>
                <hr className="hr" />
                <Button
                  className="formBtn signup"
                  onClick={() => setIsLogin(false)}
                  variant="contained"
                  color="success"
                  sx={{width:"50%"}}
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <>
                <Typography
                  className="forgetPassword"
                  component="button"
                  onClick={() => setIsLogin(true)}
                  variant="caption"
                  color="white" 
                  style={{
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                    padding: 0,
                  }}
                >
                  Already have a user?
                </Typography>
              </>
            )}
          </div>
        </div>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
