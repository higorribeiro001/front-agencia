"use client"

import Image from "next/image";
import logoP from "../../../../public/assets/logo_pequeno.svg"
import logoG from "../../../../public/assets/logo_concrem_grande.png";
import arrow from "../../../../public/assets/close-menu.png";
import Link from "next/link";
import home from "../../../../public/assets/home.png";
import porta from "../../../../public/assets/porta.png";
import recobrimento from "../../../../public/assets/recobrimento.png";
import custo from "../../../../public/assets/custo.png";
import perfil from "../../../../public/assets/perfil.png";
import sair from "../../../../public/assets/sair.png";
import { Divider } from "@mui/material";
import { useState } from "react";
import { logout } from "@/app/service/api/auth";
import { useRouter } from "next/navigation";
import AlertApp from "../AlertApp";
import { DialogApp } from "../DialogApp";
import { usePathname } from "next/navigation";

export default function Sidebar() {
    const optionsMenu = [
        {
            icon: <Image
                className="w-[25px] h-[25px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Principal',
            to: '/home'
        },
        {
            icon: <Image
                className="w-[25px] h-[25px]" 
                src={porta} 
                alt="logo"     
            />,
            title: 'Kit de porta',
            to: '/products'
        },
        {
            icon: <Image
                className="w-[25px] h-[25px]" 
                src={recobrimento} 
                alt="logo"     
            />,
            title: 'Recobrimento',
            to: '/covering'
        },
        {
            icon: <Image
                className="w-[25px] h-[25px]" 
                src={custo} 
                alt="logo"     
            />,
            title: 'custos',
            to: '/cost'
        }
    ];

    const pathname = usePathname();
    const [isExpanded, setIsExpanded] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const handleExpandedMenu = () => {
        setIsExpanded(!isExpanded);
    }

    const [openAlert, setOpenAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const router = useRouter();
    
    const closeAlert = () => {
        setTimeout(() => {
          setOpenAlert(false);
        }, 6000);
    }

    const handleDialog = () => {
        setOpenDialog(true);
    }

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleLogout = async () => {
        const response = await logout();
        if (response.status === 200) {
            setOpenAlert(true);
            setMessageAlert('O token de acesso foi adicionado à lista negra.');
            setIsSuccess(true);
            
            closeAlert();
            router.replace('/');
        }
    }

    return (
        <div className={isExpanded ? "flex flex-col justify-between w-[300px] bg-primary h-screen px-4 py-6 overflow-hidden  transition-all" : "flex flex-col justify-between w-[63px] bg-primary h-screen px-4 py-6 overflow-hidden  transition-all"}>
            <DialogApp 
                isOpen={openDialog}
                title="Sair"
                content="Deseja realmente sair?"
                func={handleLogout}
                handleClose={handleClose}
            />
            <div className="flex flex-row justify-between mb-16">
                <Image 
                    className={isExpanded ? "max-w-[180px] transition-all" : "w-[120px] transition-all cursor-pointer"}
                    src={isExpanded ? logoG : logoP} 
                    alt="logo" 
                    onClick={handleExpandedMenu}    
                />
                <button
                    onClick={handleExpandedMenu}
                >
                    <Image
                        className="w-[25px]" 
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
                            className={String(pathname).includes(value.to) ? "uppercase p-1 rounded-md bg-secondary mb-4" : "uppercase p-1 mb-4"}
                        >
                            <Link 
                                href={value.to}
                            >
                                <div className="flex gap-2 h-[24px]">
                                    {value.icon}
                                    <p className="text-background font-medium">{value.title}</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <AlertApp 
                isOpen={openAlert}
                isSuccess={isSuccess}
                message={messageAlert}
            />
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
                            <div className="flex gap-2 h-[24px]">
                                <Image
                                    className="w-[25px] h-[25px]" 
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
                        <button 
                            className="flex gap-2 h-[24px]"
                            onClick={handleDialog}
                        >
                            <Image
                                className="w-[25px] h-[25px]" 
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