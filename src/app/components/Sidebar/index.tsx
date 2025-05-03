"use client"

import Image from "next/image";
import logoP from "../../../../public/assets/logo.png"
import arrow from "../../../../public/assets/close-menu.png";
import Link from "next/link";
import home from '../../../../public/assets/home.png';
import fazenda from '../../../../public/assets/fazenda.png';
import temaClaro from '../../../../public/assets/tema-claro.png';
import temaEscuro from '../../../../public/assets/tema-escuro.png';
import usuarios from "../../../../public/assets/usuarios.png";
import perfil from "../../../../public/assets/perfil.png";
import sair from "../../../../public/assets/sair.png";
import { Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { logout, me } from "@/app/service/api/auth";
import AlertApp from "../AlertApp";
import { DialogApp } from "../DialogApp";
import { usePathname } from "next/navigation";
import { getCookie } from "cookies-next";

export default function Sidebar() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const html = document.documentElement;
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark') {
            html.classList.add('dark');
            setIsDark(true);
        }
    }, []);

    const toggleTheme = () => {
        const html = document.documentElement;
        if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        setIsDark(false);
        } else {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        setIsDark(true);
        }
  };

    const optionsMenuAdmin: { icon: React.ReactElement; title: string; to: string; }[] = [
        {
            icon: <Image
                className="w-[25px] h-[25px]" 
                src={fazenda} 
                alt="logo"     
            />,
            title: 'Fazenda',
            to: '/farm'
        },
        {
            icon: <Image
                className="w-[25px] h-[25px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Cocho',
            to: '/cocho'
        },
        {
            icon: <Image
                className="w-[25px] h-[25px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Teste',
            to: '/test'
        },
        {
            icon: <Image
                className="w-[25px] h-[25px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Vendedores',
            to: '/seller'
        },
        {
            icon: <Image
                className="w-[25px] h-[25px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Clientes',
            to: '/client'
        },
        {
            icon: <Image
                className="w-[25px] h-[25px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Categorias',
            to: '/category'
        },
        {
            icon: <Image
                className="w-[25px] h-[25px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Rotas',
            to: '/route'
        },
        {
            icon: <Image
                className="w-[25px] h-[25px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Nº Transportes',
            to: '/transport'
        },
        {
            icon: <Image
                className="w-[25px] h-[25px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Placas',
            to: '/plate'
        },
        {
            icon: <Image
                className="w-[25px] h-[25px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Tipos de veículos',
            to: '/vehicle'
        },
        {
            icon: <Image
                className="w-[25px] h-[25px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Motoristas',
            to: '/driver'
        },
        {
            icon: <Image
                className="w-[25px] h-[25px]" 
                src={usuarios} 
                alt="logo"     
            />,
            title: 'Usuários',
            to: '/users'
        }
    ];

    const optionsMenuCariri: { icon: React.ReactElement; title: string; to: string; }[] = [
        {
            icon: <Image
                className="w-[25px] h-[25px]" 
                src={fazenda} 
                alt="logo"     
            />,
            title: 'Fazenda',
            to: '/farm'
        },
        {
            icon: <Image
                className="w-[25px] h-[25px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Vendedores',
            to: '/seller'
        },
        {
            icon: <Image
                className="w-[25px] h-[25px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Clientes',
            to: '/client'
        },
        {
            icon: <Image
                className="w-[25px] h-[25px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Categorias',
            to: '/category'
        },
        {
            icon: <Image
                className="w-[25px] h-[25px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Rotas',
            to: '/route'
        },
        {
            icon: <Image
                className="w-[25px] h-[25px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Nº Transportes',
            to: '/transport'
        },
        {
            icon: <Image
                className="w-[25px] h-[25px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Placas',
            to: '/plate'
        },
        {
            icon: <Image
                className="w-[25px] h-[25px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Tipos de veículos',
            to: '/vehicle'
        },
        {
            icon: <Image
                className="w-[25px] h-[25px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Motoristas',
            to: '/driver'
        },
    ];

    const optionsMenuJuazeiro: { icon: React.ReactElement; title: string; to: string; }[] = [
        {
            icon: <Image
                className="w-[25px] h-[25px]" 
                src={fazenda} 
                alt="logo"     
            />,
            title: 'Fazenda',
            to: '/farm'
        },
        {
            icon: <Image
                className="w-[25px] h-[25px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Vendedores',
            to: '/seller'
        },
        {
            icon: <Image
                className="w-[25px] h-[25px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Clientes',
            to: '/client'
        },
        {
            icon: <Image
                className="w-[25px] h-[25px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Categorias',
            to: '/category'
        },
        {
            icon: <Image
                className="w-[25px] h-[25px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Rotas',
            to: '/route'
        },
        {
            icon: <Image
                className="w-[25px] h-[25px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Nº Transportes',
            to: '/transport'
        },
        {
            icon: <Image
                className="w-[25px] h-[25px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Placas',
            to: '/plate'
        },
        {
            icon: <Image
                className="w-[25px] h-[25px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Tipos de veículos',
            to: '/vehicle'
        },
        {
            icon: <Image
                className="w-[25px] h-[25px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Motoristas',
            to: '/driver'
        }
    ];

    const optionsMenuPetrolina: { icon: React.ReactElement; title: string; to: string; }[] = [
        {
            icon: <Image
                className="w-[25px] h-[25px]" 
                src={fazenda} 
                alt="logo"     
            />,
            title: 'Fazenda',
            to: '/farm'
        },
        {
            icon: <Image
                className="w-[25px] h-[25px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Vendedores',
            to: '/seller'
        },
        {
            icon: <Image
                className="w-[25px] h-[25px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Clientes',
            to: '/client'
        },
        {
            icon: <Image
                className="w-[25px] h-[25px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Categorias',
            to: '/category'
        },
        {
            icon: <Image
                className="w-[25px] h-[25px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Rotas',
            to: '/route'
        },
        {
            icon: <Image
                className="w-[25px] h-[25px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Nº Transportes',
            to: '/transport'
        },
        {
            icon: <Image
                className="w-[25px] h-[25px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Placas',
            to: '/plate'
        },
        {
            icon: <Image
                className="w-[25px] h-[25px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Tipos de veículos',
            to: '/vehicle'
        },
        {
            icon: <Image
                className="w-[25px] h-[25px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Motoristas',
            to: '/driver'
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
            window.location.href = '/';
        }
    }

    const role = getCookie("role");

    const profileUser = async () => {
        await me();
    }

    const [optionsMenu, setOptionsMenu] = useState<{ icon: React.ReactElement; title: string; to: string; }[]>();

    useEffect(() => {
        profileUser()
        setOptionsMenu(role === 'admin' ? optionsMenuAdmin : role === 'cariri' ? optionsMenuCariri : role === 'juazeiro' ? optionsMenuJuazeiro : optionsMenuPetrolina);
    }, [role])

    return (
        <div className={isExpanded ? "flex flex-col justify-between w-[300px] bg-primary h-screen px-4 py-6 overflow-hidden transition-all fixed lg:relative z-[999]" : "flex flex-col justify-between w-[63px] bg-primary h-screen px-4 py-6 overflow-hidden  transition-all"}>
            <DialogApp 
                isOpen={openDialog}
                title="Sair"
                content="Deseja realmente sair?"
                func={handleLogout}
                handleClose={handleClose}
            />
            <div className="flex flex-row justify-between mb-2">
                <Image 
                    className={isExpanded ? "max-w-[80px] transition-all" : "w-[80px] transition-all cursor-pointer"}
                    src={logoP} 
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
            <div className="h-[500px]">
                {optionsMenu?.map((value, index) => (
                    <div
                        className={isExpanded ? "w-full transition-all" : "w-[30px] transition-all overflow-hidden"}
                        key={index}
                    >
                        <div
                            className={String(pathname).includes(value.to) ? "uppercase p-1 rounded-md bg-secondary mb-2" : "uppercase p-1 mb-2"}
                        >
                            <Link 
                                href={value.to}
                            >
                                <div className="flex gap-2 h-[24px]">
                                    {value.icon}
                                    <p className="text-background font-medium text-white">{value.title}</p>
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
                <Divider className="bg-white" />
                <div
                    className={isExpanded ? "w-full transition-all" : "w-[30px] transition-all overflow-hidden"}
                >
                    <div
                        className={ pathname === '/profile' ? "uppercase p-1 rounded-md bg-secondary mt-6 mb-2" : "uppercase p-1 mt-6 mb-2"}
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
                                <p className="text-background font-medium text-white">PERFIL</p>
                            </div>
                        </Link>
                    </div>
                </div>
                <div
                    className={isExpanded ? "w-full transition-all mb-2" : "w-[30px] transition-all overflow-hidden mb-2"}
                >
                    <div
                        className="uppercase p-1"
                    >
                        <button 
                            className="flex gap-2 h-[24px]"
                            onClick={toggleTheme}
                        >
                            <Image
                                className="w-[25px] h-[25px]" 
                                src={isDark ? temaClaro : temaEscuro} 
                                alt="logo"     
                            />
                            <p className="text-background font-medium text-white">{isDark ? 'MODO CLARO' : 'MODO ESCURO'}</p>
                        </button>
                    </div>
                </div>
                <div
                    className={isExpanded ? "w-full transition-all" : "w-[30px] transition-all overflow-hidden"}
                >
                    <div
                        className={ pathname === '/logout' ? "uppercase p-1 rounded-md bg-secondary" : "uppercase p-1"}
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
                            <p className="text-background font-medium text-white">SAIR</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}