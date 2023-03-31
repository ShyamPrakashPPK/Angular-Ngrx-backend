import express, { Request, Response, NextFunction } from "express";
import userManagment from "../controller/userLoginController";
import adminManagment from "../controller/adminLoginController";
const router = express.Router();

//this is the user signup side of the page.
router.post("/userSignUp", userManagment.doSignUp);

//this is the user login side of the page.
router.post("/userLogin", userManagment.doLogin);

//this is the admin SignUp page
router.post("/adminSignup", adminManagment.doSignUp);

//this is the admin login page
router.post("/adminLogin", adminManagment.doLogin);


//exporting the routes
export default router;
