"use client"

import { styled } from '@mui/material/styles';
import { Button, TextField } from "@mui/material";
import { Base } from "../components/Base/layout";
import React, { ChangeEvent, useEffect, useState } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { postOrder } from '../service/api/orders';
import { StatusResponse } from '@/data/types';
import { Loading } from '../components/Loading';

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

export default function Home() {

    const [freight, setFreight] = useState('');
    const [fileUpload, setFileUpload] = useState<File>()
    const [isLoading, setIsLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');

    const closeAlert = () => {
        setTimeout(() => {
            setOpenAlert(false);
        }, 6000);
    }

    useEffect(() => {
        const uploadPdf = async () => {
            try {
                const formData = new FormData();
                formData.append('file', fileUpload!)
                formData.append('lista_descontos_montagem', '[]')
                
                const response = await postOrder(formData);
        
                if (response.status === 201) {
                    setOpenAlert(true);
                    setMessageAlert('Importação realizada com sucesso com sucesso!');
                    setIsSuccess(true);
                    closeAlert();
                }
            } catch (e: unknown) {
                setOpenAlert(true);
                setMessageAlert('Erro inesperado, por favor aguardo e tente novamente mais tarde.');
                setIsSuccess(false);
        
                closeAlert();
            } finally {
                setIsLoading(false);
            }
        }

        uploadPdf();
    }, [fileUpload]);

    return (
        <Base title="Principal">
            <Loading 
                isOpen={isLoading}
            />
            <div className="w-full h-full animate-fade-up flex flex-wrap">
                <div className="sm:w-1/5 w-full flex flex-col">
                    <form 
                        className='flex flex-col gap-2' 
                    >
                        <p className='text-justify'>Importe um arquivo em formato de PDF, você pode clicar no botão abaixo e selecionar o documento desejado.</p>
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                        >
                            Importar arquivo
                            <VisuallyHiddenInput
                                type="file"
                                onChange={(event) => setFileUpload(event.target.files![0])}
                                multiple
                            />
                        </Button>
                        {/* Agora defina o valor do frete por kit
                        <TextField
                            className="w-full"
                            label="Valor do frete/kit" 
                            variant="outlined"
                            type="number"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setFreight(e.target.value)}
                            value={freight}
                        /> */}
                    </form>
                </div>
            </div>
        </Base>
    );
}