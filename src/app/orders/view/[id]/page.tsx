"use client"

import ViewData from "@/app/components/ViewData";
import OrderAdapt from "@/app/service/adapt/OrderAdapt";
import { order } from "@/app/service/api/unity";
import React from "react";
import { useEffect, useState } from "react";

export default function OrderView({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = React.use(params);
    const [dataOrder, setDataOrder] = useState<OrderInterface>();
    
    useEffect(() => {
        const getOrder = async (id: string) => {
            const dataOrder = await order(id);
            const orderAdapt = new OrderAdapt(dataOrder);
    
            setDataOrder(orderAdapt.externalOrderAdapt)
        }

        getOrder(resolvedParams.id);
    }, []);

    return (
        <ViewData importFile={false} data={[dataOrder!]} title="Pedido" />
    );
}