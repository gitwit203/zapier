"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const middleWare_1 = require("../middleWare");
const types_1 = require("../types");
const db_1 = require("../db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const router = (0, express_1.Router)();
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log("signup Handler");
    const body = req.body;
    const parsedData = types_1.SignUpSchema.safeParse(body);
    if (!parsedData.success) {
        return res.status(411).json({
            message: "Incorrect Inputs",
        });
    }
    // check if user exists
    const userExists = yield db_1.prismaClient.user.findFirst({
        where: {
            email: parsedData.data.username,
        }
    });
    if (userExists) {
        return res.status(403).json({
            message: "Already Signed Up"
        });
    }
    //if user doesn't exist , sign em up
    yield db_1.prismaClient.user.create({
        data: {
            email: parsedData.data.username,
            password: parsedData.data.password, //don't store password in plaintext , hash it
            name: parsedData.data.name,
        }
    });
    //expecting user to verify themselves
    //will do a await sendEmail() later
    return res.json({
        message: "Please verify your account from the link sent in mail"
    });
}));
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log("signin Handler");
    const body = req.body;
    const parsedData = types_1.SignInSchema.safeParse(body);
    if (!parsedData.success) {
        return res.status(411).json({
            message: "Incorrect Inputs",
        });
    }
    //since password stored is in plaintext we are checking straight away for email and mathcing password
    const user = yield db_1.prismaClient.user.findFirst({
        where: {
            email: parsedData.data.username,
            password: parsedData.data.password,
        }
    });
    if (!user) {
        return res.status(403).json({
            message: "Incorrect Credentials"
        });
    }
    //if the credentials are right, return a token to user
    const token = jsonwebtoken_1.default.sign({
        id: user.id
    }, config_1.JWT_PASSWORD);
    return res.json({
        token,
    });
}));
router.get("/", middleWare_1.authMiddleWare, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //fix the type (can make a custom req object)
    //@ts-ignore
    const id = req.id;
    const user = yield db_1.prismaClient.user.findFirst({
        where: {
            id,
        },
        select: {
            name: true,
            email: true,
        }
    });
    return res.json({
        user
    });
}));
exports.userRouter = router;
