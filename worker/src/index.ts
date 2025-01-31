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