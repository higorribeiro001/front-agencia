import { Edit } from "@mui/icons-material";
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, IconButton, Typography } from "@mui/material";
import TerrainIcon from '@mui/icons-material/Terrain';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export function AccordionApplicationPhase({id, fase_aplicacao}: ApplicationPhaseInterface) {
    return (
        <div className="animate-fade-up w-full lg:w-[32%]">
            <Accordion className="p-2 bg-[var(--card)] text-[var(--foreground)]">
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                >
                    <div className="flex flex-row items-center gap-3 overflow-hidden">
                        <h2 className="text-[16px] lg:text-[22px] font-bold truncate whitespace-nowrap overflow-hidden w-[190px] lg:w-full">
                            {fase_aplicacao}
                        </h2>
                    </div>
                </AccordionSummary>
                <AccordionActions>
                    <IconButton 
                        className="gap-2 text-foreground"
                        href={"/application-phase/edit/"+id}
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