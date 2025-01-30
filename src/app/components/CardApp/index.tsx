"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";

export const CardApp = ({image, title, subtitle, to}: Card) => {
    const router = useRouter();

    return (
        <div 
            className="rounded-md shadow-md bg-background w-[300px] h-[285px] hover:scale-110 transition-all cursor-pointer"
            onClick={() => router.replace(to)}
        >
            <Image 
                className="rounded-t-md"
                src={image} 
                alt="concrem"     
            />
            <div className="px-2 py-[3px] gap-1">
                <h3>
                    {title}
                </h3>
                <p
                    className="text-[11px] text-black2"
                >
                    {subtitle}
                </p>
            </div>
        </div>  
    );
}