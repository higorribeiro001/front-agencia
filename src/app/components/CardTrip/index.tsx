import React from "react";

export default function CardTrip() {
    return (
        <div className="rounded-lg shadow-lg h-full hover:scale-110 transition-transform duration-500 w-[300px]">
            <div className="card-marker-content">
                <img 
                    src="https://agencia-api-rest.onrender.com/images/1751835542930_10746.jpg" 
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
                        <span className="rounded px-2">1/1</span>
                        <button className="text-primary text-[16px] font-semibold">&gt;</button>
                    </div>
                    <div className="flex flex-col gap-1 p-1">
                        <h3 className="text-primary text-[16px] font-bold w-[284px] truncate">Salinópolis</h3>
                        <p className="text-primary text-[12px] text-justify font-normal h-[54px] line-clamp-3">
                            Viagem para a praia de Salinas, hospedagem em hotel 5 estrelas (Hotel Concha do Mar), com direito a 2 cafés da manhã.
                        </p>
                        <span>⭐⭐⭐⭐⭐</span>
                        <div className="flex flex-row!important gap-1 justify-between mt-1">
                        <div className="bg-green-300 shadow-md rounded p-1 text-green-700 text-center font-semibold w-1/2">
                            01/08/2025
                        </div>
                        <div className="bg-green-300 shadow-md rounded p-1 text-green-700 text-center font-semibold w-1/2">
                            50 vagas
                        </div>
                        </div>
                        <span className="my-2 text-[22px]">R$ 600,00</span>
                        <button className="rounded border-[0.5px] border-primary border-solid text-primary font-medium p-2 hover:bg-primary hover:text-white transition-all duration-500">
                            SABER MAIS
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}