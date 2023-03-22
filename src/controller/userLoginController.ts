/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import User from "../model/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const secretTocken = "26b5732ea9eaced91beebc01fce29213e9ff6d8f5294ca3c7f2710169e4fbb0aec19e127e30760ea54028ded74271781b2fb4b3feee44ad8bb22886a78abed9d";

//login controller for the application
export default {
    async doSignUp(req: Request, res: Response) {
        if (req.body.Password === "" || req.body.Name === "" || req.body.Email === "" || !req.body.Password || !req.body.Name || !req.body.Email) {
            res.json({ status: false, message: "the data is invalid" });
            return;
        }
        req.body.Password = await bcrypt.hash(req.body.Password, 10);
        const user: any = new User({
            userName: req.body.Name,
            userEmail: req.body.Email,
            password: req.body.Password,
            image: "https://res.cloudinary.com/dzmqstses/image/upload/v1671455534/images_ufcwd1.jpg",
        });
        user
            .save(user)
            .then((data: any) => {
                res.json({ status: true, message: "user have been added" });
            })
            .catch((err: any) => {
                console.log(err);
                res.json({ status: false, message: "user adding error", error: err });
            });
    },
    doLogin(req: Request, res: Response) {
        console.log(req.body);

        User.findOne({ userName: req.body.Name })
            .then(async (data: any) => {
                console.log(data);
                if (data != null) {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    await bcrypt.compare(req.body.Password, data.password!).then((status: boolean) => {
                        if (status) {
                            const acessTocken: string = jwt.sign({ Name: data.userName, Email: data.userEmail, Id: data._id }, secretTocken, { expiresIn: "2h" });
                            const userData = {
                                Name: data.userName,
                                Email: data.userEmail,
                                Image: data.image,
                                image: data.image,
                                Id: data._id,
                                tocken: acessTocken,
                                status: true,
                                message: "user exist"
                            };


                            res.status(200).json({ status: true, message: "user exist", tocken: acessTocken, user: userData });
                        } else {
                            console.log("error1");
                            res.status(400).json({ status: false, message: "incorrect password" });
                        }
                    });
                } else {
                    console.log("error2");
                    res.status(400).json({ status: false, message: "user dosenot exist" });
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json({ status: false, message: "checking error", error: err });
            });
    },
};
