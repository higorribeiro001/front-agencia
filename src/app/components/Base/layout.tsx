import AlertApp from "../AlertApp";
import { Divider } from "@mui/material";

export const Base: React.FC<BaseProps> = ({children, openAlert, isSuccess, messageAlert, title}) => {
    return (
        <div className="flex flex-row w-full h-screen overflow-hidden z-[998]">
            <AlertApp 
                isOpen={openAlert!}
                isSuccess={isSuccess!}
                message={messageAlert!}
            />
            <div className="px-5 lg:px-10 py-5 overflow-auto flex flex-col justify-between w-full z-[1] gap-3">
                <div className="flex flex-col animate-fade-left transition-all mb-8">
                    <div className="flex flex-row justify-between gap-2">
                        <h1 className="text-[24px] lg:text-[30px] font-semibold">Vaiali</h1>
                    </div>
                    <p className="uppercase mb-5">{title}</p>
                    <Divider className="bg-black2" />
                </div>
                <div className="flex-grow">
                    {children}
                </div>
                <footer className="flex justify-center mt-12 w-full">
                    <span className="text-gray-600 text-center text-[14px]">© agencia | 2025</span>
                </footer>
                <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
                    integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="/>
            </div>
        </div>
    );
}