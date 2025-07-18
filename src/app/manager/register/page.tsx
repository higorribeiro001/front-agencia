"use client"

import { Base } from "@/app/components/Base/layout";
import { Loading } from "@/app/components/Loading";
import { postImageTrip } from "@/app/service/api/imageTrip";
import { getLocation } from "@/app/service/api/location";
import { postTrip } from "@/app/service/api/trip";
import FormBuilder from "@/app/service/forms/FormBuilder";
import { ArrowBack } from "@mui/icons-material";
import { Button, IconButton, styled, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
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

export default function RegisterTrip() {
    const formFields = new FormBuilder()  
        .addTextField('titulo', 'Título *', 'text')
        .addTextField('descricao', 'Descrição *', 'text')
        .addTextField('dias', 'Dias *', 'number')
        .addTextField('valor', 'Valor (R$) *', 'text')
        .addTextField('avaliacao', 'Avaliação (0 a 5) *', 'number')
        .addTextField('cep', 'CEP *', 'text')
        .addTextField('data', 'Data *', 'date')
        .addTextField('vagas', 'Vagas *', 'number')
        .build();
        
    const [isLoading, setIsLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [lat, setLat] = useState(0.0);
    const [long, setLong] = useState(0.0);
    const [imageUpload, setImageUpload] = useState<File>()

    const initModel = [
        {
            label: '',
            name: 'titulo',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'descricao',
            value: '',
            error: '',
        }
        ,
        {
            label: '',
            name: 'dias',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'valor',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'avaliacao',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'cep',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'data',
            value: '',
            error: '',
        },
        {
            label: '',
            name: 'vagas',
            value: '',
            error: '',
        }
    ];
    
    const [model, setModel] = useState(initModel);

    const getGeo = async () => {
      const response = await getLocation(model[5].value);

      const data = response.data as GeoInterface;

      setLat(data.lat);
      setLong(data.lng);
    }

    useEffect(() => {
      if (model[5].value !== '') {
        getGeo();
      }
    }, [model[5].value]);

    const cleanFields = () => {
      setModel(initModel);
    }

    const changeValues = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        e.preventDefault()
        setModel((prevModel) => {
          const updateModel = [...prevModel];
          updateModel[index].value = e.target.value;
          if (updateModel[index].value === '') {
            updateModel[index].error = `Campo ${model[index].label} obrigatório.`;
          } else {
            updateModel[index].error = '';
          }
          return updateModel;
        });
    }

    const validator = (message: string, index: number) => {
        setModel((prevModel) => {
        const updateModel = [...prevModel];
        updateModel[index].error = message;
        return updateModel;
        });
    }

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        for (let i=0; i < model.length; i++) {
          if (model[i].value === '') {
            validator(`Campo ${model[i].label} obrigatório.`, i);
          } else {
            validator('', i);
          }
    
          if (model[i].error !== '') {
            return;
          }
        }
    
        setIsLoading(true);
    
        RegisterTrip();
    
      }
    
      const closeAlert = () => {
        setTimeout(() => {
          setOpenAlert(false);
        }, 6000);
      }
    
      const RegisterTrip = async () => {
        try {
          const response = await postTrip(
            { 
              titulo: model[0].value, 
              descricao: model[1].value, 
              dias: parseInt(model[2].value), 
              valor: parseFloat(model[3].value.replace(',', '.')),
              avaliacao: parseInt(model[4].value),
              data: model[6].value,
              vagas: parseInt(model[7].value),
              latitude: lat,
              longitude: long,
            });
    
          if (response.status === 201) {
            const formData = new FormData();
            formData.append('viagem_id', response?.data?.id ?? '');
            formData.append('foto', imageUpload!);
            
            await postImageTrip(formData);
            setOpenAlert(true);
            setMessageAlert('Registrado com sucesso!');
            setIsSuccess(true);
            cleanFields();
            closeAlert();
          }
        } catch (e: unknown) {
          const error = e as StatusResponse;
          if (error.response.status === 422) {
            setOpenAlert(true);
            setMessageAlert('Preencha todos os campos obrigatórios.');
            setIsSuccess(false);
    
            closeAlert();
          } else {
            setOpenAlert(true);
            setMessageAlert('Erro inesperado, por favor aguardo e tente novamente mais tarde.');
            setIsSuccess(false);
    
            closeAlert();
          }
        } finally {
          setIsLoading(false);
        }
    }
    
    return (
        <Base 
          title="Cadastro de viagem"
          openAlert={openAlert}
          isSuccess={isSuccess}
          messageAlert={messageAlert}
        >
          <div className="flex flex-col gap-6 w-full h-full z-10 relative animate-fade-up">
              <Loading 
                isOpen={isLoading}
              />
              <div className="flex flex-row w-full justify-between z-10 relative">
                  <IconButton href="/manager/trip">
                    <ArrowBack />
                  </IconButton>
                  <Button 
                      className="font-semibold w-[200px] h-[56px] z-10 relative"
                      variant="contained"
                      type="button"
                      color="error"
                      onClick={cleanFields}
                  >
                      Limpar campos
                  </Button>
              </div>
              <span className="font-semibold">
                  * Campos obrigatórios.
              </span>
              <form 
                  className="flex flex-col gap-10 w-full" 
                  onSubmit={submitForm}
              >
                  <div className="w-full flex flex-wrap justify-between gap-5 mb-10">
                    <div className="flex flex-col gap-2 w-[49%]">
                      <Button
                          component="label"
                          role={undefined}
                          variant="contained"
                          tabIndex={-1}
                          startIcon={<CloudUploadIcon />}
                          className="bg-primary w-full lg:w-[49%] h-[56px]"
                          sx={{bgcolor: "var(--primary)"}}
                      >
                          Buscar imagem
                          <VisuallyHiddenInput
                              type="file"
                              accept="image/jpeg, image/png, image/jpg"
                              onChange={(event) => setImageUpload(event.target.files![0])}
                              multiple
                          />
                      </Button>
                      <span>{ imageUpload?.name ?? '' }</span>
                    </div>
                    {formFields
                      .map((value, index) => ( 
                        <TextField
                          key={index}
                          className="w-full lg:w-[49%]"
                          label={value.label} 
                          variant="outlined"
                          type={value.type}
                          error={model[index].error !== '' ? true : false}
                          helperText={model[index].error}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => changeValues(e, index)}
                          value={model[index].value}
                        />
                      ))}
                  </div>
                  <div className="flex flex-row justify-between gap-2">
                    <Button 
                        className="border-[1px] border-solid font-semibold w-[200px] h-[56px]"
                        variant="outlined"
                        type="button"
                        sx={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}
                        href="/manager/trip"
                    >
                        Cancelar
                    </Button>
                    <Button 
                        className="bg-primary font-semibold w-[200px] h-[56px] z-[1]"
                        variant="contained"
                        type="submit"
                        sx={{bgcolor: "var(--primary)", color: '#FFFFFF'}}
                    >
                        Enviar
                    </Button>
                  </div>
              </form>
          </div>
        </Base>
    );
}