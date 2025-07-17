"use client"

import React from "react";
import { useRouter } from "next/navigation";

export default function CardTrip({ id, titulo, descricao, valor, avaliacao, data, vagas, FotoViagems }: Trip) {
    const route = useRouter();

    const convertDate = (isoDate: string) => {
        isoDate = isoDate.split('T')[0];
        const [year, month, day] = isoDate.split('-');
        return `${day}/${month}/${year}`;
    }

    return (
        <div className="rounded-lg shadow-lg h-full hover:scale-110 transition-transform duration-500 w-[300px]">
            <div className="card-marker-content">
                {FotoViagems && FotoViagems.map((item, index) => (
                    <div key={index}>
                        <img 
                            src={item.url}
                            alt="Local"
                            style={{
                                width: '300px',
                                height: '150px',
                                objectFit: 'cover',
                                borderRadius: '4px 4px 0 0',
                            }} 
                        />
                        <div className="p-1">
                            <div className="flex flex-row justify-between items-center p-1">
                                <button className="text-primary text-[16px] font-semibold">&lt;</button>
                                <span className="rounded px-2">{index+1}/{FotoViagems.length}</span>
                                <button className="text-primary text-[16px] font-semibold">&gt;</button>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="p-1">
                    <div className="flex flex-col gap-1 p-1">
                        <h3 className="text-primary text-[16px] font-bold w-[284px] truncate">{titulo}</h3>
                        <p className="text-primary text-[12px] text-justify font-normal h-[54px] line-clamp-3">
                            {descricao}
                        </p>
                        <div className="flex flex-row gap-1">
                            {Array.from({ length: avaliacao }).map((_, index) => (
                                <span key={index}>⭐</span>
                            ))}
                        </div>
                        <div className="flex flex-row!important gap-1 justify-between mt-1">
                            <div className="bg-green-300 shadow-md rounded p-1 text-green-700 text-center font-semibold w-1/2">
                                {convertDate(data)}
                            </div>
                            <div className="bg-green-300 shadow-md rounded p-1 text-green-700 text-center font-semibold w-1/2">
                                {vagas} vagas
                            </div>
                        </div>
                        <span className="my-2 text-[22px]">R$ {String(valor).replace('.', ',')}</span>
                        <button className="rounded border-[0.5px] border-primary border-solid text-primary font-medium p-2 hover:bg-primary hover:text-white transition-all duration-500"
                            onClick={() => route.replace('/manager/edit/'+id!)}
                        >
                            EDITAR
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}