import { ComponentProps } from "react";


interface ButtonType{
    name:string,
    onClick:()=>void
}
export default function Button({className,name,onClick}:ButtonType & ComponentProps<'button'>){


    return <button type="submit" className={`${className} cursor-pointer`} name={name} onClick={onClick}>
    {name}
    </button>
}