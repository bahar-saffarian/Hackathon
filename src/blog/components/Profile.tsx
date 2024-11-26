import Typography from "@mui/material/Typography";
import * as React from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";

export default function Profile(){
    return(
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 4}}>
            <Typography variant="h2" gutterBottom>
                Profile
            </Typography>

            <Grid container spacing={8} columns={12} sx={{ my: 4 }}>
                <Grid>
                    <Box></Box>
                </Grid>
                <Grid>
                    <Box></Box>
                </Grid>

            </Grid>
        </Box>
    )
}