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