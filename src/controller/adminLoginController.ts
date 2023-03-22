/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import Admin from "../model/adminModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const secretTocken = "26b5732ea9eaced91beebc01fce29213e9ff6d8f5294ca3c7f2710169e4fbb0aec19e127e30760ea54028ded74271781b2fb4b3feee44ad8bb22886a78abed9d";

export default {
    async doSignUp(req: Request, res: Response) {
        req.body.Password = await bcrypt.hash(req.body.Password, 10);
        const admin: any = new Admin({
            AdminName: req.body.Name,
            AdminEmail: req.body.Email,
            password: req.body.Password,
        });
        admin
            .save(admin)
            .then((data: any) => {
                res.json({ status: true, message: "admin have been added" });
            })
            .catch((err: any) => {
                console.log(err);
                res.json({ status: false, message: "admin adding error" });
            });
    },
    doLogin(req: Request, res: Response) {
        //
        Admin.findOne({ AdminName: req.body.Name }).then(async (data: any) => {
            if (data != null) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                await bcrypt.compare(req.body.Password, data.password!).then((status: boolean) => {
                    if (status) {
                        const adminData = {
                            name: data.AdminName,
                            email: data.AdminEmail,
                        };
                        const acessTocken: string = jwt.sign(adminData, secretTocken, { expiresIn: "2h" });
                        res.send({ status: true, message: "user exist", tocken: acessTocken, admin: adminData });
                    } else {
                        res.send({ status: false, message: "incorrect password" });
                    }
                });
            } else {
                res.send({ status: false, message: "user dosenot exist" });
            }
        });
    },
};
