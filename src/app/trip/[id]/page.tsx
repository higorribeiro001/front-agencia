"use client"

import React, { useEffect, useState } from "react";
import Image from "next/image";
import qrcode from '../../../../public/assets/qrcode.png';
import { Base } from "@/app/components/Base/layout";
import { Loading } from "@/app/components/Loading";
import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { trip } from "@/app/service/api/trip";
import TripAdapt from "@/app/service/adapt/TripAdapt";

export default function EditTrip({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
      
  const [isLoading, setIsLoading] = useState(false);

  const [tripData, setTripData] = useState<Trip>();

  const convertDate = (isoDate: string) => {
      isoDate = isoDate.split('T')[0];
      const [year, month, day] = isoDate.split('-');
      return `${day}/${month}/${year}`;
  }

  const getTrip = async () => {
    setIsLoading(true);
    const response = await trip(resolvedParams.id);

    const tripAdapt = new TripAdapt(response!);

    const tripData = tripAdapt.externalTripAdapt;

    setTripData(tripData);

    setIsLoading(false);
  }

  useEffect(() => {
    getTrip();
  }, []);
  
  return (
      <Base 
        title="Viagem"
      >
        <div className="flex flex-col gap-6 w-full h-full z-10 relative animate-fade-up">
            <Loading 
              isOpen={isLoading}
            />
            <div className="flex flex-row w-full justify-between z-10 relative">
                <IconButton href="/maps">
                  <ArrowBack />
                </IconButton>
            </div>
            {tripData && (
              <div className="flex flex-wrap gap-3 justify-between">
                <div className="w-full lg:w-3/5 flex flex-wrap gap-2">
                  {tripData.FotoViagems && <img 
                      src={tripData.FotoViagems[0].url}
                      alt="Local"
                      className="w-full lg:w-[300px] h-[250px] lg:h-[200px]"
                      style={{
                          objectFit: 'cover',
                          borderRadius: '4px 4px 0 0',
                      }} 
                  />}
                  <div className="w-full lg:w-2/4">
                      <div className="flex flex-col gap-1 p-1">
                          <h3 className="text-primary text-[16px] font-bold w-[284px] truncate">{tripData.titulo}</h3>
                          <p className="text-primary text-[12px] text-justify font-normal h-[54px] line-clamp-3">
                              {tripData.descricao}
                          </p>
                          <div className="flex flex-row gap-1">
                              {Array.from({ length: tripData.avaliacao }).map((_, index) => (
                                  <span key={index}>⭐</span>
                              ))}
                          </div>
                          <div className="flex flex-row!important gap-1 justify-between mt-1">
                              <div className="bg-green-300 shadow-md rounded p-1 text-green-700 text-center font-semibold w-1/2">
                                  {convertDate(tripData.data)}
                              </div>
                              <div className="bg-green-300 shadow-md rounded p-1 text-green-700 text-center font-semibold w-1/2">
                                  {tripData.vagas} vagas
                              </div>
                          </div>
                          <span className="my-2 text-[22px]">R$ {String(tripData.valor).replace('.', ',')}</span>
                      </div>
                  </div>
                </div>
                <div className="flex flex-col w-2/4 lg:w-1/4">
                    <h3 className="font-semibold">
                        Garanta a sua vaga
                    </h3>
                    <div className="flex justify-center items-center p-3 w-3/4">
                      <Image src={qrcode} alt="Qrcode" className="w-full h-full" width={150} height={150} />
                    </div>
                </div>
              </div>
            )}
        </div>
      </Base>
  );
}