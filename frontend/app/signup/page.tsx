"use client"
import { AppBar } from "@/components/AppBar";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { CheckFeature } from "@/components/CheckFeature";
import  { Input } from "@/components/Input";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import  axios  from "axios";
import { useRouter } from "next/navigation";



export default function(){
    const router = useRouter();
    const [name,setName]= useState("");
    const [email,setEmail]= useState("");
    const [password,setPassword]= useState("");
    return <div>
        <AppBar/>
        <div className="flex justify-center">
            <div className="flex pt-8 max-w-4xl">
                <div className="flex-1 pt-20 px-4">
                    <div className="font-semibold text-2xl px-4 pb-4">
                        Join millions worldwide who automate their work using Zapier
                    </div>
                    <div className="pb-8"> 
                        <CheckFeature label={"Easy setup, no coding required"}/>
                    </div>
                    <div className="pb-8"> 
                        <CheckFeature label={"Free forever for core features"}/>
                    </div>
                    <div className="pb-8"> 
                        <CheckFeature label={"14 day trial of premium features and apps"}/>
                    </div>
                    
                    
                    

                </div>

            
                <div className= "flex-1 pt-6 pb-6 mt-6 px-4 border rounded">
                
                    <Input label={"Name"} onChange={e=>{
                        setName(e.target.value);
                    }} type="text"placeholder="Your name"></Input>
                    <Input label = {"Email"} onChange={e=>{
                        setEmail(e.target.value);
                    }}placeholder="Your Email"></Input>
                    <Input label={"Password"} onChange={e=>{
                        setPassword(e.target.value);
                    }}type="password" placeholder="Password"></Input>
                    <div className="pt-4">
                    <PrimaryButton onClick={async ()=>{
                        //send axios request to backend
                        const res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`,{
                            //body that needs to be sent
                            username:email,
                            password,
                            name
                        });
                        router.push("/login")
                    }} size="big">Get Started Free</PrimaryButton>
                    </div>
                </div>
                    
            </div>
        </div> 
    </div>
}