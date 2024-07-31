import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import {ProjectName} from "../const/constants"
import { MenuBook, Group, Schedule, OndemandVideo, EmojiEvents, Forum, PhoneAndroid, InsertChart } from '@mui/icons-material';

const items = [
    // {
    //     icon: <LocalShipping/>,
    //     title: 'Freight Solutions',
    //     description:
    //         'We offer comprehensive freight services, including road, rail, sea, and air transport. ' +
    //         'No matter the size or destination of your shipment, we have the solution.',
    //     imageLight: 'url("https://i.ibb.co/nCrm3Gf/truck-with-white-trailer-that-says-scania-side1.jpg")',
    //     imageDark: 'url("https://i.ibb.co/nCrm3Gf/truck-with-white-trailer-that-says-scania-side1.jpg")',
    // },
    {
        "icon": <MenuBook/>,
        "title": "Diverse Course Catalog",
        "description": "Access a wide range of courses across various disciplines, from technology and business to arts and sciences. Our extensive catalog caters to learners of all interests and skill levels."
    },
    {
        "icon": <Group/>,
        "title": "Expert Instructors",
        "description": "Learn from industry professionals and experienced educators. Our instructors bring real-world expertise to the virtual classroom, ensuring you receive high-quality, practical education."
    },
    {
        "icon": <Schedule/>,
        "title": "Flexible Learning",
        "description": "Study at your own pace and on your own schedule. Our platform allows you to access course materials 24/7, making it easy to balance learning with your work and personal life."
    },
    {
        "icon": <OndemandVideo/>,
        "title": "Interactive Content",
        "description": "Engage with multimedia learning materials including video lectures, quizzes, and interactive assignments. Our dynamic content keeps you motivated and enhances your learning experience."
    },
    {
        "icon": <EmojiEvents/>,
        "title": "Certificates and Achievements",
        "description": "Earn recognized certificates upon course completion. Showcase your new skills and knowledge to enhance your professional profile and career prospects."
    },
    {
        "icon": <Forum/>,
        "title": "Community and Support",
        "description": "Join a global community of learners. Participate in discussion forums, collaborative projects, and receive support from both peers and instructors throughout your learning journey."
    },
    {
        "icon": <PhoneAndroid/>,
        "title": "Mobile Learning",
        "description": "Access your courses on-the-go with our mobile app. Continue your learning from anywhere, whether you're commuting, traveling, or just away from your desk."
    },
    {
        "icon": <InsertChart/>,
        "title": "Progress Tracking",
        "description": "Monitor your learning progress with detailed analytics and performance metrics. Set goals, track your achievements, and stay motivated as you advance through your courses."
    }


];

export default function Features() {
    const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

    const handleItemClick = (index) => {
        setSelectedItemIndex(index);
    };

    const selectedFeature = items[selectedItemIndex];

    return (
        <Container id="features" sx={{py: {xs: 8, sm: 16}}}>
            <Grid container spacing={6}>
                <Grid item xs={12} md={6}>
                    <div>
                        <Typography component="h2" variant="h4" color="text.primary">
                            Our Services
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{mb: {xs: 2, sm: 4}}}
                        >
                            At {ProjectName}, we believe that education is the cornerstone of progress.
                        </Typography>
                    </div>
                    <Grid container item gap={1} sx={{display: {xs: 'auto', sm: 'none'}}}>
                        {items.map(({title}, index) => (
                            <Chip
                                key={index}
                                label={title}
                                onClick={() => handleItemClick(index)}
                                sx={{
                                    borderColor: (theme) => {
                                        if (theme.palette.mode === 'light') {
                                            return selectedItemIndex === index ? 'primary.light' : '';
                                        }
                                        return selectedItemIndex === index ? 'primary.light' : '';
                                    },
                                    background: (theme) => {
                                        if (theme.palette.mode === 'light') {
                                            return selectedItemIndex === index ? 'none' : '';
                                        }
                                        return selectedItemIndex === index ? 'none' : '';
                                    },
                                    backgroundColor: selectedItemIndex === index ? 'primary.main' : '',
                                    '& .MuiChip-label': {
                                        color: selectedItemIndex === index ? '#fff' : '',
                                    },
                                }}
                            />
                        ))}
                    </Grid>
                    <Box
                        component={Card}
                        variant="outlined"
                        sx={{
                            display: {xs: 'auto', sm: 'none'},
                            mt: 4,
                        }}
                    >
                        <Box
                            sx={{
                                backgroundImage: (theme) =>
                                    theme.palette.mode === 'light'
                                        ? items[selectedItemIndex].imageLight
                                        : items[selectedItemIndex].imageDark,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                minHeight: 280,
                            }}
                        />
                        <Box sx={{px: 2, pb: 2}}>
                            <Typography color="text.primary" variant="body2" fontWeight="bold">
                                {selectedFeature.title}
                            </Typography>
                            <Typography color="text.secondary" variant="body2" sx={{my: 0.5}}>
                                {selectedFeature.description}
                            </Typography>
                            <Link
                                color="primary"
                                variant="body2"
                                fontWeight="bold"
                                sx={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    '& > svg': {transition: '0.2s'},
                                    '&:hover > svg': {transform: 'translateX(2px)'},
                                }}
                            >
                                <span>Learn more</span>
                                <ChevronRightRoundedIcon
                                    fontSize="small"
                                    sx={{mt: '1px', ml: '2px'}}
                                />
                            </Link>
                        </Box>
                    </Box>
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="flex-start"
                        spacing={2}
                        useFlexGap
                        sx={{width: '100%', display: {xs: 'none', sm: 'flex'}}}
                    >
                        {items.map(({icon, title, description}, index) => (
                            <Card
                                key={index}
                                variant="outlined"
                                component={Button}
                                onClick={() => handleItemClick(index)}
                                sx={{
                                    p: 3,
                                    height: 'fit-content',
                                    width: '100%',
                                    background: 'none',
                                    backgroundColor:
                                        selectedItemIndex === index ? 'action.selected' : undefined,
                                    borderColor: (theme) => {
                                        if (theme.palette.mode === 'light') {
                                            return selectedItemIndex === index
                                                ? 'primary.light'
                                                : 'grey.200';
                                        }
                                        return selectedItemIndex === index ? 'primary.dark' : 'grey.800';
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        textAlign: 'left',
                                        flexDirection: {xs: 'column', md: 'row'},
                                        alignItems: {md: 'center'},
                                        gap: 2.5,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            color: (theme) => {
                                                if (theme.palette.mode === 'light') {
                                                    return selectedItemIndex === index
                                                        ? 'primary.main'
                                                        : 'grey.300';
                                                }
                                                return selectedItemIndex === index
                                                    ? 'primary.main'
                                                    : 'grey.700';
                                            },
                                        }}
                                    >
                                        {icon}
                                    </Box>
                                    <Box sx={{textTransform: 'none'}}>
                                        <Typography
                                            color="text.primary"
                                            variant="body2"
                                            fontWeight="bold"
                                        >
                                            {title}
                                        </Typography>
                                        <Typography
                                            color="text.secondary"
                                            variant="body2"
                                            sx={{my: 0.5}}
                                        >
                                            {description}
                                        </Typography>
                                        <Link
                                            color="primary"
                                            variant="body2"
                                            fontWeight="bold"
                                            sx={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                '& > svg': {transition: '0.2s'},
                                                '&:hover > svg': {transform: 'translateX(2px)'},
                                            }}
                                            onClick={(event) => {
                                                event.stopPropagation();
                                            }}
                                        >
                                            <span>Learn more</span>
                                            <ChevronRightRoundedIcon
                                                fontSize="small"
                                                sx={{mt: '1px', ml: '2px'}}
                                            />
                                        </Link>
                                    </Box>
                                </Box>
                            </Card>
                        ))}
                    </Stack>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{display: {xs: 'none', sm: 'flex'}, width: '100%'}}
                >
                    <Card
                        variant="outlined"
                        sx={{
                            height: '100%',
                            width: '100%',
                            display: {xs: 'none', sm: 'flex'},
                            pointerEvents: 'none',
                        }}
                    >
                        <Box
                            sx={{
                                m: 'auto',
                                width: 420,
                                height: 500,
                                backgroundSize: 'contain',
                                backgroundImage: (theme) =>
                                    theme.palette.mode === 'light'
                                        ? items[selectedItemIndex].imageLight
                                        : items[selectedItemIndex].imageDark,
                            }}
                        />
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}
