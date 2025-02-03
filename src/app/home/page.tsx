"use client"

import { useEffect, useState } from "react";
import { Base } from "../components/Base/layout";
import { me } from "../service/api/auth";
import MeAdapt from "../service/adapt/MeAdapt";
import bianco from "../../../public/assets/Porta-de-Correr-Bianco.svg"
import capuccino from "../../../public/assets/Capuccino.svg"
import coins from "../../../public/assets/coins-1726618_640.svg"
import profile from "../../../public/assets/307ce493-b254-4b2d-8ba4-d12c080d6651.svg"
import { CardApp } from "../components/CardApp";
import { Skeleton } from "@mui/material";

export default function Home() {
    const [username, setUsername] = useState('');

    const [isLoadingSkeleton, setIsLoadingSkeleton] = useState(true);

    const listOptions = [
        {
            image: bianco,
            title: 'Kit de Porta',
            subtitle: 'Gerencimento de produtos.',
            to: '/products'
        },
        {
            image: capuccino,
            title: 'Recobrimento',
            subtitle: 'Definições de recobrimentos.',
            to: '/covering'
        },
        {
            image: coins,
            title: 'Descriminação de custo',
            subtitle: 'Definições de custos de produção.',
            to: '/cost'
        },
        {
            image: profile,
            title: 'Perfil',
            subtitle: 'Gerenciamento de perfil de usuário.',
            to: '/profile'
        }
    ];

    useEffect(() => {
        const getMe = async () => {
            const response = await me();
            const meAdapt = new MeAdapt(response!);

            setUsername(`, ${meAdapt.externalMeAdapt?.name}`);
        }

        getMe();

        setTimeout(() => {
            setIsLoadingSkeleton(false);
        }, 2000)
    }, []);

    return (
        <Base>
            <div>
                {isLoadingSkeleton ? (
                    <div>
                        <Skeleton variant="text" sx={{ fontSize: '2rem', width: '60%' }} />
                        <Skeleton variant="text" sx={{ fontSize: '1.2rem', marginBottom: '40px', width: '80%' }} />
                    </div>
                ) : (
                    <div>
                        <h1
                            className="font-medium text-[22px] text-primary mb-2"
                        >
                            Olá{username}! Seja bem-vindo(a)!
                        </h1>
                        <h2
                            className="text-[14px] mb-10"
                        >
                            Este sistema foi desenvolvido com o objetivo de trazer facilidade no registro e acompanhamento de custos de produção. Abaixo estão as principais páginas do sistema.
                        </h2>
                    </div>
                )}
                
                <div className="flex flex-wrap gap-10">
                    {listOptions.map((value, index) => (
                        isLoadingSkeleton ? (
                            <Skeleton key={index} variant="rounded" width={300} height={285} />
                        ) : (
                            <CardApp 
                                key={index}
                                image={value.image}
                                title={value.title}
                                subtitle={value.subtitle}
                                to={value.to}
                            />
                        )
                    ))}
                </div>
            </div>
        </Base>
    );
}