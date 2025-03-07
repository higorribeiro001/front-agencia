import { useState } from "react";

export default function ColColor({success}: {success: boolean}) {
    const [phrase, setPhrase] = useState("Em conformidade");
    
    useState(() => {
        setPhrase(success ? "Em conformidade" : "Não está conforme");
    })

    return (
        <div className="rounded px-2 max-h-[30px!important] flex justify-center items-center mt-[10px]" style={success ? {color: 'green', backgroundColor: '#98FB98'} : {color: 'red', backgroundColor: '#FFC0CB'}}>
            <p className="break-all text-justify text-[14px] overflow-hidden text-ellipsis">{phrase}</p>
        </div>
    );
}