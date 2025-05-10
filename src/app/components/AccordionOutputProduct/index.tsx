import { Edit } from "@mui/icons-material";
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, IconButton, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export function AccordionOutputProduct({id, data_movimentacao, fazenda, produto, fase_aplicacao, hectares, lote, total_aplicacao}: OutputProductInterface) {
    const convertDate = (isoDate: string) => {
        const [year, month, day] = isoDate.split('-');
        return `${day}/${month}/${year}`;
    }

    return (
        <div className="animate-fade-up w-full lg:w-[32%]">
            <Accordion className="p-2 bg-[var(--card)] text-[var(--foreground)]" sx={{ bgcolor: 'var(--card)' }}>
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
                            <h3 className="font-semibold">Data Movimentação:</h3>
                            <p>{convertDate(data_movimentacao)}</p>
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
                            <h3 className="font-semibold">Fase de Aplicação:</h3>
                            <p>{fase_aplicacao.fase_aplicacao}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-row gap-1">
                            <h3 className="font-semibold">Hectares:</h3>
                            <p>{hectares}</p>
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
                            <h3 className="font-semibold">R$ Total Aplicação:</h3>
                            <p>{String(total_aplicacao).replace('.', '.')}</p>
                        </div>
                    </div>
                </AccordionDetails>
                <AccordionActions>
                    <IconButton 
                        className="gap-2 text-foreground"
                        href={"/output-product/edit/"+id}
                    >
                        <Edit 
                            fontSize="small"
                            color="inherit" 
                        /> 
                        <Typography 
                            className="font-semibold text-[16px]"
                            color="inherit"
                        >
                            Editar
                        </Typography>
                    </IconButton>
                </AccordionActions>
            </Accordion>
        </div>
    );
}