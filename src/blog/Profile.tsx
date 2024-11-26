import Typography from "@mui/material/Typography";
import * as React from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import {styled} from "@mui/material/styles";
import {FormEvent, useState} from "react";
import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline";
import AppAppBar from "./components/AppAppBar";
import Container from "@mui/material/Container";
import MainContent from "./components/MainContent";
import Latest from "./components/Latest";
import Footer from "./components/Footer";
import AppTheme from "../shared-theme/AppTheme";
import Divider from "@mui/material/Divider";
import logo from "../ricardo.jpeg";
import Chip from "@mui/material/Chip";

export const StyledGridItem = styled(Grid)({
    display: 'flex',
    justifyContent: 'flex-end',
});

interface UserProfile {
    id: number,
    name: string,
    surname: string,
    email: string,
    description: string,
    skills: any,
    preferences: any
}

const validateForm = (event: FormEvent) => {
    let hasInvalidInput = false;
    // setTemplateData((prevState) => {
    //     return prevState.map((input: InputTemplate) => {
    //         const checkInputValidity = !isInputValid(input, input.value ?? '');
    //         hasInvalidInput = checkInputValidity ? true : hasInvalidInput;
    //         return {...input, hasError: checkInputValidity};
    //     });
    // })

    return hasInvalidInput;
}

const handleChanges = (event: any) => {

}

const handleSubmit = (event: any) => {

}


const handleFormSubmit = (event: FormEvent) => validateForm(event) || handleSubmit(event)

export default function Profile(props: { disableCustomTheme?: boolean }) {
    const [editable, setEditable] = useState(false)
    const [user, setUser] = useState<UserProfile>({
        id: 1,
        name: "Ricardo",
        surname: "Romão",
        email: "ricardo.romao@criticaltechworks.com",
        description: "I'm a Rockstar Developer at CTW",
        skills: ["Java", "Docker", "Quarkus", "Cybersecurity"],
        preferences: ["Backend", "Mobile App", "Web App"]
    });
    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme/>

            <AppAppBar/>
            <Container
                maxWidth="lg"
                component="main"
                sx={{display: 'flex', flexDirection: 'column', my: 16, gap: 4}}
            >
                    <div>
                        <Typography variant="h1" gutterBottom>
                            Profile
                        </Typography>
                    </div>
                <Box sx={{display: 'flex', flexDirection: 'row', gap: 4}}>
                        <Box sx={{display: 'flex', flexDirection: 'column'}}>
                            <img src={logo} style={{ height: 400, width: 400, borderRadius: "90%", marginBottom:"20px"}} alt="fireSpot"/>
                            <Typography sx={{fontWeight: "bold"}}>Role: </Typography>{user.description}
                            <Typography sx={{fontWeight: "bold"}}>Role: </Typography>{user.skills.map((skill:string) =>{
                            return (<Chip label={skill} sx={{marginBottom: "10px", marginTop: "5px", height: 100, width: 100}} />)
                        })}
                        </Box>
                        <Divider orientation="vertical"></Divider>
                        <Box component="form" sx={{mt: 4, px: 14, display: 'flex', width:"100%", flexDirection: 'column'}}
                             noValidate onSubmit={handleSubmit}>
                            <Typography>Name</Typography>
                            <TextField key="name" value={user.name} sx={{marginBottom: "10px", marginTop: "5px"}} onChange={handleChanges}/>
                            <Typography>Surname</Typography>
                            <TextField key="surname" value={user.surname} sx={{marginBottom: "10px", marginTop: "5px"}}  onChange={handleChanges}/>
                            <Typography>Email</Typography>
                            <TextField key="email" value={user.email} sx={{marginBottom: "10px", marginTop: "5px"}} onChange={handleChanges}/>
                            <Typography sx={{marginBottom: "10px", marginTop: "5px"}}>Preferences</Typography>
                            {user.preferences.map((skill: string) => {
                                return (<Chip label={skill} sx={{flexDirection: "row",height: 100, width: 100}} />)
                            })}
                            <StyledGridItem size={{xs: 12}}>
                                <Link href="/">
                                    <Button
                                        variant="contained"
                                        style={{
                                            fontWeight: "bold",
                                            backgroundColor: "black",
                                            maxHeight: '52px',
                                            maxWidth: '150px',
                                            marginRight: "10px",
                                            marginBottom: "10px", marginTop: "5px"
                                        }}
                                    >
                                        Back
                                    </Button>
                                </Link>
                                <Grid size={{xs: 4, sm: "auto", md: "auto", lg: 4}}>
                                    <Button variant="contained"
                                            sx={{fontWeight: "bold", backgroundColor: "#1C69D4", maxHeight: '52px', maxWidth: '150px', marginBottom: "10px", marginTop: "5px"}}
                                            onClick={handleFormSubmit}>
                                        Save
                                    </Button>
                                </Grid>
                            </StyledGridItem>
                        </Box>
                </Box>
            </Container>
            <Footer/>
        </AppTheme>

    )
}