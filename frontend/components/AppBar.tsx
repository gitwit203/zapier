"use client";//useRouter only works with client component

import { LinkButton } from "./buttons/LinkButton"
import { useRouter } from "next/navigation";
import { PrimaryButton } from "./buttons/PrimaryButton";


export const AppBar = ()=>{
    const router=useRouter();
    return <div className="flex border-b justify-between p-4"> 
        <div className="flex flex-col justify-center text-2xl font-extrabold">
            Zapier
        </div>
        <div className="flex">
            <LinkButton onClick={()=>{}}>Contact Sales</LinkButton> 
       
        
        <LinkButton onClick={()=>{
            router.push("/login")
        }}> Login   </LinkButton>
        <PrimaryButton onClick={()=>{
            router.push("/signup")
        }}>
            Signup
        </PrimaryButton>
         </div>
    </div>
}