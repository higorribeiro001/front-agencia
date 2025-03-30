"use client"

import Image from "next/image";
import logo from "../../../public/assets/logo.png"
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React, { ChangeEvent, useState } from "react";
import { Button, TextField } from "@mui/material";
import FormBuilder from "../service/forms/FormBuilder";
import { login } from "../service/api/auth";
import AlertApp from "../components/AlertApp";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const formFields = new FormBuilder()
    .addTextField('email', 'E-mail', 'email')
    .addTextField('password', 'Senha', 'password')
    .build();

  const [isLoading, setIsLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [messageAlert, setMessageAlert] = useState('');
  const router = useRouter();

  const [model, setModel] = useState([
    {
      name: 'email',
      label: 'e-mail',
      value: '',
      error: '',
    },
    {
      name: 'password',
      label: 'senha',
      value: '',
      error: '',
    }
  ]);

  const changeValues = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
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

    changeLogin();

  }

  const closeAlert = () => {
    setTimeout(() => {
      setOpenAlert(false);
    }, 6000);
  }

  const role = getCookie('role');

  const changeLogin = async () => {
    try {
      const response = await login(model[0].value, model[1].value);

      if (response.status === 200) {
        setOpenAlert(true);
        setMessageAlert('Seja bem-vindo(a)!');
        setIsSuccess(true);
        
        closeAlert();
        router.replace(role === 'admin' ? '/cariri' : `${role}`);
      }
    } catch (e: unknown) {
      const error = e as StatusResponse;
      if (error.response.status === 403) {
        setOpenAlert(true);
        setMessageAlert('E-mail e/ou senha inválido(s)!');
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
    <div className="flex flex-row overflow-hidden justify-center w-full h-full m-0 p-0 bg-primary">
      <AlertApp 
        isOpen={openAlert}
        isSuccess={isSuccess}
        message={messageAlert}
      />
      <div className="w-[100%] h-full bg-background py-8 px-16 flex flex-col justify-between items-center animate-fade-up bg-primary">
        <div className="w-full h-full justify-center items-center flex">
          <div className="lg:w-[600px] w-[350px] p-10 flex flex-col justify-between items-center gap-10 rounded shadow-lg bg-white">
            <Image 
              className="w-[200px]"
              src={logo} 
              alt="logo"     
            />
            <div className="w-full">
              <h2 className="text-center text-primary text-[28px] font-medium mb-6">LOGIN</h2>
              <form 
                className="flex flex-col gap-10 w-full" 
                onSubmit={submitForm}
              >
                {formFields.map((value, index: number) => (
                  <TextField
                    key={index}
                    label={value.label} 
                    variant="outlined"
                    fullWidth
                    type={value.type === 'password' ? showPassword ? "text" : "password" : value.type}
                    InputProps={value.type === 'password' ? {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    } : {}}
                    error={model[index].error !== '' ? true : false}
                    helperText={model[index].error}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => changeValues(e, index)}
                    value={model[index].value}
                  />
                ))}
                <Button 
                  className="bg-primary font-semibold h-[56px]"
                  variant="contained"
                  type="submit"
                  loading={isLoading}
                  sx={{bgcolor: "#FB3A04"}}
                >
                  Entrar
                </Button>
              </form>
            </div>
          </div>
        </div>
        <span className="text-white text-center text-[14px]">© vale metalicos | 2025</span>
      </div>
    </div>
  );
}
