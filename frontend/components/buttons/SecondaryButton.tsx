<<<<<<< HEAD
import { ReactNode } from "react"

export const SecondaryButton = ({ children, onClick, size = "small" }: {
    children: ReactNode,
    onClick: () => void,
    size?: "big" | "small"
}) => {
    return <div onClick={onClick} className={`${size === "small" ? "text-sm" : "text-xl"} ${size === "small" ? "px-8 pt-2" : "px-10 py-4"} cursor-pointer hover:shadow-md border text-black border-black rounded-full`}>
        {children}
=======

import { ReactNode } from "react";


export const SecondaryButton = ({children, onClick,size = "small"}: {
    children:ReactNode,
    onClick: ()=>void
    size? : "big" | "small"
}) => {
    return <div onClick={onClick} className={`${size==="small" ? "text-sm" : "text-xl"}
    ${size==="small" ? "px-4 pt-2":"px-10 py-4"} cursor-pointer hover:shadow-md border text-black border-black rounded-full`}>
        {children}

>>>>>>> 9894bef806202badea46c64b1d2a8d02f946dd94
    </div>
}