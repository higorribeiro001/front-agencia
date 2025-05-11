import { Edit } from "@mui/icons-material";
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, IconButton, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export function AccordionInputProduct({id, fornecedor, n_nf, produto, lote, un, qtd, total, valor_unitario, data_vencimento}: InputProductInterface) {
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
                            {produto.insumo}
                        </h2>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-row gap-1">
                            <h3 className="font-semibold">Fornecedor:</h3>
                            <p>{fornecedor.fornecedor}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-row gap-1">
                            <h3 className="font-semibold">N° NF:</h3>
                            <p>{n_nf}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-row gap-1">
                            <h3 className="font-semibold">Lote:</h3>
                            <p>{lote}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-row gap-1">
                            <h3 className="font-semibold">UN:</h3>
                            <p>{un}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-row gap-1">
                            <h3 className="font-semibold">Qtd:</h3>
                            <p>{qtd}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-row gap-1">
                            <h3 className="font-semibold">R$ Total:</h3>
                            <p>{String(total).replace('.', '.')}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-row gap-1">
                            <h3 className="font-semibold">R$ Valor Unitário:</h3>
                            <p>{String(valor_unitario).replace('.', ',')}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-row gap-1">
                            <h3 className="font-semibold">Data Vencimento:</h3>
                            <p>{convertDate(data_vencimento)}</p>
                        </div>
                    </div>
                </AccordionDetails>
                <AccordionActions>
                    <IconButton 
                        className="gap-2 text-foreground"
                        href={"/input-product/edit/"+id}
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