"use client"

import React, { useState } from "react";
import { Base } from "@/app/components/Base/layout";
import CardTrip from "@/app/components/CardTrip";

export default function Viagens() {
    const [openAlert, setOpenAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');

    return (
        <Base
            openAlert={openAlert}
            isSuccess={isSuccess}
            messageAlert={messageAlert}
            title="Viagens"
        >
            <div className="flex flex-wrap gap-12 justify-center lg:justify-between">
                <CardTrip />
                <CardTrip />
                <CardTrip />
                <CardTrip />
                <CardTrip />
            </div>
        </Base>
    );
}