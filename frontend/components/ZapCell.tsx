
<<<<<<< HEAD
export const ZapCell = ({
    name,
    index,
    onClick
}: {
    name?: string; 
    index: number;
    onClick: () => void;
}) => {
    return <div onClick={onClick} className="border border-black py-8 px-8 flex w-[300px] justify-center cursor-pointer">
=======



export const ZapCell = ({
    name,
    index
}:{
    name?:string,
    index:number,
}) =>{
    return <div className="border border-black py-8 px-8 flex w-[300px] justify-center cursor-pointer">
>>>>>>> 9894bef806202badea46c64b1d2a8d02f946dd94
        <div className="flex text-xl">
            <div className="font-bold">
                {index}. 
            </div>
            <div>
                {name}
            </div>
<<<<<<< HEAD
        </div>
=======
        
        </div>
       
>>>>>>> 9894bef806202badea46c64b1d2a8d02f946dd94
    </div>
}