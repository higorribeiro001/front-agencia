import { BaseProps } from "@/data/types";
import Sidebar from "../Sidebar";
import AlertApp from "../AlertApp";

export const Base: React.FC<BaseProps> = ({children, openAlert, isSuccess, messageAlert}) => {
    return (
        <div className="flex flex-row w-full bg-background h-screen overflow-hidden">
            <AlertApp 
                isOpen={openAlert!}
                isSuccess={isSuccess!}
                message={messageAlert!}
            />
            <Sidebar />
            <div className="px-10 py-5 overflow-auto flex flex-col justify-between w-full z-[1]">
                {children}
                <span className="text-gray-600 text-center text-[14px]">© concrem | 2025</span>
            </div>
        </div>
    );
}