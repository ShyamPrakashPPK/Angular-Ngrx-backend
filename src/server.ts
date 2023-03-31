import express, { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import indexRouter from "./routes/index";
import userRouter from "./routes/user";
import adminRouter from "./routes/admin";
import cors from "cors";
import bodyparser from "body-parser";
import connect from "./connections/connections";



const app = express();
const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true,//access-control-allow-credentials:true
    optionSuccessStatus: 200
};
app.use(cors(corsOptions));


const port: Number = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connect();


//Routes
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);



// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
    next(createError(404));
});


// golbal error handling middle ware
app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    console.log(err);
    // render the error page
    res.status(req.statusCode || 500);
    res.json({
        status: "error",
        message: err.message,
        stack: req.app.get("env") === "development" ? err.stack : {},
    });
});
app.listen(port, (): void => {
    console.log("server started");
});
