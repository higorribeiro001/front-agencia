import { useEffect, useState } from "react";

export default function ColColor({message}: {message: string;}) {
    const [phrase, setPhrase] = useState("Em conformidade");
    

    return (
        <div className="rounded px-2 max-h-[30px!important] flex justify-center items-center mt-[10px]" style={message === 'finalizado' || message === 'ativo' ? {color: 'green', backgroundColor: '#98FB98'} : message === 'em transito' ? {color: 'orange', backgroundColor: '#F0E68C'} : message === 'carregando' ? {color: '#201D1E', backgroundColor: '#D9D9D9'} : {color: 'red', backgroundColor: '#FFC0CB'}}>
            <p className="break-all text-justify text-[14px] overflow-hidden text-ellipsis">{message}</p>
        </div>
    );
}