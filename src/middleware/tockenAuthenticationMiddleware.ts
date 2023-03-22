/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { VerifyErrors } from "jsonwebtoken";
import express, { Request, Response, NextFunction } from "express";
const secretTocken = "26b5732ea9eaced91beebc01fce29213e6d8f5294ca3c7f2710169e4fbb0aec19e127e30760ea54028ded74271781b2fb4b3feee44ad8bb22886a78abed9d";

export default {
    authenticateTocken: (req: Request, res: Response, next: NextFunction) => {
        const token: any = req.headers["autharization"];
        if (token !== undefined) {
            try {
                const data = jwt.verify(token, secretTocken);
                if (data) {
                    next();
                }
            } catch (err) {
                res.json({ status: false, message: "invalid tocken", error: err });
            }
        } else {
            res.json({
                status: false,
                message: "the auth tocken is invalid",
            });
        }
    },
};
