"use client"

import { ChangeEvent, useEffect, useState } from "react";
import { Base } from "../components/Base/layout";
import { me } from "../service/api/auth";
import MeAdapt from "../service/adapt/MeAdapt";
// import bianco from "../../../public/assets/Porta-de-Correr-Bianco.svg"
// import capuccino from "../../../public/assets/Capuccino.svg"
// import coins from "../../../public/assets/coins-1726618_640.svg"
// import profile from "../../../public/assets/307ce493-b254-4b2d-8ba4-d12c080d6651.svg"
// import { CardApp } from "../components/CardApp";
import { Box, Button, Card, CardContent, MenuItem, Select, SelectChangeEvent, Skeleton, Step, StepLabel, Stepper, TextField } from "@mui/material";
import React from "react";
import FormBuilder from "../service/forms/FormBuilder";
import Image from "next/image";

export default function Home() {
    const [username, setUsername] = useState('');

    const [isLoadingSkeleton, setIsLoadingSkeleton] = useState(true);

    // const listOptions = [
    //     {
    //         image: bianco,
    //         title: 'Kit de Porta',
    //         subtitle: 'Gerencimento de produtos.',
    //         to: '/products'
    //     },
    //     {
    //         image: capuccino,
    //         title: 'Recobrimento',
    //         subtitle: 'Definições de recobrimentos.',
    //         to: '/covering'
    //     },
    //     {
    //         image: coins,
    //         title: 'Descriminação de custo',
    //         subtitle: 'Definições de custos de produção.',
    //         to: '/cost'
    //     },
    //     {
    //         image: profile,
    //         title: 'Perfil',
    //         subtitle: 'Gerenciamento de perfil de usuário.',
    //         to: '/profile'
    //     }
    // ];

    useEffect(() => {
        const getMe = async () => {
            const response = await me();
            const meAdapt = new MeAdapt(response!);

            setUsername(`, ${meAdapt.externalMeAdapt?.name}`);
        }

        getMe();

        setTimeout(() => {
            setIsLoadingSkeleton(false);
        }, 2000)
    }, []);

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set<number>());

    const isStepOptional = (step: number) => {
        return step === 1;
    };

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const steps = ['Estrutura', 'Acabamento', 'Fechamento'];

    const formFieldsStep1 = new FormBuilder()
        .addTextField('porta', '* Porta', 'select')
        .addTextField('largura_porta', '* Largura Porta', 'number')
        .addTextField('altura_porta', '* Altura Porta', 'number')
        .addTextField('batente', '* Batente', 'select')
        .addTextField('largura_batente', '* Largura Batente', 'number')
        .addTextField('borracha', '* Borracha', 'select')
        .addTextField('alizar', '* Alizar', 'text')
        .addTextField('largura_alizar', '* Largura Alizar', 'text')
        .build();

    const initModelStep1 = [
        {
            name: 'porta',
            value: '',
            error: '',
        },
        {
            name: 'largura_porta',
            value: '',
            error: '',
        },
        {
            name: 'altura_porta',
            value: '',
            error: '',
        },
        {
            name: 'batente',
            value: '',
            error: '',
        },
        {
            name: 'largura_batente',
            value: '',
            error: '',
        },
        {
            name: 'borracha',
            value: '',
            error: '',
        },
        {
            name: 'alizar',
            value: '',
            error: '',
        },
        {
            name: 'largura_alizar',
            value: '',
            error: '',
        },
    ];
    
    const [modelStep1, setModelStep1] = useState(initModelStep1);

    const changeValuesSte1 = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        setModelStep1((prevModel) => {
            const updateModel = [...prevModel];
            updateModel[index].value = e.target.value;
            if (updateModel[index].value === '') {
                updateModel[index].error = `Campo ${modelStep1[index].name} obrigatório.`;
            } else {
                updateModel[index].error = '';
            }
            return updateModel;
        });
    }

    const changeValuesSelectStep1 = (e: SelectChangeEvent<string>, index: number) => {
        setModelStep1((prevModel) => {
            const updateModel = [...prevModel];
            updateModel[index].value = e.target.value;
            return updateModel;
        });
    }

    return (
        <Base>
            <div className="h-full">
                {isLoadingSkeleton ? (
                    <div>
                        <Skeleton variant="text" sx={{ fontSize: '2rem', width: '60%' }} />
                        <Skeleton variant="text" sx={{ fontSize: '1.2rem', marginBottom: '40px', width: '80%' }} />
                    </div>
                ) : (
                    <div>
                        <h1
                            className="font-medium text-[22px] text-primary mb-2"
                        >
                            Olá{username}! Seja bem-vindo(a)!
                        </h1>
                        <h2
                            className="text-[14px] mb-10"
                        >
                            Preencha o formulário e siga os passos para obter os custos da porta que deseja verificar.
                        </h2>
                    </div>
                )}
                
                <div className="flex flex-wrap gap-10">
                    {/* <Skeleton variant="rounded" width={300} height={285} /> */}
                    {/* {listOptions.map((value, index) => (
                        isLoadingSkeleton ? (
                            <Skeleton key={index} variant="rounded" width={300} height={285} />
                        ) : (
                            <CardApp 
                                key={index}
                                image={value.image}
                                title={value.title}
                                subtitle={value.subtitle}
                                to={value.to}
                            />
                            
                        )
                    ))} */}
                    <Box 
                        sx={{ width: '100%', minHeight: '500px' }}
                    >
                        <Stepper activeStep={activeStep}>
                            {steps.map((label, index) => {
                                const stepProps: { completed?: boolean } = {};
                                const labelProps: {
                                    optional?: React.ReactNode;
                                } = {};
                                if (isStepSkipped(index)) {
                                    stepProps.completed = false;
                                }
                                return (
                                    <Step key={label} {...stepProps}>
                                        <StepLabel 
                                            {...labelProps}
                                            sx={{
                                                "& .MuiStepIcon-root": { color: "gray" },
                                                "& .Mui-active": { color: "#04782E !important" },
                                                "& .Mui-completed": { color: "#02521F !important" }, 
                                            }}
                                        >
                                            {label}
                                        </StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                        <form 
                            className="flex flex-col gap-10 w-full" 
                            // onSubmit={submitForm}
                        >
                            {activeStep === steps.length ? (
                                <React.Fragment>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 4 }}>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        <Button onClick={handleReset} className="text-primary">Reiniciar</Button>
                                    </Box>
                                </React.Fragment>
                            ) : (
                                <div className="flex flex-col justify-between">
                                    <div className="min-h-[450px] flex flex-wrap py-6 px-2 w-full justify-between">
                                        <Card sx={{ minWidth: '65%', maxWidth: '65%' }} className="shadow-md">
                                            <CardContent className="flex flex-col justify-between gap-3 h-full">
                                                <h3
                                                    className="font-medium text-[18px] text-primary"
                                                >
                                                    Estrutura da porta
                                                </h3>
                                                <div className="flex flex-wrap gap-4">
                                                    {formFieldsStep1.map((value, index: number) => (
                                                        value.type === 'select' ? (
                                                            <Select
                                                                key={index}
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                value={modelStep1[index].value}
                                                                label={value.label}
                                                                className="w-[49%]"
                                                                variant="outlined"
                                                                onChange={(e: SelectChangeEvent) => changeValuesSelectStep1(e, index)}
                                                            >
                                                                <MenuItem value={10}>Ten</MenuItem>
                                                            </Select>
                                                        ) : (
                                                            <TextField
                                                                key={index}
                                                                className="w-[49%]"
                                                                label={value.label} 
                                                                variant="outlined"
                                                                type={value.type}
                                                                error={modelStep1[index].error !== '' ? true : false}
                                                                helperText={modelStep1[index].error}
                                                                onChange={(e: ChangeEvent<HTMLInputElement>) => changeValuesSte1(e, index)}
                                                                value={modelStep1[index].value}
                                                            />
                                                        )
                                                    ))}
                                                </div>
                                                <span className="font-semibold text-[12px]">
                                                    * Campos obrigatórios.
                                                </span>
                                            </CardContent>
                                        </Card>
                                        <Image 
                                            width={400}
                                            height={150}
                                            src={"https://concremportas.com.br/wp-content/uploads/2023/11/Kit-porta-pronta-Acabamento-Lacca-touch-Urban.png"} 
                                            alt="porta"  
                                        />
                                    </div>
                                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                        <Button
                                            color="inherit"
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            sx={{ mr: 1 }}
                                        >
                                            Voltar
                                        </Button>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                            {isStepOptional(activeStep) && (
                                                <Button color="inherit" className="text-primary" onClick={handleSkip} sx={{ mr: 1 }}>
                                                    Pular
                                                </Button>
                                            )}
                                            <Button onClick={handleNext} className="text-primary">
                                                {activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
                                            </Button>
                                    </Box>
                                </div>
                            )}
                        </form>
                    </Box>
                </div>
            </div>
        </Base>
    );
}