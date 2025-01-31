import express from "express"
import { PrismaClient } from "@prisma/client";

const app = express();

app.use(express.json());
const client = new PrismaClient();

//write password logic here
app.post("/hooks/catch/:userID/:zapID",async(req,res)=>{
        const userID = req.params.userID;
        const zapID = req.params.zapID;

        const body=req.body;


        //store triggers in DB from here
        await client.$transaction(async tx=>{

            const run = await tx.zapRun.create({
                data: {
                    zapID:zapID,
                    metadata:body,
                }
            });


            await client.zapRunOutBox.create({
                data:{
                    zapRunId:run.id
                }
            });
        })

        res.json({
            message:"Webhook received"
        })

        
})

app.listen(3000);