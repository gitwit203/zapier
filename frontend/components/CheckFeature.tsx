
<<<<<<< HEAD
export const CheckFeature = ({label}: {
    label: string;
}) => {
    return <div className="flex">
        <div className="pr-4">
            <CheckMark />
=======



export const CheckFeature = ({label}:{label:string})=>{
    return <div className="flex">
        <div className="pr-4">
            <CheckMark/>
>>>>>>> 9894bef806202badea46c64b1d2a8d02f946dd94
        </div>
        {label}
    </div>
}

<<<<<<< HEAD
function CheckMark() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="green" className="size-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
=======
function CheckMark(){
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
    stroke-width="1.5" stroke="green" className="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
>>>>>>> 9894bef806202badea46c64b1d2a8d02f946dd94
  
}