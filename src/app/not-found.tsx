"use client"

import Image from "next/image";
import logo from "../../public/assets/logo.png";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="flex flex-col w-full bg-primary h-screen items-center justify-between p-12">
            <Image 
                className={"max-w-[200px] transition-all"}
                src={logo} 
                alt="logo"  
            />
            <div className="flex flex-col gap-10">
                <p className="text-background text-center">Oopss! Página não encontrada.</p>
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
            <span className="text-background text-center text-[14px]">© fazenda sao jose | 2025</span>
        </div>
    );
}