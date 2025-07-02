import {useState} from "react";

const useCustomChange=()=>{
    const[isChange,setChange]=useState(false);

    const setTrue=()=>setChange(true);
    const setFalse=()=>setChange(false);
    return {isChange, setTrue, setFalse};
}; 
export default useCustomChange;
