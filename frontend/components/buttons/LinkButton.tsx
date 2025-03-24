<<<<<<< HEAD
"use client";

import { ReactNode } from "react"

export const LinkButton = ({ children, onClick }: { children: ReactNode, onClick: () => void }) => {
    return <div className="flex justify-center px-2 py-2 cursor-pointer hover:bg-slate-100 font-light text-sm rounded" onClick={onClick}>
=======
import { ReactNode } from "react"



export const LinkButton = ({children,onClick}:{children:ReactNode , onClick:()=> void})=>{ /**ReactNode is liye as 
    whenever we use LinkButton we can either put text or div in between LinkButton
    onclick wala part .. function that takes no arguments and returns nothing  */
    return <div className="flex justify-center px-4 py-2 cursor-pointer hover:bg-slate-100 font-light text-sm rounded" onClick={onClick}>
>>>>>>> 9894bef806202badea46c64b1d2a8d02f946dd94
        {children}
    </div>
}