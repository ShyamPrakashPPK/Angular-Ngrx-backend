import express, { Request, Response, NextFunction } from "express";
import adminUserManagement from "../controller/adminUserController";
import autenticate from "../middleware/tockenAuthenticationMiddleware";
const router = express.Router();

//to get all users to the admin side
router.get("/", autenticate.authenticateTocken, adminUserManagement.getAllUser);

//to remove a user through the admin side
router.post("/deleteUser", autenticate.authenticateTocken, adminUserManagement.deleteUser);

//to edit a user data 
router.put('/editUser', autenticate.authenticateTocken, adminUserManagement.editUser)

//to do search of the data with the user name
router.get("/doUserSearch", autenticate.authenticateTocken, adminUserManagement.userSearch);


//exporting the routes
export default router;

