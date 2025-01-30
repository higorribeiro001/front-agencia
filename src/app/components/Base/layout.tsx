import Sidebar from "../Sidebar";

export const Base: React.FC<BaseProps> = ({children}) => {
    return (
        <div className="flex flex-row w-full bg-background h-screen overflow-hidden">
            <Sidebar />
            <div className="px-10 py-5 overflow-auto flex flex-col justify-between">
                {children}
                <span className="text-gray-600 text-center text-[14px]">© concrem | 2025</span>
            </div>
        </div>
    );
}