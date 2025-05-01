import Sidebar from "../Sidebar";
import AlertApp from "../AlertApp";
import { Button, Divider, styled } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export const Base: React.FC<BaseProps> = ({children, openAlert, isSuccess, messageAlert, title, uploadFile, handleUpload}) => {
    return (
        <div className="flex flex-row w-full bg-background h-screen overflow-hidden z-[998]">
            <AlertApp 
                isOpen={openAlert!}
                isSuccess={isSuccess!}
                message={messageAlert!}
            />
            <Sidebar />
            <div className="px-5 lg:px-10 py-5 overflow-auto flex flex-col justify-between w-full z-[1] gap-3">
                <div className="flex flex-col animate-fade-left transition-all mb-8">
                    <div className="flex flex-row justify-between">
                        <h1 className="text-primary text-[30px] font-semibold">VALE METÁLICOS</h1>
                        {uploadFile && (
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                                className="bg-primary"
                                sx={{bgcolor: "#FB3A04"}}
                            >
                                Importar arquivo
                                <VisuallyHiddenInput
                                    type="file"
                                    accept=".pdf, application/pdf"
                                    onChange={handleUpload}
                                    multiple
                                />
                            </Button>
                        )}
                    </div>
                    <p className="uppercase mb-5 text-foreground">{title}</p>
                    <Divider className="bg-black2" />
                </div>
                <div className="flex-grow">
                    {children}
                </div>
                <footer className="flex justify-center mt-12 w-full">
                    <span className="text-gray-600 text-center text-[14px]">© vale metalicos | 2025</span>
                </footer>
            </div>
        </div>
    );
}