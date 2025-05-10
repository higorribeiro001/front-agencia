import { Edit } from "@mui/icons-material";
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, IconButton, Typography } from "@mui/material";
import TerrainIcon from '@mui/icons-material/Terrain';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export function AccordionFarm({id, fazenda, area_ha, qtd_animais}: FarmInterface) {
    return (
        <div className="animate-fade-up w-full lg:w-[32%]">
            <Accordion className="p-2 bg-[var(--card)] text-[var(--foreground)]" sx={{ bgcolor: 'var(--card)', color: 'var(--foreground)' }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                >
                    <div className="flex flex-row items-center gap-3 overflow-hidden">
                        <TerrainIcon className="text-[24px] lg:text-[32px]"/>
                        <h2 className="text-[16px] lg:text-[22px] font-bold truncate whitespace-nowrap overflow-hidden w-[190px] lg:w-full">
                            {fazenda}
                        </h2>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-row gap-1">
                            <h3 className="font-semibold">Área (HA):</h3>
                            <p>{area_ha}</p>
                        </div>
                        <div className="flex flex-row gap-1">
                            <h3 className="font-semibold">Quantidade de animais:</h3>
                            <p>{qtd_animais}</p>
                        </div>
                    </div>
                </AccordionDetails>
                <AccordionActions>
                    <IconButton 
                        className="gap-2 text-foreground"
                        href={"/farm/edit/"+id}
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