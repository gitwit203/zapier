
import { ReactNode } from "react";


export const DarkButton = ({children, onClick,size = "small"}: {
    children:ReactNode,
    onClick: ()=>void
    size? : "big" | "small"
}) => {
    return <div onClick={onClick} className={`flex flex-col justify-center px-8 py-2  cursor-pointer 
    hover:shadow-xl bg-purple-900 text-white rounded text-center`}>
        {children}

    </div>
}