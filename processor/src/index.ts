import { PrismaClient } from "@prisma/client";
<<<<<<< HEAD
import {Kafka} from "kafkajs";

const TOPIC_NAME = "zap-events"

const client = new PrismaClient();

const kafka = new Kafka({
    clientId: 'outbox-processor',
    brokers: ['localhost:9092']
})

async function main() {
    const producer =  kafka.producer();
    await producer.connect();

    while(1) {
        const pendingRows = await client.zapRunOutbox.findMany({
            where :{},
            take: 10
        })
        console.log(pendingRows);

        producer.send({
            topic: TOPIC_NAME,
            messages: pendingRows.map(r => {
                return {
                    value: JSON.stringify({ zapRunId: r.zapRunId, stage: 0 })
                }
            })
        })  

        await client.zapRunOutbox.deleteMany({
            where: {
                id: {
                    in: pendingRows.map(x => x.id)
                }
            }
        })

        await new Promise(r => setTimeout(r, 3000));
    }
=======
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

>>>>>>> 9894bef806202badea46c64b1d2a8d02f946dd94
}

main();