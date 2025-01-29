"use client"

import Image from "next/image";
import concrem from "../../public/assets/img_concrem.svg"
import logo from "../../public/assets/logo.png"
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React from "react";
import { Button, FormControl, TextField } from "@mui/material";

export default function Home() {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="flex flex-row overflow-hidden justify-between w-full h-full m-0 p-0">
      <div className="w-[100%] bg-background py-12 px-16 flex flex-col justify-between">
        <Image 
          className="w-[250px]"
          src={logo} 
          alt="logo"     
        />
        <div className="flex flex-col gap-10">
          <h2 className="text-center text-primary text-[28px] font-medium">LOGIN</h2>
          <FormControl className="gap-10" variant="outlined" fullWidth>
            <TextField
              id="email"
              label="E-mail" 
              variant="outlined"
              fullWidth
              type="email"
              error={false}
            />
            <TextField
              id="password"
              label="Senha" 
              variant="outlined"
              fullWidth
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button 
              className="bg-primary font-semibold h-[56px]"
              variant="contained"
            >
              Entrar
            </Button>
          </FormControl>
        </div>
        <span className="text-gray-600 text-center">© concrem | 2025</span>
      </div>
      <Image 
        className="h-[100vh]"
        src={concrem} 
        alt="concrem"     
      />
    </div>
  );
}
