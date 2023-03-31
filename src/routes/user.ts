import express, { Request, Response, NextFunction } from "express";
import userPage from "../controller/userManagementController";
import autenticate from "../middleware/tockenAuthenticationMiddleware";
import multer from "multer";

const upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        cb(null, true);
    },
});


const router = express.Router();

//to route to the actual user page in the routes.
router.get("/", autenticate.authenticateTocken, userPage.getUserPage);

//get user details for editing
router.get("/editUser", autenticate.authenticateTocken, userPage.getUserDetails);

//to edit the user details
router.post("/editUser", autenticate.authenticateTocken, userPage.editUserDetails);

//uploading the user image
router.post("/uploadImage", autenticate.authenticateTocken, userPage.uploadImage);
//exporting the routes
export default router;
