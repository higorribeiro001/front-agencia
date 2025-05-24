"use client"

import Image from "next/image";
import logoP from "../../../../public/assets/logo.png"
import arrow from "../../../../public/assets/close-menu.png";
import Link from "next/link";
import home from '../../../../public/assets/home.png';
import fazenda from '../../../../public/assets/fazenda.png';
import vaca from '../../../../public/assets/vaca.png';
import fases from '../../../../public/assets/fases.png';
import fornecedor from '../../../../public/assets/fornecedor.png';
import embalagem from '../../../../public/assets/embalagem.png';
import produto from '../../../../public/assets/produto.png';
import financeiro from '../../../../public/assets/financeiro.png';
import brinco from '../../../../public/assets/brinco.png';
import proprietario from '../../../../public/assets/proprietario.png';
import pesagem from '../../../../public/assets/pesagem.png';
import estoque from '../../../../public/assets/estoque.png';
import contas from '../../../../public/assets/contas.png';
import temaClaro from '../../../../public/assets/tema-claro.png';
import temaEscuro from '../../../../public/assets/tema-escuro.png';
// import usuarios from "../../../../public/assets/usuarios.png";
// import perfil from "../../../../public/assets/perfil.png";
import sair from "../../../../public/assets/sair.png";
import { Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { logout, me } from "@/app/service/api/auth";
import AlertApp from "../AlertApp";
import { DialogApp } from "../DialogApp";
import { usePathname } from "next/navigation";
import { getCookie } from "cookies-next";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function Sidebar() {
    const [isDark, setIsDark] = useState(false);
    const [isOpenChilds1, setIsOpenChilds1] = useState(false);
    const [isOpenChilds2, setIsOpenChilds2] = useState(false);
    const [isOpenChilds3, setIsOpenChilds3] = useState(false);
    const [isOpenChilds4, setIsOpenChilds4] = useState(false);

    const handleOpenOptions = (option: string) => {
        setIsExpanded(true);

        if (option === '/product') {
            setIsOpenChilds1(!isOpenChilds1);
        }

        if (option === '/financial') {
            setIsOpenChilds2(!isOpenChilds2);
        }

        if (option === '/earring') {
            setIsOpenChilds3(!isOpenChilds3);
        }

        if (option === '/stock') {
            setIsOpenChilds4(!isOpenChilds4);
        }
    }

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

    const optionsMenuAdmin: SidebarInterface[] = [
        {
            icon: <Image
                className="w-[15px] h-[15px]"
                src={fazenda} 
                alt="logo"     
            />,
            title: 'Fazenda',
            to: '/farm'
        },
        {
            icon: <Image
                className="w-[15px] h-[15px]"
                src={vaca} 
                alt="logo"     
            />,
            title: 'Cocho',
            to: '/cocho'
        },
        {
            icon: <Image
                className="w-[15px] h-[15px]"
                src={fases} 
                alt="logo"     
            />,
            title: 'Fase de Aplicação',
            to: '/application-phase'
        },
        {
            icon: <Image
                className="w-[15px] h-[15px]"
                src={fornecedor} 
                alt="logo"     
            />,
            title: 'Fornecedor',
            to: '/supplier'
        },
        {
            icon: <Image
                className="w-[15px] h-[15px]"
                src={produto} 
                alt="logo"     
            />,
            title: 'Produto',
            to: '/product',
            childs: [
                {
                    icon: <Image
                        className="w-[25px] h-[25px]" 
                        src={home} 
                        alt="logo"     
                    />,
                    title: 'Produtos',
                    to: '/products',
                },
                {
                    icon: <Image
                        className="w-[25px] h-[25px]" 
                        src={home} 
                        alt="logo"     
                    />,
                    title: 'TIPOS',
                    to: '/type-products',
                },
                {
                    icon: <Image
                        className="w-[25px] h-[25px]" 
                        src={home} 
                        alt="logo"     
                    />,
                    title: 'DESTINO',
                    to: '/destination',
                },
            ]
        },
        {
            icon: <Image
                className="w-[15px] h-[15px]"
                src={estoque} 
                alt="logo"     
            />,
            title: 'Estoque',
            to: '/stock',
            childs: [
                {
                    icon: <Image
                        className="w-[25px] h-[25px]" 
                        src={home} 
                        alt="logo"     
                    />,
                    title: 'Entrada',
                    to: '/input-product',
                },
                {
                    icon: <Image
                        className="w-[25px] h-[25px]" 
                        src={home} 
                        alt="logo"     
                    />,
                    title: 'Saída',
                    to: '/output-product',
                }
            ]
        },
        {
            icon: <Image
                className="w-[15px] h-[15px]"
                src={embalagem} 
                alt="logo"     
            />,
            title: 'Embalagem',
            to: '/packaging'
        },
        {
            icon: <Image
                className="w-[15px] h-[15px]"
                src={contas} 
                alt="logo"     
            />,
            title: 'Plano de Contas',
            to: '/chart-account'
        },
        {
            icon: <Image
                className="w-[15px] h-[15px]"
                src={financeiro} 
                alt="logo"     
            />,
            title: 'Financeiro',
            to: '/financial',
            childs: [
                {
                    icon: <Image
                        className="w-[25px] h-[25px]" 
                        src={home} 
                        alt="logo"     
                    />,
                    title: 'Receitas',
                    to: '/revenues',
                },
                {
                    icon: <Image
                        className="w-[25px] h-[25px]" 
                        src={home} 
                        alt="logo"     
                    />,
                    title: 'Despesas',
                    to: '/expenses',
                }
            ]
        },
        {
            icon: <Image
                className="w-[15px] h-[15px]"
                src={proprietario} 
                alt="logo"     
            />,
            title: 'Proprietário',
            to: '/owner',
        },
        {
            icon: <Image
                className="w-[15px] h-[15px]"
                src={brinco} 
                alt="logo"     
            />,
            title: 'Brinco',
            to: '/earring',
            childs: [
                {
                    icon: <Image
                        className="w-[25px] h-[25px]" 
                        src={home} 
                        alt="logo"     
                    />,
                    title: 'Brincos',
                    to: '/earrings',
                },
                {
                    icon: <Image
                        className="w-[25px] h-[25px]" 
                        src={home} 
                        alt="logo"     
                    />,
                    title: 'Baixa de Brinco',
                    to: '/earring-drop',
                },
            ]
        },
        {
            icon: <Image
                className="w-[15px] h-[15px]"
                src={pesagem} 
                alt="logo"     
            />,
            title: 'Pesagens',
            to: '/weighings'
        },
        // {
        //     icon: <Image
        //         className="w-[25px] h-[25px]" 
        //         src={usuarios} 
        //         alt="logo"     
        //     />,
        //     title: 'Usuários',
        //     to: '/users'
        // }
    ];

    const optionsMenuCariri: SidebarInterface[] = [
        {
            icon: <Image
                className="w-[15px] h-[15px]"
                src={fazenda} 
                alt="logo"     
            />,
            title: 'Fazenda',
            to: '/farm'
        },
        {
            icon: <Image
                className="w-[15px] h-[15px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Vendedores',
            to: '/seller'
        },
        {
            icon: <Image
                className="w-[15px] h-[15px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Clientes',
            to: '/client'
        },
        {
            icon: <Image
                className="w-[15px] h-[15px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Categorias',
            to: '/category'
        },
        {
            icon: <Image
                className="w-[15px] h-[15px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Rotas',
            to: '/route'
        },
        {
            icon: <Image
                className="w-[15px] h-[15px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Nº Transportes',
            to: '/transport'
        },
        {
            icon: <Image
                className="w-[15px] h-[15px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Placas',
            to: '/plate'
        },
        {
            icon: <Image
                className="w-[15px] h-[15px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Tipos de veículos',
            to: '/vehicle'
        },
        {
            icon: <Image
                className="w-[15px] h-[15px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Motoristas',
            to: '/driver'
        },
    ];

    const optionsMenuJuazeiro: SidebarInterface[] = [
        {
            icon: <Image
                className="w-[15px] h-[15px]"
                src={fazenda} 
                alt="logo"     
            />,
            title: 'Fazenda',
            to: '/farm'
        },
        {
            icon: <Image
                className="w-[15px] h-[15px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Vendedores',
            to: '/seller'
        },
        {
            icon: <Image
                className="w-[15px] h-[15px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Clientes',
            to: '/client'
        },
        {
            icon: <Image
                className="w-[15px] h-[15px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Categorias',
            to: '/category'
        },
        {
            icon: <Image
                className="w-[15px] h-[15px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Rotas',
            to: '/route'
        },
        {
            icon: <Image
                className="w-[15px] h-[15px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Nº Transportes',
            to: '/transport'
        },
        {
            icon: <Image
                className="w-[15px] h-[15px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Placas',
            to: '/plate'
        },
        {
            icon: <Image
                className="w-[15px] h-[15px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Tipos de veículos',
            to: '/vehicle'
        },
        {
            icon: <Image
                className="w-[15px] h-[15px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Motoristas',
            to: '/driver'
        }
    ];

    const optionsMenuPetrolina: SidebarInterface[] = [
        {
            icon: <Image
                className="w-[15px] h-[15px]"
                src={fazenda} 
                alt="logo"     
            />,
            title: 'Fazenda',
            to: '/farm'
        },
        {
            icon: <Image
                className="w-[15px] h-[15px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Vendedores',
            to: '/seller'
        },
        {
            icon: <Image
                className="w-[15px] h-[15px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Clientes',
            to: '/client'
        },
        {
            icon: <Image
                className="w-[15px] h-[15px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Categorias',
            to: '/category'
        },
        {
            icon: <Image
                className="w-[15px] h-[15px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Rotas',
            to: '/route'
        },
        {
            icon: <Image
                className="w-[15px] h-[15px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Nº Transportes',
            to: '/transport'
        },
        {
            icon: <Image
                className="w-[15px] h-[15px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Placas',
            to: '/plate'
        },
        {
            icon: <Image
                className="w-[15px] h-[15px]" 
                src={home} 
                alt="logo"     
            />,
            title: 'Tipos de veículos',
            to: '/vehicle'
        },
        {
            icon: <Image
                className="w-[15px] h-[15px]" 
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
        setIsOpenChilds1(false);
        setIsOpenChilds2(false);
        setIsOpenChilds3(false);
        setIsOpenChilds4(false);
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

    const [optionsMenu, setOptionsMenu] = useState<SidebarInterface[]>();

    useEffect(() => {
        profileUser()
        setOptionsMenu(role === 'admin' ? optionsMenuAdmin : role === 'cariri' ? optionsMenuCariri : role === 'juazeiro' ? optionsMenuJuazeiro : optionsMenuPetrolina);
    }, [role])

    return (
        <div className={isExpanded ? "flex flex-col justify-between w-[300px] bg-primary h-screen px-4 py-6 overflow-hidden transition-all fixed lg:relative z-[999]" : "flex flex-col justify-between items-center w-[105px] bg-primary h-screen px-4 py-6 overflow-hidden  transition-all"}>
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
            <div className="max-h-[800px] overflow-x-auto">
                {optionsMenu?.map((value, index) => (
                    <div
                        className={isExpanded ? "w-full transition-all flex flex-col cursor-pointer" : "w-[58px] h-[52px] flex justify-center items-center transition-all overflow-hidden cursor-pointer"}
                        key={index}
                        onClick={() => handleOpenOptions(value.to)}
                    >
                        <div
                            className={String(pathname).includes(value.to) ? "flex flex-row uppercase p-1 rounded-md bg-secondary mb-2 justify-between items-center" : "flex flex-row uppercase p-1 mb-2 justify-between items-center"}
                        >
                            {value.childs ? (
                                <div className={isExpanded 
                                    ? "flex items-center gap-2 h-[24px]" 
                                    : "flex flex-col items-center justify-center gap-1 py-2"}
                                >
                                    {value.icon}
                                    <p className={
                                        isExpanded 
                                            ? "text-background font-medium text-white" 
                                            : "text-white text-[7px] text-center"
                                    }>
                                        {value.title}
                                    </p>
                                </div>
                            ) : (
                                <Link 
                                    href={value.to}
                                >
                                    <div className={isExpanded 
                                        ? "flex items-center gap-2 h-[24px]" 
                                        : "flex w-[57px] rounded flex-col items-center justify-center gap-1 py-2"}
                                    >
                                        {value.icon}
                                        <p className={
                                            isExpanded 
                                                ? "text-background font-medium text-white" 
                                                : "text-white text-[7px] text-center"
                                        }>
                                            {value.title}
                                        </p>
                                    </div>
                                </Link>
                            )}
                            {isExpanded && (
                                <div key={index}>
                                {value.to === '/product' ? (
                                    value.childs && (
                                        <div>
                                            {isOpenChilds1 ? (
                                                <KeyboardArrowUpIcon className="text-white" />
                                            ) : (
                                                <KeyboardArrowDownIcon className="text-white" />
                                            )}
                                        </div>
                                    )
                                ) : value.to === '/financial' ? (
                                    value.childs && (
                                        <div>
                                            {isOpenChilds2 ? (
                                                <KeyboardArrowUpIcon className="text-white" />
                                            ) : (
                                                <KeyboardArrowDownIcon className="text-white" />
                                            )}
                                        </div>
                                    )
                                ) : value.to === '/stock' ? (
                                    value.childs && (
                                        <div>
                                            {isOpenChilds4 ? (
                                                <KeyboardArrowUpIcon className="text-white" />
                                            ) : (
                                                <KeyboardArrowDownIcon className="text-white" />
                                            )}
                                        </div>
                                    )
                                ) : (
                                    value.childs && (
                                        <div>
                                            {isOpenChilds4 ? (
                                                <KeyboardArrowUpIcon className="text-white" />
                                            ) : (
                                                <KeyboardArrowDownIcon className="text-white" />
                                            )}
                                        </div>
                                    )
                                )}
                            </div>
                            )}
                        </div>
                        {value.to === '/product' && (
                            <div className={isOpenChilds1 ? "w-full h-[120px] transition-all flex-col bg-secondaryMenu px-6 py-2 mb-5 gap-2" : "h-0 p-0 transition-all flex-col bg-secondaryMenu m-0"}>
                                {isOpenChilds1 && value.childs?.map((child, indexChild) => (
                                    <Link 
                                        key={indexChild}
                                        href={child.to}
                                        className="my-1"
                                    >
                                        <div className={String(pathname).includes(child.to) ? "flex items-center gap-2 h-[24px] my-2 rounded-md bg-secondary p-2" : "flex items-center gap-2 h-[24px] my-2  p-2"}>
                                            <p className="text-background font-medium text-[14px] text-white uppercase">{child.title}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                        {value.to === '/financial' && (
                            <div className={isOpenChilds2 ? "w-full h-[90px] transition-all flex-col bg-secondaryMenu px-6 py-2 mb-5 gap-2" : "h-0 p-0 transition-all flex-col bg-secondaryMenu m-0"}>
                                {isOpenChilds2 && value.childs?.map((child, indexChild) => (
                                    <Link 
                                        key={indexChild}
                                        href={child.to}
                                        className="my-1"
                                    >
                                        <div className={String(pathname).includes(child.to) ? "flex items-center gap-2 h-[24px] my-2 rounded-md bg-secondary p-2" : "flex items-center gap-2 h-[24px] my-2  p-2"}>
                                            <p className="text-background font-medium text-[14px] text-white uppercase">{child.title}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                        {value.to === '/earring' && (
                            <div className={isOpenChilds3 ? "w-full h-[90px] transition-all flex-col bg-secondaryMenu px-6 py-2 mb-5 gap-2" : "h-0 p-0 transition-all flex-col bg-secondaryMenu m-0"}>
                                {isOpenChilds3 && value.childs?.map((child, indexChild) => (
                                    <Link 
                                        key={indexChild}
                                        href={child.to}
                                        className="my-1"
                                    >
                                        <div className={String(pathname).includes(child.to) ? "flex items-center gap-2 h-[24px] my-2 rounded-md bg-secondary p-2" : "flex items-center gap-2 h-[24px] my-2  p-2"}>
                                            <p className="text-background font-medium text-[14px] text-white uppercase">{child.title}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                        {value.to === '/stock' && (
                            <div className={isOpenChilds4 ? "w-full h-[90px] transition-all flex-col bg-secondaryMenu px-6 py-2 mb-5 gap-2" : "h-0 p-0 transition-all flex-col bg-secondaryMenu m-0"}>
                                {isOpenChilds4 && value.childs?.map((child, indexChild) => (
                                    <Link 
                                        key={indexChild}
                                        href={child.to}
                                        className="my-1"
                                    >
                                        <div className={String(pathname).includes(child.to) ? "flex items-center gap-2 h-[24px] my-2 rounded-md bg-secondary p-2" : "flex items-center gap-2 h-[24px] my-2  p-2"}>
                                            <p className="text-background font-medium text-[14px] text-white uppercase">{child.title}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
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
                <div className="flex flex-col h-[120px] items-center">
                {/* <div
                    className={isExpanded ? "w-full transition-all" : "w-[58px] transition-all overflow-hidden"}
                >
                    <div
                        className={ pathname === '/profile' ? "uppercase p-1 rounded-md bg-secondary mt-6 mb-2" : "uppercase p-1 mt-6 mb-2"}
                    >
                        <Link 
                            href={'/profile'}
                        >
                            <div className={isExpanded 
                                ? "flex items-center gap-2 h-[24px]" 
                                : "flex flex-col items-center justify-center gap-1 py-2"}
                            >
                                <Image
                                    className="w-[15px] h-[15px]" 
                                    src={perfil} 
                                    alt="logo"     
                                />
                                <p className={
                                    isExpanded 
                                        ? "text-background font-medium text-white" 
                                        : "text-white text-[7px] text-center"
                                }>PERFIL</p>
                            </div>
                        </Link>
                    </div>
                </div> */}
                <div
                    className={isExpanded ? "w-full transition-all mb-2" : "w-[58px] transition-all overflow-hidden mb-2"}
                >
                    <div
                        className="uppercase p-1"
                    >
                        <button 
                            className={isExpanded 
                                ? "flex items-center gap-2 h-[24px]" 
                                : "flex flex-col items-center justify-center gap-1 py-2"}
                            onClick={toggleTheme}
                        >
                            <Image
                                className="w-[15px] h-[15px]" 
                                src={isDark ? temaClaro : temaEscuro} 
                                alt="logo"     
                            />
                            <p className={
                                isExpanded 
                                    ? "text-background font-medium text-white" 
                                    : "text-white text-[7px] text-center"
                            }>{isDark ? 'MODO CLARO' : 'MODO ESCURO'}</p>
                        </button>
                    </div>
                </div>
                <div
                    className={isExpanded ? "w-full transition-all" : "w-[58px] transition-all overflow-hidden"}
                >
                    <div
                        className={ pathname === '/logout' ? "flex justify-center items-center uppercase p-1 rounded-md bg-secondary" : "flex justify-center items-center uppercase p-1"}
                    >
                        <button 
                            className={isExpanded 
                                ? "flex items-center gap-2 h-[24px]" 
                                : "flex flex-col items-center justify-center gap-1 py-2"}
                            onClick={handleDialog}
                        >
                            <Image
                                className="w-[15px] h-[15px]" 
                                src={sair} 
                                alt="logo"     
                            />
                            <p className={
                                isExpanded 
                                    ? "text-background font-medium text-white" 
                                    : "text-white text-[7px] text-center"
                            }>SAIR</p>
                        </button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}