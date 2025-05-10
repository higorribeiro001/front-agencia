"use client"

import React, { useEffect, useState } from "react";
import { Base } from "../components/Base/layout";
import RowInfo from "../components/RowInfo";
import UserAdapt from "../service/adapt/UserAdapt";
import { Loading } from "../components/Loading";
import { me } from "../service/api/auth";
import { IconButton, Typography } from "@mui/material";
import { Edit } from "@mui/icons-material";

export default function Profile({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = React.use(params);

    const [isLoading, setIsLoading] = useState(false);
    const [profile, setProfile] = useState<UserInterface>();

    useEffect(() => {
        setIsLoading(true);
        
        const getUser = async () => {
            const dataUser: UserInterface | undefined = await me();
            const userAdapt = new UserAdapt(dataUser!);

            const userData = userAdapt?.externalUserAdapt;

            setProfile(userData);

            setIsLoading(false);
        }

        getUser();
    }, [resolvedParams?.id]);

    return (
        <Base
            title="Perfil"
        >
            <div className="flex flex-col gap-6 w-full h-full z-10 relative animate-fade-up">
                <Loading 
                    isOpen={isLoading}
                />
                <div className="flex flex-col rounded shadow-md p-4">
                    <h2 className="text-primary text-[25px] font-semibold mb-2">{ profile?.name }</h2>
                    <RowInfo title="E-mail:" info={profile?.email ?? ''} />
                    <RowInfo title="Telefone:" info={profile?.phone ?? ''} />
                    <RowInfo title="Papel:" info={profile?.role ?? ''} />
                    <RowInfo title="Status:" info={profile?.is_active ? 'ativo' : 'inativo'} />
                    <IconButton 
                        className="gap-2 mt-2 w-[120px] flex flex-row justify-start"
                        href={"/profile/edit/"+profile?.id}
                    >
                        <Edit 
                            fontSize="small"
                            color="success" 
                        /> 
                        <Typography 
                            className="font-semibold text-[16px]"
                            color="success"
                        >
                            Editar
                        </Typography>
                    </IconButton>
                </div>
            </div>
        </Base>
    );
}