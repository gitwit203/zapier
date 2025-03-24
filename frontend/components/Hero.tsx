<<<<<<< HEAD
"use client"
import { useRouter } from "next/navigation"
import { Feature } from "./Feature"
import { PrimaryButton } from "./buttons/PrimaryButton"
import { SecondaryButton } from "./buttons/SecondaryButton"

export const Hero = () => {
    const router = useRouter();
    return <div>
        <div className="flex justify-center">
            <div className="text-5xl font-bold font-semibold text-center pt-8 max-w-xl">
                Automate as fast as you can type    
            </div>
        </div>
        <div className="flex justify-center pt-2">
            <div className="text-xl font-bold font-normal text-center pt-8 max-w-2xl">
                AI gives you automation superpowers, and Zapier puts them to work. Pairing AI and Zapier helps you turn ideas into workflows and bots that work for you.
            </div>
        </div>

        <div className="flex justify-center pt-4">
            <div className="flex">
                <PrimaryButton onClick={() => {
                    router.push("/signup")
                }} size="big">Get Started free</PrimaryButton>
                <div className="pl-4">
                    <SecondaryButton  onClick={() => {}} size="big">Contact Sales</SecondaryButton>
=======
"use client";
import { PrimaryButton } from "./buttons/PrimaryButton"
import { SecondaryButton } from "./buttons/SecondaryButton";
import { Feature } from "./Feature";
import { useRouter } from "next/navigation";//remember to use next/NAVIGATION

export const Hero =()=>{
    const router =  useRouter();
    return <div >
        <div className="flex justify-center">
            <div className="text-4xl font-semibold text-center pt-4 max-w-xl  " >
                Automate as fast as you can type
            </div>
        </div>

        <div className="flex justify-center">
            <div className="text-xl font-normal text-center pt-4 max-w-2xl  " >
               AI gives you automation superpowers and Zapier puts them to work.
               Pairing AI and Zapier helps you turn ideas into workflows and bots that work for you
            </div>

        </div>
        <div className="flex justify-center">
            <div className="flex">
                <PrimaryButton onClick={()=>{
                    router.push("/signup")
                }} size="big">
                    Get started for free
                </PrimaryButton>
                <div className="pl-4">
                <SecondaryButton onClick={()=>{}} size="big"> Contact Sales </SecondaryButton>
>>>>>>> 9894bef806202badea46c64b1d2a8d02f946dd94
                </div>
            </div>
        </div>

        <div className="flex justify-center pt-4">
<<<<<<< HEAD
            <Feature title={"Free Forever"} subtitle={"for core features"} />
            <Feature title={"More apps"} subtitle={"than any other platforms"} />
            <Feature title={"Cutting Edge"} subtitle={"AI Features"} />
        </div>
=======
            <Feature title={"Free Forever"} subtitle={"for core features"}></Feature>
            <Feature title={"More Apps "} subtitle={" than any other platforms"}></Feature>
            <Feature title={"Cutting Edge"} subtitle={"AI features"}></Feature>
        </div>



>>>>>>> 9894bef806202badea46c64b1d2a8d02f946dd94
    </div>
}