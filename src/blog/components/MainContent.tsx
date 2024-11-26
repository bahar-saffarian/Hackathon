import * as React from 'react';
import {styled} from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid2";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {useEffect, useState} from "react";
import Divider from "@mui/material/Divider";


const SyledCard = styled(Card)(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    height: '100%',
    backgroundColor: (theme).palette.background.paper,
    '&:hover': {
        backgroundColor: 'transparent',
        cursor: 'pointer',
    },
    '&:focus-visible': {
        outline: '3px solid',
        outlineColor: 'hsla(210, 98%, 48%, 0.5)',
        outlineOffset: '2px',
    },
}));

const SyledCardContent = styled(CardContent)({
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    padding: 16,
    flexGrow: 1,
    '&:last-child': {
        paddingBottom: 16,
    },
});

const StyledTypography = styled(Typography)({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
});
export function Search({ onSearch }: { onSearch: (query: string) => void }) {
    return (
        <FormControl sx={{width: {xs: '100%', md: '25ch'}}} variant="outlined">
            <OutlinedInput
                size="small"
                id="search"
                placeholder="Search…"
                sx={{flexGrow: 1}}
                onChange={(e) => onSearch(e.target.value)}
                startAdornment={
                    <InputAdornment position="start" sx={{color: 'text.primary'}}>
                        <SearchRoundedIcon fontSize="small"/>
                    </InputAdornment>
                }
                inputProps={{
                    'aria-label': 'search',
                }}
            />
        </FormControl>
    );
}

interface Events {
    id: number,
    img: string,
    title: string,
    description: string,
    tag: string,
    joined: boolean,
    skills: string
}

export default function MainContent() {
    const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(
        null,
    );
    const [openDialog, setOpenDialog] = React.useState(false)
    const [selectedCard, setSelectedCard] = React.useState<Events>()
    const [cardData, setCardData] = useState<Events[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedChips, setSelectedChips] = useState<string[]>([]);
    const initialList = [
        {
            id: 1,
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlnlcuhAopAeZ8m1FgqvaTBl8kVI0DKiOcFA&s',
            joined: false,
            tag: 'Mobile App',
            title: 'Smart Recycling App',
            description:
                'A mobile app that helps users properly sort and recycle waste. It uses AI to identify recyclable materials from photos and provides tips on nearby recycling centers and collection schedules. Users can earn points for recycling and exchange them for rewards.',
            skills:
                "Mobile App Development (Flutter/React Native),\n "+
                "Machine Learning (Image Recognition, TensorFlow/PyTorch),\n "+
                "Backend Development (Node.js/Django),\n "+
                "Cloud Storage (AWS/GCP),\n "+
                "Database Management (PostgreSQL/Firebase)"

        },
        {
            id: 2,
            img: 'https://www.cypherlearning.com/hubfs/blog/k-20/posts/2023/CYPHER-Learning-Blog_online-teaching-improves-inclusivity.png',
            joined: false,
            tag: 'Web App',
            title: 'Inclusive Education Platform',
            description:
                'A learning management system designed for differently-abled individuals. It offers courses with accessibility features like audio descriptions, sign language videos, and customizable text-to-speech functions.',
            skills:
                "- Web Development (React/Angular)\n"+
                "- Accessibility Standards (WCAG)\n"+
                "- UX/UI Design for Accessibility\n"+
                "- Speech-to-Text Integration (Google Speech API)\n"+
                "- Cloud Hosting (Azure)"

        },
        {
            id: 3,
            img: 'https://media.licdn.com/dms/image/D4D12AQGTZR81u89F5A/article-cover_image-shrink_720_1280/0/1712162497450?e=2147483647&v=beta&t=4jgdxInagAHdZPmEHlbjVDyPnyKZ6Xg5rOW5jKBw3bY',

            joined: false,
            tag: 'UX/UI Design',
            title: 'Carbon Footprint Tracker',
            description:
                'A personal carbon footprint tracking app that calculates and visualizes a user’s daily carbon emissions based on their transportation, food choices, and energy use. It provides actionable recommendations for reducing emissions and tracks progress.',
            skills:
                "- App Development (Kotlin/Swift)\n " +
                "- Data Visualization (D3.js)\n " +
                "- Integration with IoT devices\n " +
                "- API Development (RESTful/GraphQL)\n " +
                "- Data Analytics and Sustainability Metrics"

        }
    ]

    useEffect(() => {
        setCardData(initialList)
    }, [])

    const handleFocus = (index: number) => {
        setFocusedCardIndex(index);
    };

    const handleBlur = () => {
        setFocusedCardIndex(null);
    };

    const handleClick = () => {
        console.info('You clicked the filter chip.');
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);

        // Filter the initial list
        const filteredData = initialList.filter((item) =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase()) ||
            item.tag.toLowerCase().includes(query.toLowerCase())
        );

        setCardData(filteredData);
    };

    const handleChipClick = (chip: string) => {
        let updatedChips = [...selectedChips];

        // Toggle chip selection
        if (updatedChips.includes(chip)) {
            updatedChips = updatedChips.filter((c) => c !== chip);
        } else {
            updatedChips.push(chip);
        }

        setSelectedChips(updatedChips);
        filterData(searchQuery, updatedChips);
    };

    const filterData = (query: string, chips: string[]) => {
        const filteredData = initialList.filter((item) => {
            const matchesQuery =
                query === '' ||
                item.title.toLowerCase().includes(query.toLowerCase()) ||
                item.description.toLowerCase().includes(query.toLowerCase());
            const matchesChips = chips.length === 0 || chips.includes(item.tag);
            return matchesQuery && matchesChips;
        });

        setCardData(filteredData);
    };

    const handleDialog = (card: Events) =>{
        setOpenDialog(true)
        setSelectedCard(card)
    }
    const handleCloseDialog = () =>{
        setOpenDialog(false)
    }
    const handleJoinBtn = (joined: boolean)=> {
        selectedCard!.joined = joined
        let newEvents = [...cardData]
        newEvents.map(c => {
            if(c.id === selectedCard!.id){
                c = selectedCard!
            }
        })
        setCardData(newEvents)
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 4}}>
            <div>
                <Typography variant="h1" gutterBottom>
                    Pro Bono
                </Typography>
                <Typography>Volunteering platform</Typography>
            </div>
            <Search onSearch={handleSearch} />
            <Box
                sx={{
                    display: {xs: 'flex', sm: 'none'},
                    flexDirection: 'row',
                    gap: 1,
                    width: {xs: '100%', md: 'fit-content'},
                    overflow: 'auto',
                }}
            >
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: {xs: 'column-reverse', md: 'row'},
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: {xs: 'start', md: 'center'},
                    gap: 4,
                    overflow: 'auto',
                }}
            >
                <Box
                    sx={{
                        display: 'inline-flex',
                        flexDirection: 'row',
                        gap: 3,
                        overflow: 'auto',
                    }}
                >
                    <Chip key={1} onClick={handleClick} size="medium" label="For You"/>
                    <Chip key={2} onClick={() => handleSearch("My Subs")} size="medium" label="My Subscribed Events"/>
                    <Chip
                        key={3}
                        onClick={() => handleChipClick("RESTful API")}
                        size="medium"
                        label="RESTful API"
                        color={selectedChips.includes("RESTful API") ? 'primary' : 'default'} // Change color when selected
                        clickable
                        sx={{
                            backgroundColor: selectedChips.includes("RESTful API") ? 'primary.main' : 'default',
                            color: selectedChips.includes("RESTful API") ? 'white' : 'text.primary',
                            border: selectedChips.includes("RESTful API") ? 'none' : '1px solid',
                            borderColor: 'divider',
                            '&:hover': {
                                backgroundColor: selectedChips.includes("RESTful API") ? 'primary.dark' : 'grey.200',
                            },
                        }}
                    />
                    <Chip
                        key={4}
                        onClick={() => handleChipClick("Mobile App")}
                        size="medium"
                        label="Mobile App"
                        color={selectedChips.includes("Mobile App") ? 'primary' : 'default'} // Change color when selected
                        clickable
                        sx={{
                            backgroundColor: selectedChips.includes("Mobile App") ? 'primary.main' : 'default',
                            color: selectedChips.includes("Mobile App") ? 'white' : 'text.primary',
                            border: selectedChips.includes("Mobile App") ? 'none' : '1px solid',
                            borderColor: 'divider',
                            '&:hover': {
                                backgroundColor: selectedChips.includes("Mobile App") ? 'primary.dark' : 'grey.200',
                            },
                        }}
                    />
                    <Chip
                        key={5}
                        onClick={() => handleChipClick("Web App")}
                        size="medium"
                        label="Web App"
                        color={selectedChips.includes("Web App") ? 'primary' : 'default'} // Change color when selected
                        clickable
                        sx={{
                            backgroundColor: selectedChips.includes("Web App") ? 'primary.main' : 'default',
                            color: selectedChips.includes("Web App") ? 'white' : 'text.primary',
                            border: selectedChips.includes("Web App") ? 'none' : '1px solid',
                            borderColor: 'divider',
                            '&:hover': {
                                backgroundColor: selectedChips.includes("Web App") ? 'primary.dark' : 'grey.200',
                            },
                        }}
                    />
                    <Chip
                        key={6}
                        onClick={() => handleChipClick("UX/UI Design")}
                        size="medium"
                        label="UX/UI Design"
                        color={selectedChips.includes("UX/UI Design") ? 'primary' : 'default'} // Change color when selected
                        clickable
                        sx={{
                            backgroundColor: selectedChips.includes("UX/UI Design") ? 'primary.main' : 'default',
                            color: selectedChips.includes("UX/UI Design") ? 'white' : 'text.primary',
                            border: selectedChips.includes("UX/UI Design") ? 'none' : '1px solid',
                            borderColor: 'divider',
                            '&:hover': {
                                backgroundColor: selectedChips.includes("UX/UI Design") ? 'primary.dark' : 'grey.200',
                            },
                        }}
                    />
                    <Chip
                        key={7}
                        onClick={() => handleChipClick("Security Protocols")}
                        size="medium"
                        label="Security Protocols"
                        color={selectedChips.includes("Security Protocols") ? 'primary' : 'default'} // Change color when selected
                        clickable
                        sx={{
                            backgroundColor: selectedChips.includes("Security Protocols") ? 'primary.main' : 'default',
                            color: selectedChips.includes("Security Protocols") ? 'white' : 'text.primary',
                            border: selectedChips.includes("Security Protocols") ? 'none' : '1px solid',
                            borderColor: 'divider',
                            '&:hover': {
                                backgroundColor: selectedChips.includes("Security Protocols") ? 'primary.dark' : 'grey.200',
                            },
                        }}
                    />
                    <Chip
                        key={8}
                        onClick={() => handleChipClick("Cloud Computing")}
                        size="medium"
                        label="Cloud Computing"
                        color={selectedChips.includes("Cloud Computing") ? 'primary' : 'default'} // Change color when selected
                        clickable
                        sx={{
                            backgroundColor: selectedChips.includes("Cloud Computing") ? 'primary.main' : 'default',
                            color: selectedChips.includes("Cloud Computing") ? 'white' : 'text.primary',
                            border: selectedChips.includes("Cloud Computing") ? 'none' : '1px solid',
                            borderColor: 'divider',
                            '&:hover': {
                                backgroundColor: selectedChips.includes("Cloud Computing") ? 'primary.dark' : 'grey.200',
                            },
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        display: {xs: 'none', sm: 'flex'},
                        flexDirection: 'row',
                        gap: 1,
                        width: {xs: '100%', md: 'fit-content'},
                        overflow: 'auto',
                    }}
                >
                </Box>
            </Box>
            <Grid container spacing={2} columns={12}>
                {cardData.map((cards, index) => {
                    const { img,title, tag, description } = cards;
                    return (<Grid size={{xs: 12, md: 4}}>
                    <SyledCard
                        variant="outlined"
                        onFocus={() => handleFocus(0)}
                        onBlur={handleBlur}
                        tabIndex={0}
                        className={focusedCardIndex === 0 ? 'Mui-focused' : ''}
                        onClick={() => handleDialog(cards)}
                    >
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            image={img}
                            sx={{
                                aspectRatio: '16 / 9',
                                borderBottom: '1px solid',
                                borderColor: 'divider',
                            }}
                        />
                        <SyledCardContent>
                            <Typography gutterBottom variant="caption" component="div">
                                {tag}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div">
                                {title}
                            </Typography>
                            <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                                {description}
                            </StyledTypography>
                        </SyledCardContent>
                    </SyledCard>
                        {selectedCard && <Dialog
                            open={openDialog}
                            onClose={handleCloseDialog}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle sx={{alignSelf: "center"}}>
                                <img style={{height: 270, width: 580}} src={selectedCard!.img} alt="fireSpot"/>
                            </DialogTitle>
                            <DialogTitle id="alert-dialog-title">
                                {selectedCard!.title}
                            </DialogTitle>
                            <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {selectedCard!.description}
                            </DialogContentText>
                            <Divider></Divider>
                            <DialogTitle id="alert-dialog-title">Desired Skills
                            </DialogTitle>
                            <DialogContentText id="alert-dialog-description">
                                {selectedCard.skills}
                            </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                {!selectedCard?.joined && <Button onClick={() => handleJoinBtn(true)}>Join</Button>}
                                {selectedCard?.joined && <Button onClick={() => handleJoinBtn(false)} autoFocus>Unjoin</Button>}
                            </DialogActions>
                        </Dialog>}
                </Grid>)})}
            </Grid>
        </Box>
    );
}
