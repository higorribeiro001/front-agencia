"use client"

import Image from "next/image";
import logo from "../../../public/assets/logo.png";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function NotAccess() {
    const router = useRouter();

    return (
        <div className="flex flex-col w-full bg-primary h-screen items-center justify-between p-12">
            <div className="flex flex-col gap-2 h-full">
                <Image 
                    className={"max-w-[200px] transition-all"}
                    src={logo} 
                    alt="logo"  
                />
                <div className="flex flex-col gap-10">
                    <p className="text-background text-center">Oopss! Você não possui permissão para acessar esta página.</p>
                    <Button 
                        className="bg-background text-primary font-semibold h-[56px]"
                        variant="contained"
                        type="button"
                        onClick={() => router.back()}
                        style={{background: "white"}}
                    >
                        página anterior
                    </Button>
                </div>
            </div>
            <span className="text-background text-center text-[14px]">© agencia | 2025</span>
        </div>
    );
}