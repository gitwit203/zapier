import {Router} from "express";
import { authMiddleWare } from "../middleWare";
import { SignUpSchema,SignInSchema } from "../types";
import { prismaClient } from "../db";
import  jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";

const router = Router();


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
    return res.json({
        user
    });
})










export const userRouter = router;