/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import User from "../model/userModel";
import { ObjectId } from "mongodb";

export default {
    getAllUser(req: Request, res: Response) {
        User.find()
            .then((data) => {
                res.json({ status: true, message: "sending all users", users: data });
            })
            .catch((err) => {
                res.json({ status: false, message: "error while fetching all users", error: err });
            });
    },
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
    userSearch(req: Request, res: Response) {
        const name = req.query.name;
        User.find({ userName: { $regex: name } }).then((data) => {
            res.json({ data });
        });
    },
};
