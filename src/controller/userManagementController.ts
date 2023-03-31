/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import User from "../model/userModel";
import { ObjectId } from "mongodb";
import cloudinary from "cloudinary";
import { stringify } from "querystring";
const secretTocken = "26b5732ea9eaced91beebc01fce29213e9ff6d8f5294ca3c7f2710169e4fbb0aec19e127e30760ea54028ded74271781b2fb4b3feee44ad8bb22886a78abed9d";

cloudinary.v2.config({
    cloud_name: "dxivlrflh",
    api_key: "844726121639328",
    api_secret: "mLzNYxC-_4pETO8QhXFYomgwic4",
});
//every functions that can be written for the non user related oprerations
export default {
    getUserPage(req: Request, res: Response) {
        const userId: any = req.query.userId;
        User.findOne({ _id: new ObjectId(userId) })
            .then((data) => {
                res.json({ status: true, message: "found the user", user: data });
            })
            .catch((err) => {
                res.json({ status: false, message: "invalid user data", error: err });
            });
    },
    getUserDetails(req: Request, res: Response) {
        const userId: any = req.query.userId;
        User.findOne({ _id: new ObjectId(userId) })
            .then((data) => {
                res.status(200).json({ status: true, message: "found the user", user: data });
            })
            .catch((err) => {
                res.status(400).json({ status: false, message: "invalid user data", error: err });
            });
    },
    editUserDetails(req: Request, res: Response) {        
        User.updateOne(
            { _id: new ObjectId(req.body._id) },
            {
                $set: {
                    userName: req.body.Name,
                    userEmail: req.body.Email,
                },
            }
        )
            .then((data) => {
                res.json({ status: true, message: "sucessfully edited the contene" });
            })
            .catch((err) => {
                console.log(err);
            });
    },

    async uploadImage(req: Request, res: Response) {
        try {
            const path = req.file?.path;
            const tocken: any = req.headers["autharization"];
            const data: any = jwt.verify(tocken, secretTocken);
            console.log(data);
            const user = await User.findById(data.Id);
            if (user) {
                if (path) {
                    const result = await new Promise((resolve, reject) => {
                        cloudinary.v2.uploader.upload(path, (err: any, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): any; new(): any } }; secure_url: unknown }) => {
                            if (err) return res.status(500).send("uploaded image error");
                            resolve(res.secure_url);
                        });
                    });

                    User.updateOne(
                        { userName: data.Name },
                        {
                            $set: {
                                image: result,
                            },
                        }
                    )
                        .then((data) => {
                            res.status(200).json({ url: result, status: true, message: "the upload of the file was a sucess" });
                        })
                        .catch((err) => {
                            res.status(400).json({ status: false, message: "failure occured" });
                        });
                } else {
                    res.status(400).json({ status: false, message: "invalid data" });
                }
            } else {
                res.status(400).json({ status: false, message: "such a user dose not exist" });
            }
        } catch (err) {
            res.status(400).json({ status: false, message: "error occoured", error: err });
        }


    },
};
