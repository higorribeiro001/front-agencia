"use client"

import React, { useEffect, useState } from "react";
import { Base } from "@/app/components/Base/layout";
import CardTrip from "@/app/components/CardTrip";
import { trips } from "@/app/service/api/trip";
import TripsAdapt from "@/app/service/adapt/TripsAdapt";

export default function Viagens() {
    const [openAlert, setOpenAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [listTrips, setListTrips] = useState<Trip[]>([]);

    const getTrips = async () => {
        const response = await trips();
        const tripAdapt = new TripsAdapt(response?.data!);
    
        const tripData = tripAdapt.externalTripsAdapt;
    
        setListTrips(tripData);
    }

    useEffect(() => {
        getTrips();
    }, []);

    return (
        <Base
            openAlert={openAlert}
            isSuccess={isSuccess}
            messageAlert={messageAlert}
            title="Viagens"
        >
            <div className="flex flex-wrap gap-12 justify-center lg:justify-between">
                {listTrips.map((item, index) => (
                    <CardTrip 
                        key={index}
                        id={item.id}
                        titulo={item.titulo}
                        descricao={item.descricao}
                        dias={item.dias}
                        valor={item.valor}
                        avaliacao={item.avaliacao}
                        latitude={item.latitude}
                        longitude={item.longitude}
                        data={item.data}
                        vagas={item.vagas}
                    />
                ))}
            </div>
        </Base>
    );
}