import { Edit } from "@mui/icons-material";
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, IconButton, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export function AccordionExpense({id, data_vencimento, conta, data_pagamento, data_registro, descricao, observacao, fazenda, nota_fiscal, numero_boleto, valor_total, valor_pago}: ExpenseInterface) {
    const convertDate = (isoDate: string) => {
        const [year, month, day] = isoDate.split('-');
        return `${day}/${month}/${year}`;
    }

    return (
        <div className="animate-fade-up w-full lg:w-[32%]">
            <Accordion className="p-2 bg-[var(--card)] text-[var(--foreground)]" sx={{ bgcolor: 'var(--card)', color: 'var(--foreground)' }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                >
                    <div className="flex flex-row items-center gap-3 overflow-hidden">
                        <h2 className="text-[16px] lg:text-[22px] font-bold truncate whitespace-nowrap overflow-hidden w-[190px] lg:w-full">
                            {descricao}
                        </h2>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-row gap-1">
                            <h3 className="font-semibold">Conta:</h3>
                            <p>{conta.tipo}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-row gap-1">
                            <h3 className="font-semibold">Fazenda:</h3>
                            <p>{fazenda.fazenda}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-row gap-1">
                            <h3 className="font-semibold">Grupo:</h3>
                            <p>{conta.grupo}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-row gap-1">
                            <h3 className="font-semibold">Nota Fiscal:</h3>
                            <p>{nota_fiscal}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-row gap-1">
                            <h3 className="font-semibold">N° Boleto:</h3>
                            <p>{numero_boleto}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-row gap-1">
                            <h3 className="font-semibold">Observação:</h3>
                            <p>{observacao}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-row gap-1">
                            <h3 className="font-semibold">Valor Total:</h3>
                            <p>R$ {String(valor_total).replace('.', ',')}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-row gap-1">
                            <h3 className="font-semibold">Valor Recebido:</h3>
                            <p>R$ {String(valor_pago).replace('.', ',')}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-row gap-1">
                            <h3 className="font-semibold">Data Vencimento:</h3>
                            <p>{convertDate(data_vencimento ?? '')}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-row gap-1">
                            <h3 className="font-semibold">Data Pagamento:</h3>
                            <p>{convertDate(data_pagamento ?? '')}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-row gap-1">
                            <h3 className="font-semibold">Data Registro:</h3>
                            <p>{convertDate(data_registro)}</p>
                        </div>
                    </div>
                </AccordionDetails>
                <AccordionActions>
                    <IconButton 
                        className="gap-2 text-foreground"
                        href={"/expenses/edit/"+id}
                    >
                        <Edit 
                            fontSize="small"
                            sx={{ color: 'var(--black2)' }} 
                        /> 
                        <Typography 
                            className="font-semibold text-[16px]"
                            sx={{ color: 'var(--black2)' }}
                        >
                            Editar
                        </Typography>
                    </IconButton>
                </AccordionActions>
            </Accordion>
        </div>
    );
}