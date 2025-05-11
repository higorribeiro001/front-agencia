import { Breadcrumbs, Link, Typography } from "@mui/material";

export const Breadcrumb = ({options}: BreadcrumbsInterface) => {
    return (
        <Breadcrumbs 
            className="mb-10"
            aria-label="breadcrumb"
        >
            {options.map((value, index: number) => (
                value.current ? (
                    <Typography 
                        key={index}
                        sx={{ color: 'text.primary' }}
                    >
                        {value.page}
                    </Typography>
                ) : (
                    <Link 
                        key={index}
                        underline="hover" 
                        sx={{ color: 'var(--black2)' }} 
                        href={value.href}
                    >
                        {value.page}
                    </Link>
                )
            ))}
        </Breadcrumbs>
    );
}