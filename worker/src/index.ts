<<<<<<< HEAD
require('dotenv').config()

import { PrismaClient } from "@prisma/client";
import { JsonObject } from "@prisma/client/runtime/library";
import { Kafka } from "kafkajs";
import { parse } from "./parser";
import { sendEmail } from "./email";
import { sendSol } from "./solana";

const prismaClient = new PrismaClient();
const TOPIC_NAME = "zap-events"

const kafka = new Kafka({
    clientId: 'outbox-processor-2',
    brokers: ['localhost:9092']
})

async function main() {
    const consumer = kafka.consumer({ groupId: 'main-worker-2' });
    await consumer.connect();
    const producer =  kafka.producer();
    await producer.connect();

    await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true })

    await consumer.run({
        autoCommit: false,
        eachMessage: async ({ topic, partition, message }) => {
          console.log({
            partition,
            offset: message.offset,
            value: message.value?.toString(),
          })
          if (!message.value?.toString()) {
            return;
          }

          const parsedValue = JSON.parse(message.value?.toString());
          const zapRunId = parsedValue.zapRunId;
          const stage = parsedValue.stage;

          const zapRunDetails = await prismaClient.zapRun.findFirst({
            where: {
              id: zapRunId
            },
            include: {
              zap: {
                include: {
                  actions: { // since the actions is a foreign key in zap table, we need to use the include wala format
                    include: { //if only zap:true was written it wouldn't have given the relationships
                      type: true // here type is nothing but availableActions
                    }
                  }
                }
              },
            }
          });
          const currentAction = zapRunDetails?.zap.actions.find(x => x.sortingOrder === stage);

          if (!currentAction) {
            console.log("Current action not found?");
            return;
          }

          const zapRunMetadata = zapRunDetails?.metadata;

          if (currentAction.type.id === "email") {
            const body = parse((currentAction.metadata as JsonObject)?.body as string, zapRunMetadata);
            const to = parse((currentAction.metadata as JsonObject)?.email as string, zapRunMetadata);
            console.log(`Sending out email to ${to} body is ${body}`)
            await sendEmail(to, body);
          }

          if (currentAction.type.id === "send-sol") {

            const amount = parse((currentAction.metadata as JsonObject)?.amount as string, zapRunMetadata);
            const address = parse((currentAction.metadata as JsonObject)?.address as string, zapRunMetadata);
            console.log(`Sending out SOL of ${amount} to address ${address}`);
            await sendSol(address, amount);
          }
          
          // 
          await new Promise(r => setTimeout(r, 500));

          const lastStage = (zapRunDetails?.zap.actions?.length || 1) - 1; // 1
          console.log(lastStage);
          console.log(stage);
          if (lastStage !== stage) {
            console.log("pushing back to the queue")
            await producer.send({
              topic: TOPIC_NAME,
              messages: [{
                value: JSON.stringify({
                  stage: stage + 1,
                  zapRunId
                })
              }]
            })  
          }

          console.log("processing done");
          // 
          await consumer.commitOffsets([{
            topic: TOPIC_NAME,
            partition: partition,
            offset: (parseInt(message.offset) + 1).toString() // 5
          }])
        },
      })

}

main()

=======
import { Kafka } from "kafkajs";

const TOPIC_NAME="zap-events";

//const client = new PrismaClient();
const kafka = new Kafka({
    clientId:'outbox-processor',//need to find about this naming convention
    brokers:['localhost:9092'],
})






async function main(){
        while(1){
            const consumer = kafka.consumer({groupId:'main-worker'});
            await consumer.connect();

            await consumer.subscribe({topic: TOPIC_NAME,fromBeginning:true});

            await consumer.run({
                autoCommit:false,//if true to sirf kafka se message pull karke khush rehta
                eachMessage: async({topic,partition,message})=>{
                    console.log({
                        partition,
                        offset:message.offset,
                        value:message.value?.toString(),
                    })
                    await new Promise(r=>setTimeout(r,1000));//mimicking a heavy operation

                    await consumer.commitOffsets([{
                        topic:TOPIC_NAME,
                        partition:partition,
                        offset: (parseInt(message.offset)+1).toString()// ye isliye as sirf message.offset+1 would be string +1 and wo fir offset 0 se shuru hota in the event of server crashing
                    }])
                },


            })

            // need to acknowledge that the worker actually processed and did its work, tabhi pull the next elemetn from the queue


        }
}


main();
>>>>>>> 9894bef806202badea46c64b1d2a8d02f946dd94
