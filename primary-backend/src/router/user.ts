<<<<<<< HEAD

import { Router } from "express";
import { authMiddleware } from "../middleware";
import { SigninSchema, SignupSchema } from "../types";
import { prismaClient } from "../db";
import jwt from "jsonwebtoken";
=======
import {Router} from "express";
import { authMiddleWare } from "../middleWare";
import { SignUpSchema,SignInSchema } from "../types";
import { prismaClient } from "../db";
import  jwt from "jsonwebtoken";
>>>>>>> 9894bef806202badea46c64b1d2a8d02f946dd94
import { JWT_PASSWORD } from "../config";

const router = Router();

<<<<<<< HEAD
router.post("/signup", async (req, res) => {
    const body = req.body;
    const parsedData = SignupSchema.safeParse(body);

    if (!parsedData.success) {
        console.log(parsedData.error);
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const userExists = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data.username
        }
    });

    if (userExists) {
        return res.status(403).json({
            message: "User already exists"
        })
    }

    await prismaClient.user.create({
        data: {
            email: parsedData.data.username,
            // TODO: Dont store passwords in plaintext, hash it
            password: parsedData.data.password,
            name: parsedData.data.name
        }
    })

    // await sendEmail();

    return res.json({
        message: "Please verify your account by checking your email"
    });

})

router.post("/signin", async (req, res) => {
    const body = req.body;
    const parsedData = SigninSchema.safeParse(body);

    if (!parsedData.success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data.username,
            password: parsedData.data.password
        }
    });
    
    if (!user) {
        return res.status(403).json({
            message: "Sorry credentials are incorrect"
        })
    }

    // sign the jwt
    const token = jwt.sign({
        id: user.id
    }, JWT_PASSWORD);

    res.json({
        token: token,
    });
})

router.get("/", authMiddleware, async (req, res) => {
    // TODO: Fix the type
    // @ts-ignore
    const id = req.id;
    const user = await prismaClient.user.findFirst({
        where: {
            id
        },
        select: {
            name: true,
            email: true
        }
    });

=======

router.post("/signup",async(req,res)=>{
    //console.log("signup Handler");

    const body = req.body;
    const parsedData = SignUpSchema.safeParse(body);
    //console.log(body);
    if(!parsedData.success){
        return res.status(411).json({
            message:"Incorrect Inputs",
        })
    }

    // check if user exists
    const userExists = await prismaClient.user.findFirst({
        where:{
            email: parsedData.data.username,
        }
    });

    if(userExists){
        return res.status(403).json({
            message:"Already Signed Up"
        })
    }

    //if user doesn't exist , sign em up

    await prismaClient.user.create({ 
        data:{
            email: parsedData.data.username,
            password: parsedData.data.password,//don't store password in plaintext , hash it
            name: parsedData.data.name,
        }
    });

    //expecting user to verify themselves
    //will do a await sendEmail() later

    return res.json({
        message:"Please verify your account from the link sent in mail"
    })

})







router.post("/signin",async(req,res)=>{
    //console.log("signin Handler");
    const body = req.body;
    const parsedData = SignInSchema.safeParse(body);
    
    console.log("Received body",body);
    if(!parsedData.success){
        return res.status(411).json({
            message:"Incorrect Inputs",
        })
    }



    //since password stored is in plaintext we are checking straight away for email and mathcing password
    const user = await prismaClient.user.findFirst({
        where:{
            email: parsedData.data.username,
            password: parsedData.data.password,
        }
    });

    if(!user){
        return res.status(403).json({
            message:"Incorrect Credentials"
        })
    }

    //if the credentials are right, return a token to user
    const token = jwt.sign({
        id:user.id
    },JWT_PASSWORD);

    return res.json({
        token,
    })

});










router.get("/",authMiddleWare , async(req,res)=>{
    //fix the type (can make a custom req object)
    //@ts-ignore
    const id = req.id;
    const user = await prismaClient.user.findFirst({
        where:{
            id,
        },
        select:{
            name:true,
            email:true,
        }
    })
>>>>>>> 9894bef806202badea46c64b1d2a8d02f946dd94
    return res.json({
        user
    });
})

<<<<<<< HEAD
=======









>>>>>>> 9894bef806202badea46c64b1d2a8d02f946dd94
export const userRouter = router;