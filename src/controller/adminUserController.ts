/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import User from "../model/userModel";
import { ObjectId } from "mongodb";
import cloudinary from "cloudinary";
import jwt, { VerifyErrors } from "jsonwebtoken";



const secretTocken = "26b5732ea9eaced91beebc01fce29213e9ff6d8f5294ca3c7f2710169e4fbb0aec19e127e30760ea54028ded74271781b2fb4b3feee44ad8bb22886a78abed9d";

cloudinary.v2.config({
    cloud_name: "dzmqstses",
    api_key: "496591628439112",
    api_secret: "UErHHUocO5UkUIJMQZNXaUZm-IU",
});
export default {


    //to get all the user details to view in index page
    async getAllUser(req: Request, res: Response) {
        User.find()
            .then((data) => {
                res.json({ status: true, message: "sending all users", users: data });
            })
            .catch((err) => {
                res.json({ status: false, message: "error while fetching all users", error: err });
            });
    },


    //to delete user.....

    deleteUser(req: Request, res: Response) {
        console.log(req.body);
        const user: any = req.body._id;
        User.deleteOne({ _id: new ObjectId(user) })
            .then((data) => {
                console.log(data);
                res.json({ status: true, message: "deleted the user", data });
            })
            .catch((err) => {
                res.json({ status: false, message: "failed to delete the user", error: err });
            });
    },



    //to edit user data.....
    editUser(req: Request, res: Response) {
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



    //to search user data.......

    userSearch(req: Request, res: Response) {
        const name = req.query.name;
        User.find({ userName: { $regex: name } }).then((data) => {
            res.json({ data });
        });
    },
};
