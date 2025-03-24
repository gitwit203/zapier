"use client";

<<<<<<< HEAD
export const Input = ({label, placeholder, onChange, type = "text"}: {
    label: string;
    placeholder: string;
    onChange: (e: any) => void;
    type?: "text" | "password"
}) => {
    return <div>
        <div className="text-sm pb-1 pt-2">
            * <label>{label}</label>
        </div>
        <input className="border rounded px-4 py-2 w-full border-black" type={type} placeholder={placeholder} onChange={onChange} />
=======


export const Input = ({label,placeholder,onChange,type="text"}:{
    label:string,
    placeholder:string,
    onChange: (e:any)=>void;
    type?: "text" | "password"
}) =>{
    return <div>
        <div className="text-sm pb-1 pt-2">
            *<label>{label}</label>
        </div>
        
        <input className="border rounded px-4 py-2 w-full border-black" 
        type={type} placeholder = {placeholder} onChange = {onChange}/>
>>>>>>> 9894bef806202badea46c64b1d2a8d02f946dd94
    </div>
}