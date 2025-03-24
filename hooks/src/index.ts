import express from "express"
<<<<<<< HEAD
import {PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const app = express();
app.use(express.json());

// https://hooks.zapier.com/hooks/catch/17043103/22b8496/
// password logic
app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
    const userId = req.params.userId;
    const zapId = req.params.zapId;
    const body = req.body;

    // store in db a new trigger
    await client.$transaction(async tx => {
        const run = await tx.zapRun.create({
            data: {
                zapId: zapId,
                metadata: body
            }
        });;

        await tx.zapRunOutbox.create({
            data: {
                zapRunId: run.id
            }
        })
    })
    res.json({
        message: "Webhook received"
    })
})

app.listen(3002);
=======
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
>>>>>>> 9894bef806202badea46c64b1d2a8d02f946dd94
