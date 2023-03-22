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

router.post("/trialLink", (req, res) => {
    res.json({ user: [{ name: "amal", email: "amal@gmail.com" }, { name: "adi", email: "adi@gmail.com" }, { name: "rijas", email: "rijas@gmail.com" }], Tocken: "lk;asdlk;asdfj;lkasdfjlk;sadfj;lkjsdff", status: true, error: "this is a error message" });
});
//exporting the routes
export default router;
