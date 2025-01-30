import Sidebar from "../Sidebar";

export const Base: React.FC<BaseProps> = ({children}) => {
    return (
        <div className="flex flex-row w-full h-full bg-background">
            <Sidebar />
            <div className="px-10 py-5">
                {children}
            </div>
        </div>
    );
}