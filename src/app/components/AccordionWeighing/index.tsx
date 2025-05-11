import { Edit } from "@mui/icons-material";
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, IconButton, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export function AccordionWeighing({id, data_pesagem, fazenda, total_kg, qtd_bois, valor}: WeighingInterface) {
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
                    <div className="flex flex-col items-start gap-3 overflow-hidden">
                        <h2 className="text-[16px] lg:text-[22px] font-bold truncate whitespace-nowrap overflow-hidden w-[190px] lg:w-full">
                            {fazenda.fazenda}
                        </h2>
                        <p>{convertDate(data_pesagem)}</p>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-row gap-1">
                            <h3 className="font-semibold">Total (Kg):</h3>
                            <p>{total_kg}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-row gap-1">
                            <h3 className="font-semibold">Qtd. bois:</h3>
                            <p>{qtd_bois}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-row gap-1">
                            <h3 className="font-semibold">Valor:</h3>
                            <p>{valor}</p>
                        </div>
                    </div>
                </AccordionDetails>
                <AccordionActions>
                    <IconButton 
                        className="gap-2 text-foreground"
                        href={"/weighings/edit/"+id}
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