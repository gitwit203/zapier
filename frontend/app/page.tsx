import { AppBar } from "@/components/AppBar";
import { Hero } from "@/components/Hero";
//import Image from "next/image";
import { HeroVideo } from "@/components/HeroVideo";

export default function Home() {
  return (
    
      <main className="pb-48">
        <AppBar/>
         <Hero/>{/*`A hero section is a prominent visual element at the top of a website that's usually visible without scrolling. It's the first thing visitors see when they land on a page, and is often a full-screen image, video, or illustration */}
         <div className="pt-4">
         <HeroVideo/> 
         </div>
         
    </main>
  );
}
