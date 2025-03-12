import { useEffect, useState } from "react";

export default function ColColor({success, approved}: {success: boolean; approved: boolean;}) {
    const [phrase, setPhrase] = useState("Em conformidade");
    
    useEffect(() => {
        setPhrase(success ? "Em conformidade" : approved ? "Não conformidade aprovada" : "Não está conforme");
    }, [success, approved])

    return (
        <div className="rounded px-2 max-h-[30px!important] flex justify-center items-center mt-[10px]" style={success ? {color: 'green', backgroundColor: '#98FB98'} : approved ? {color: 'orange', backgroundColor: '#F0E68C'} : {color: 'red', backgroundColor: '#FFC0CB'}}>
            <p className="break-all text-justify text-[14px] overflow-hidden text-ellipsis">{phrase}</p>
        </div>
    );
}