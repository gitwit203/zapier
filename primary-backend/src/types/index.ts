<<<<<<< HEAD
import { z } from "zod"

export const SignupSchema = z.object({
    username: z.string().min(5),
    password: z.string().min(6),
    name: z.string().min(3)
});

export const SigninSchema = z.object({
    username: z.string(),
    password: z.string()
});

export const ZapCreateSchema = z.object({
    availableTriggerId: z.string(),
    triggerMetadata: z.any().optional(),
    actions: z.array(z.object({
        availableActionId: z.string(),
        actionMetadata: z.any().optional(),
    }))
});
=======
import z from "zod";


export const SignUpSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(8),
    name: z.string(),
})

export const SignInSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(8),
    
})


//zap schema

export const ZapCreateSchema = z.object({
    availableTriggerID : z.string(),
    triggerMetaData : z.any().optional(),//since metadata can vary vastly for different triggers hence the any
    actions:z.array(z.object({
        availableActionID:z.string(),
        actionMetaData:z.any().optional(),
    }))

})
>>>>>>> 9894bef806202badea46c64b1d2a8d02f946dd94
