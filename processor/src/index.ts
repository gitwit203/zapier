import { PrismaClient } from "@prisma/client";
import { Kafka } from "kafkajs";





const TOPIC_NAME = "zap-events"// comes from the topic we named in the shell script in kafka installed
                               // another use-case of monorepo, we'll eventually have a consumer(subscriber in pubsubs), waha firse likhna parega TOpiC_NaMe
const client = new PrismaClient();
const kafka = new Kafka({
    clientId:'outbox-processor',//need to find about this naming convention
    brokers:['localhost:9092'],
})

async function main(){

    const producer = kafka.producer();
    await producer.connect();
    



    //infinite loop that pulls things from outbox and pushes into the queue
    // will have to rewrite a lot of already written code since not using monorepo
    while(1){
        const pendingRows = await client.zapRunOutBox.findMany({
            where:{},
            take:10,
        })


        // take pending rows and publish it to kafka(our message queue) can also use redis tho
        //for that make sure to run kafka locally
        //create a topic (aka queue) in kafka
        
        producer.send({
            topic:TOPIC_NAME,
            messages:pendingRows.map(r=>({
                    value:r.zapRunId,
                })),
        })
        
        
        await client.zapRunOutBox.deleteMany({
            where:{
                id:{
                    in:pendingRows.map(x=>x.id)
                }
            }
        })
    }

}

main();