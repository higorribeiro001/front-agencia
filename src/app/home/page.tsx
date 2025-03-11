"use client"

import { useEffect } from "react";
import ViewData from "../components/ViewData";
import { me } from "../service/api/auth";

export default function Home() {
    useEffect(() => {
        const getProfile = async () => {
            await me();
        }

        getProfile();
    }, [])

    return(
        <ViewData importFile={true} title="Principal" />
    );
}