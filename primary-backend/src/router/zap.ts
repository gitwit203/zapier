<<<<<<< HEAD

import { Router } from "express";
import { authMiddleware } from "../middleware";
import { ZapCreateSchema } from "../types";
import { prismaClient } from "../db";

const router = Router();

router.post("/", authMiddleware, async (req, res) => {
    // @ts-ignore
    const id: string = req.id;
    const body = req.body;
    const parsedData = ZapCreateSchema.safeParse(body);
    
    if (!parsedData.success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        });
    }   

    const zapId = await prismaClient.$transaction(async tx => {
        const zap = await prismaClient.zap.create({
            data: {
                userId: parseInt(id),
                triggerId: "",
                actions: {
                    create: parsedData.data.actions.map((x, index) => ({
                        actionId: x.availableActionId,
                        sortingOrder: index,
                        metadata: x.actionMetadata
=======
import {Router} from "express";
import { authMiddleWare } from "../middleWare";
import { ZapCreateSchema } from "../types";
import { prismaClient } from "../db";
const router = Router();


router.post("/",authMiddleWare,async(req,res)=>{
    //console.log("creating zap");

    //@ts-ignore
    const id :string= req.id;

    const body = req.body;
    
    const parsedData = ZapCreateSchema.safeParse(body);
    if(!parsedData.success){
        console.log(parsedData);
        console.log(body);
        return res.status(411).json({
            message:"Incorrect Inputs",
        });
    }

    const zapId= await prismaClient.$transaction(async tx=>{
        const zap = await prismaClient.zap.create({
            data:{
                userID: parseInt(id),
                triggerID:"",// how it was defined in database schema
                actions:{
                    create: parsedData.data.actions.map((x,index)=>({
                        actionID:x.availableActionID,
                        sortingOrder:index,
                         
>>>>>>> 9894bef806202badea46c64b1d2a8d02f946dd94
                    }))
                }
            }
        })
<<<<<<< HEAD

        const trigger = await tx.trigger.create({
            data: {
                triggerId: parsedData.data.availableTriggerId,
                zapId: zap.id,
=======
        const trigger = await tx.trigger.create({
            data:{
                avialableTriggerID: parsedData.data.availableTriggerID,//need to put triggerID in trigger schema
                zapID: zap.id,
>>>>>>> 9894bef806202badea46c64b1d2a8d02f946dd94
            }
        });

        await tx.zap.update({
<<<<<<< HEAD
            where: {
                id: zap.id
            },
            data: {
                triggerId: trigger.id
            }
        })

        return zap.id;

=======
            where:{
                id:zap.id
            },
            data:{
                triggerID:trigger.id,
            }
        })
        return zap.id;
>>>>>>> 9894bef806202badea46c64b1d2a8d02f946dd94
    })
    return res.json({
        zapId
    })
})
<<<<<<< HEAD

router.get("/", authMiddleware, async (req, res) => {
    // @ts-ignore
    const id = req.id;
    const zaps = await prismaClient.zap.findMany({
        where: {
            userId: id
        },
        include: {
            actions: {
               include: {
                    type: true
               }
            },
            trigger: {
                include: {
                    type: true
                }
            }
        }
    });

    return res.json({
        zaps
    })
})

router.get("/:zapId", authMiddleware, async (req, res) => {
    //@ts-ignore
    const id = req.id;
    const zapId = req.params.zapId;

    const zap = await prismaClient.zap.findFirst({
        where: {
            id: zapId,
            userId: id
        },
        include: {
            actions: {
               include: {
                    type: true
               }
            },
            trigger: {
                include: {
                    type: true
                }
            }
        }
    });

    return res.json({
        zap
    })

})

=======
    

router.get("/",authMiddleWare,async(req,res)=>{//get zaps for the user
    console.log("zap Handler");

   //getting all the zaps here
   //@ts-ignore

   const id  = req.id;
   const zaps = await prismaClient.zap.findMany({
    where:{
        userID:id
    },
    include:{
        actions:{
                include:{
                    type: true
                }
        },
        trigger:{
            include:{
                type:true
            }
        }
    }
   })

   return res.json({
    zaps
   })

})

router.get("/:zapId", authMiddleWare,async(req,res)=>{
    //console.log("getting a specific zap and its corresponding zap runs");
    //@ts-ignore
    //
    const zapID = req.params.zapId;
    //@ts-ignore
    const id  = req.id;
    const zaps = await prismaClient.zap.findMany({
     where:{
            id:zapID, /** 2 checks as we don't want users to get hold of other users zaps */
            userID:id
     },
     include:{
         actions:{
                 include:{
                     type: true
                 }
         },
         trigger:{
             include:{
                 type:true
             }
         }
     }
    })
 
    return res.json({
     zaps
    })
})



/** before testing on postman , seed some availableTriggers and availableActions in the database*/







>>>>>>> 9894bef806202badea46c64b1d2a8d02f946dd94
export const zapRouter = router;