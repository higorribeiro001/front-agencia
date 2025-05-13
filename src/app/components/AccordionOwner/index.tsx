import { Edit } from "@mui/icons-material";
import { Accordion, AccordionActions, AccordionSummary, IconButton, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export function AccordionOwner({id, proprietario}: OwnerInterface) {
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
                            {proprietario}
                        </h2>
                    </div>
                </AccordionSummary>
                <AccordionActions>
                    <IconButton 
                        className="gap-2 text-foreground"
                        href={"/owner/edit/"+id}
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