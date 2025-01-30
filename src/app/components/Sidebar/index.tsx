"use client"

import Image from "next/image";
import logoP from "../../../../public/assets/logo_pequeno.svg"
import logoG from "../../../../public/assets/logo_concrem_grande.png";
import arrow from "../../../../public/assets/close-menu.svg";
import Link from "next/link";
import home from "../../../../public/assets/home.svg";
import porta from "../../../../public/assets/porta.svg";
import recobrimento from "../../../../public/assets/recobrimento.svg";
import custo from "../../../../public/assets/custo.svg";
import perfil from "../../../../public/assets/perfil.svg";
import sair from "../../../../public/assets/sair.svg";
import { Divider } from "@mui/material";
import { useState } from "react";

export default function Sidebar() {
    const optionsMenu = [
        {
            icon: <Image
                className="w-[25px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Principal',
            to: '/home'
        },
        {
            icon: <Image
                className="w-[25px]" 
                src={porta} 
                alt="logo"     
            />,
            title: 'Kit de porta',
            to: '/products'
        },
        {
            icon: <Image
                className="w-[25px]" 
                src={recobrimento} 
                alt="logo"     
            />,
            title: 'Recobrimento',
            to: '/covering'
        },
        {
            icon: <Image
                className="w-[25px]" 
                src={custo} 
                alt="logo"     
            />,
            title: 'custos',
            to: '/cost'
        }
    ];

    const pathname = location.pathname;
    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpandedMenu = () => {
        setIsExpanded(!isExpanded);
    }

    return (
        <div className={isExpanded ? "flex flex-col justify-between w-[300px] bg-primary h-[100vh] px-4 py-6 overflow-hidden  transition-all" : "flex flex-col justify-between w-[63px] bg-primary h-[100vh] px-4 py-6 overflow-hidden  transition-all"}>
            <div className="flex flex-row justify-between mb-16">
                <Image 
                    className={isExpanded ? "max-w-[200px] max-h-[80px] transition-all" : "w-[120px] transition-all cursor-pointer"}
                    src={isExpanded ? logoG : logoP} 
                    alt="logo" 
                    onClick={handleExpandedMenu}    
                />
                <button
                    onClick={handleExpandedMenu}
                >
                    <Image
                        className="w-[35px]" 
                        src={arrow} 
                        alt="arrow"     
                    />
                </button>
            </div>
            <div className="h-[380px]">
                {optionsMenu.map((value, index) => (
                    <div
                        className={isExpanded ? "w-full transition-all" : "w-[30px] transition-all overflow-hidden"}
                        key={index}
                    >
                        <div
                            className={value.to === pathname ? "uppercase p-1 rounded-md bg-secondary mb-4" : "uppercase p-1 mb-4"}
                        >
                            <Link 
                                href={value.to}
                            >
                                <div className="flex gap-2">
                                    {value.icon}
                                    <p className="text-background font-medium">{value.title}</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex flex-col">
                <Divider className="bg-background" />
                <div
                    className={isExpanded ? "w-full transition-all" : "w-[30px] transition-all overflow-hidden"}
                >
                    <div
                        className={ pathname === '/profile' ? "uppercase p-1 rounded-md bg-secondary mt-6 mb-4" : "uppercase p-1 mt-6 mb-4"}
                    >
                        <Link 
                            href={'/profile'}
                        >
                            <div className="flex gap-2">
                                <Image
                                    className="w-[25px]" 
                                    src={perfil} 
                                    alt="logo"     
                                />
                                <p className="text-background font-medium">PERFIL</p>
                            </div>
                        </Link>
                    </div>
                </div>
                <div
                    className={isExpanded ? "w-full transition-all" : "w-[30px] transition-all overflow-hidden"}
                >
                    <div
                        className={ pathname === '/profile' ? "uppercase p-1 rounded-md bg-secondary" : "uppercase p-1"}
                    >
                        <button className="flex gap-2">
                            <Image
                                className="w-[25px]" 
                                src={sair} 
                                alt="logo"     
                            />
                            <p className="text-background font-medium">SAIR</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}