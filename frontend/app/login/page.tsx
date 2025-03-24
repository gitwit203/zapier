<<<<<<< HEAD
"use client";
import { Appbar } from "@/components/Appbar";
import { CheckFeature } from "@/components/CheckFeature";
import { Input } from "@/components/Input";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";

export default function() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    
    return <div> 
        <Appbar />
        <div className="flex justify-center">
            <div className="flex pt-8 max-w-4xl">
                <div className="flex-1 pt-20 px-4">
                    <div className="font-semibold text-3xl pb-4">
                    Join millions worldwide who automate their work using Zapier.
                    </div>
                    <div className="pb-6 pt-4">
                        <CheckFeature label={"Easy setup, no coding required"} />
                    </div>
                    <div className="pb-6">
                        <CheckFeature label={"Free forever for core features"} />
                    </div>
                    <CheckFeature label={"14-day trial of premium features & apps"} />

                </div>
                <div className="flex-1 pt-6 pb-6 mt-12 px-4 border rounded">
                    <Input onChange={e => {
                        setEmail(e.target.value)
                    }} label={"Email"} type="text" placeholder="Your Email"></Input>
                    <Input onChange={e => {
                        setPassword(e.target.value);
                    }} label={"Password"} type="password" placeholder="Password"></Input>
                    <div className="pt-4">
                        <PrimaryButton onClick={async () => {
                            const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
                                username: email,
                                password,
                            });
                            localStorage.setItem("token", res.data.token);
                            router.push("/dashboard");
                        }} size="big">Login</PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
=======
"use client"
import { AppBar } from "@/components/AppBar";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { CheckFeature } from "@/components/CheckFeature";
import  { Input } from "@/components/Input";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";


export default function(){/**
 * Component name must start with a capital letter as hooks like useState can only be used
    inside a functiuonal component or a custom hook
    if the component name does not start with a capital letter then it won't be recognised
    as a function component and hooks will throw up errors
 */
        const router = useRouter();
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
                
                   
                    <Input label = {"Email"} onChange={e=>{
                        setEmail(e.target.value)
                    }}placeholder="Your Email" type="text"></Input>
                    
                    <Input label={"Password"} onChange={e=>{
                        setPassword(e.target.value)
                    }}type="password" placeholder="Password"></Input>

                    <div className="pt-4">
                        <PrimaryButton onClick={async ()=>{
                            console.log("Hit the login button");
                            //send axios request to backend
                            const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`,{
                                //body that needs to be sent
                                username:email,
                                password,
                            
                            })
                            //if the user doesn't login correctly then we need to put the token into local storage
                            //console.log(email);
                            //console.log(password);
                            //console.log(res);
                            localStorage.setItem("token",res.data.token);
                            router.push("/dashboard")
                        }} size="big">Login</PrimaryButton>
                    </div>
                </div>
                    
            </div>
        </div> 
>>>>>>> 9894bef806202badea46c64b1d2a8d02f946dd94
    </div>
}